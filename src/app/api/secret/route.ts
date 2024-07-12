import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import Secret from "@/lib/models/Secret";
import dbConnect from "@/lib/db";
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const user = await currentUser();
    const payload = await req.json();
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
              secret: payload.secret,
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
            secret: payload.secret,
          },
        ],
      };

      const createSecret = new Secret(secret);
      await createSecret.save().then(() => {
        return NextResponse.json({ message: "Secret Saved" }, { status: 201 });
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
