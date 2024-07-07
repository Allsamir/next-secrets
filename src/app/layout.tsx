import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Secret - Created by Allsamir",
  description:
    "This is the web application where you can share all of your secrets with the world without letting them know how you are!. Congratulations Now you can share your secrets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="shortcut icon"
            href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWNDlDlF-Z9-gSqmSX6xgK9gc-1uu1K0tkBg&s"
            type="image/x-icon"
          />
        </head>
        <body className={inter.className}>
          <ClerkLoading>
            <div className="flex justify-center items-center h-screen">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <Navbar></Navbar>
            <div className="container mx-auto px-4">{children}</div>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
