import React from "react";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
export default function SignUpPage() {
  return (
    <>
      <div className="h-[80vh] md:flex  mt-8 gap-12">
        <div>
          <SignUp />
        </div>
        <div className="w-full">
          <Image
            src={
              "https://images.unsplash.com/photo-1445633743309-b60418bedbf2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Secret Login"
            width={500}
            height={500}
            style={{ width: "100%", height: "100" }}
          />
        </div>
      </div>
    </>
  );
}
