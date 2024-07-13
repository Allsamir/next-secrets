import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import Secret from "@/lib/models/Secret";
import dbConnect from "@/lib/db";
const crypto = require("crypto");

function encrypt(text: string) {
  const cipher = crypto.createCipher(
    "aes-256-cbc",
    process.env.NEXT_PUBLIC_CIPHER_KEY,
  );
  let crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const user = await currentUser();
    const payload = await req.json();
    const secretIncrypted = encrypt(payload.secret);
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
              secret: secretIncrypted,
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
            secret: secretIncrypted,
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
