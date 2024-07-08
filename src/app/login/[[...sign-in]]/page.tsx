import React from "react";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
export default function LoginPage() {
  return (
    <>
      <div className="h-[80vh] md:flex my-8 gap-12">
        <div className="mx-auto">
          <SignIn />
        </div>
        <div className="w-full md:mt-0 mt-12">
          <Image
            src={
              "https://images.unsplash.com/photo-1483706600674-e0c87d3fe85b?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VjcmV0fGVufDB8fDB8fHww"
            }
            alt="Secret Login"
            width={500}
            height={500}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </>
  );
}
