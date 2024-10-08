import dbConnect from "@/lib/db";
import Secret from "@/lib/models/Secret";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { ObjectId } from "mongodb";
import SecretInterface from "@/interface/Secret";

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.CIPHER_KEY || "default_cipher_key", "hex");
const iv = Buffer.from(process.env.CIPHER_IV || "", "hex");

async function decrypt(text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const decipher = crypto.createDecipheriv(algorithm, key, iv);
      let decrypted = decipher.update(text, "hex", "utf8");
      decrypted += decipher.final("utf8");
      resolve(decrypted);
    } catch (error) {
      console.error(error);
      reject(new Error("Could not decrypt"));
    }
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { clerkId: string } },
) {
  try {
    await dbConnect();
    const { clerkId } = params;
    const secretData = await Secret.findOne({ clerkId: clerkId }, "secret");
    const decryptedSecretArray: SecretInterface[] = [];
    if (!secretData || !secretData.secret) {
      return NextResponse.json(decryptedSecretArray);
    }
    const { secret } = secretData;
    for (const secretObject of secret) {
      const decryptedSecret = await decrypt(secretObject.secret);
      const updateTime = new Date(secretObject.updatedAt).toLocaleTimeString();
      const updateDate = new Date(secretObject.updatedAt).toLocaleDateString();
      decryptedSecretArray.push({
        secret: decryptedSecret,
        _id: secretObject._id,
        updatedTime: updateTime,
        updatedDate: updateDate,
      });
    }
    return NextResponse.json(decryptedSecretArray, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error happened in GET request" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { clerkId: string } },
) {
  try {
    await dbConnect();
    const { clerkId } = params;
    const { secretId } = await req.json();
    const updateSecret = await Secret.findOneAndUpdate(
      { clerkId: clerkId },
      {
        $pull: {
          secret: { _id: new ObjectId(secretId) },
        },
      },
      {
        new: true,
      },
    );
    if (updateSecret) {
      return NextResponse.json(
        { message: "Delete server", success: true },
        { status: 200 },
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error happened in Delete request" },
      { status: 500 },
    );
  }
}
