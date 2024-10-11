"use client";

import {
  ChartColumnIncreasing,
  UserRoundPen,
  LogOut,
  AlignJustify,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

type UserInfoProps = {
  user: {
    name: string;
    email: string;
    image: string;
  };
  userName: string;
  avatarImage: string;
};

export default function SideBar({
  user,
  userName,
  avatarImage,
}: UserInfoProps) {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? "text-blue-500 font-semibold"
      : "text-black md:text-white";
  };
  const SidebarContent = () => (
    <div className="flex flex-col justify-between min-h-full">
      <div>
        <div className="flex flex-col gap-3 items-center mb-16 mt-8">
          <div className="w-32 h-32 rounded-full shadow-lg shadow-black/50 overflow-hidden bg-cover bg-center">
            <Image
              className="w-full h-full object-cover"
              src={avatarImage || user.image}
              alt={user.name}
              width={100}
              height={100}
              priority
            />
          </div>
          <p className="text-[1em] text-center">{user.name}</p>
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
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex bg-primary w-1/4 md:w-1/5 xl:w-1/6 p-4 text-white flex-col justify-between min-h-screen">
        <SidebarContent />
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <AlignJustify className="h-6 w-6" />
            <span className="sr-only">Open Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-4">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
