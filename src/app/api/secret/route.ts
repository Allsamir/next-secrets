import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import Secret from "@/lib/models/Secret";
import dbConnect from "@/lib/db";
import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.NEXT_PUBLIC_CIPHER_KEY || "", "hex");
const iv = Buffer.from(process.env.NEXT_PUBLIC_CIPHER_IV || "", "hex");

function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
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
              iv: iv.toString("hex"), // Store the IV for decryption
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
            iv: iv.toString("hex"), // Store the IV for decryption
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