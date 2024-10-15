import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import SideBar from "@/components/SideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { XataClient } from "@/lib/xata";
import { authOptions } from "@/lib/authOptions";

const xata = new XataClient();

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Linkium",
  description: "Created by VF",
};

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const userName = await xata.db.pages
    .filter({
      owner: session?.user?.email,
    })
    .getFirst();

  if (!session) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <main className="flex min-h-screen">
          <SideBar
            user={
              session.user as { name: string; email: string; image: string }
            }
            userName={userName?.uri as string}
            avatarImage={userName?.avatarImage as string}
          />
          <div className="grow">{children}</div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
