"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return <Button className="flex gap-2" variant='outline' onClick={() => signOut()}>Logout <LogOut size={14} /></Button>;
}
