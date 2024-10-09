"use client";

import { ChartColumnIncreasing, UserRoundPen, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

type UserInfoProps = {
  user: {
    name: string;
    email: string;
    image: string;
  };
  userName: string;
};

export default function SideBar({ user, userName }: UserInfoProps) {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    return pathname === path ? "text-blue-500 font-semibold" : "text-white";
  };

  return (
    <aside className="bg-primary w-1/4 md:w-1/5 xl:w-1/6 p-4 text-white flex flex-col justify-between min-h-screen">
      <div>
        <div className="flex flex-col gap-3 items-center mb-16 mt-8">
          <Image
            className="rounded-full"
            src={user.image}
            alt={user.name}
            width={100}
            height={100}
            priority
          />
          <p className="text-[0.6em] md:text-[1em] text-center">{user.name}</p>
        </div>
        <nav className="flex flex-col items-center gap-10">
          <Link
            className={`flex gap-2 ${getLinkClass(`/account/${userName}`)}`}
            href={`/account/${userName}`}
          >
            <UserRoundPen />
            Settings
          </Link>
          <Link
            className={`flex gap-2 ${getLinkClass(
              `/account/${userName}/analytics`
            )}`}
            href={`/account/${userName}/analytics`}
          >
            <ChartColumnIncreasing />
            Analytics
          </Link>
        </nav>
      </div>
      <Button
        type="button"
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: "/",
          })
        }
        className="flex gap-2"
        variant="destructive"
      >
        Logout
        <LogOut size={18} />
      </Button>
    </aside>
  );
}
