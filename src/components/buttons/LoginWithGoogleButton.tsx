"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginWithGoogleButton() {

  return (
    <Button
      variant="outline"
      className="flex gap-3 justify-center p-5"
      onClick={() => signIn('google', {
        redirect: true,
        callbackUrl: "/createusername"
      })}
    >
      <Image src="/googleIcon.svg" width={20} height={20} alt="google_icon" />
      <span>Sign In with Google</span>
    </Button>
  );
}
