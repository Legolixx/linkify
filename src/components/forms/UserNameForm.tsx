"use client";
import { ArrowRight, Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface UserNameFormProps {
  desiredUsername?: string;
  handleFormSubmit: (formData: FormData) => Promise<string>;
}

export default function UserNameForm({
  desiredUsername,
  handleFormSubmit,
}: UserNameFormProps) {
  const [username, setUsername] = useState(desiredUsername || "");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.set("username", username);

    const result = await handleFormSubmit(formData);
    setIsLoading(false);

    if (result === "Username already exists!") {
      toast({
        title: "Error",
        description: result,
        variant: "destructive",
      });
    } else if (result === "Success") {
      toast({
        title: "Success",
        description: "Username created successfully!",
        variant: "success",
      });
      router.push(`/account/${username}`);
    } else {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h1 className="text-4xl font-bold text-center mb-2">
        Grab your username
      </h1>
      <p className="text-muted-foreground mb-6 text-center">
        Choose your username
      </p>
      <div className="max-w-xs mx-auto">
        <input
          className="block p-2 mx-auto border w-full mb-2 text-center"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
        />
        <Button
          className="py-2 px-4 flex mx-auto w-full gap-1 items-center justify-center"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2Icon className="animate-spin" size={16} />
          ) : (
            <>
              Claim your username
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
