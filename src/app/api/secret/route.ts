import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import Secret from "@/lib/models/Secret";
import dbConnect from "@/lib/db";
import crypto from "crypto";
import { ObjectId } from "mongodb";
const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.CIPHER_KEY || "", "hex");
const iv = Buffer.from(process.env.CIPHER_IV || "", "hex");

function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

async function decrypt(text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const decipher = crypto.createDecipheriv(algorithm, key, iv);
      let decrypted = decipher.update(text, "hex", "utf8");
      decrypted += decipher.final("utf8");
      resolve(decrypted);
    } catch (error) {
      console.error(error);
      reject(new Error("Error happened while decrypting"));
    }
  });
}

export async function GET() {
  try {
    const encryptedSecrets = await Secret.aggregate([
      { $unwind: "$secret" },
      { $project: { secret: "$secret" } },
    ]);
    const decryptedSecretArray = await Promise.all(
      encryptedSecrets.map(async (secretObject) => {
        const { secret } = secretObject;
        const decryptedSecret = await decrypt(secret.secret);
        return {
          secret: decryptedSecret,
          _id: secret._id,
          updatedTime: new Date(secret.updatedAt).toLocaleTimeString(),
          updatedDate: new Date(secret.updatedAt).toLocaleDateString(),
        };
      }),
    );
    return NextResponse.json(decryptedSecretArray);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching secrets" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const user = await currentUser();
    const payload = await req.json();
    const secretEncrypted = encrypt(payload.secret);

    const userInSecretDB = await Secret.findOne(
      { clerkId: user?.id },
      "clerkId",
    );
    if (userInSecretDB) {
      await Secret.updateOne(
        { clerkId: user?.id },
        {
          $push: {
            secret: {
              secret: secretEncrypted,
            },
          },
        },
      );
      return NextResponse.json({ message: "Secret Updated" }, { status: 200 });
    } else {
      const secret = {
        clerkId: user?.id,
        email: user?.emailAddresses[0].emailAddress,
        secret: [
          {
            secret: secretEncrypted,
          },
        ],
      };

      const createSecret = new Secret(secret);
      await createSecret.save();
      return NextResponse.json({ message: "Secret Saved" }, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const user = await currentUser();
    const { secretId, updatedSecret } = await req.json();
    const updatedEncryptedSecret = encrypt(updatedSecret);
    const updatedSecretInDB = await Secret.findOneAndUpdate(
      {
        clerkId: user?.id,
        "secret._id": new ObjectId(secretId),
      },
      {
        $set: {
          "secret.$.secret": updatedEncryptedSecret,
        },
      },
      { new: true },
    );
    if (updatedSecretInDB) {
      return NextResponse.json(
        { message: "Secret Updated", success: true },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: "Secret not found", success: false },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
