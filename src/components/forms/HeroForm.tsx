"use client";

import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface HeroFormProps {
  user: User | undefined;
}

export default function HeroForm({ user }: HeroFormProps) {
  const [username, setUsername] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (username.length > 5) {
      if (user) {
        router.push(`createusername?desiredUsername=${username}`);
      } else {
        await signIn("google", {
          redirect: true,
          callbackUrl: `/createusername?desiredUsername=${username}`,
        });
      }
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex items-center shadow-lg shadow-gray-500/20"
    >
      <span className="bg-white py-2 pl-4">linkify.to/</span>
      <input
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        className="py-2"
        placeholder="username"
      />
      <Button className="py-[1.5em] px-6" type="submit">
        Join for Free
      </Button>
    </form>
  );
}
