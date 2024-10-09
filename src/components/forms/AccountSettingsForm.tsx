"use client";

import RadioTogglers from "@/components/formInputs/RadioTogglers";
import { Palette, ImageIcon, Save, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { saveAccountSettingsAction } from "@/actions/accountAction";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type XataMetadata = {
  createdAt: Date;
  updatedAt: Date;
  version: number;
};

type PageRecord = {
  id: string;
  owner: string | null | undefined;
  uri: string | null | undefined;
  displayName: string | null | undefined;
  location: string | null | undefined;
  bio: string | null | undefined;
  xata: XataMetadata;
};

type PageRecordArray = PageRecord[];

export default function AccountSettingsForm({
  user,
  img,
}: {
  user: PageRecordArray;
  img: string | null | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function saveAccountSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    try {
      await saveAccountSettingsAction(formData);
    } catch (error) {
      console.error("Error saving account settings:", error);
    } finally {
      setIsLoading(false);
      toast({
        title: "Succes",
        description: "User information saved succesfully!",
        variant: "success"
      })
    }
  }

  return (
    <div className="-m-4">
      <form onSubmit={saveAccountSettings}>
        <div className="bg-gray-300 py-16 flex justify-center items-center">
          <RadioTogglers
            options={[
              { name: "color", icon: <Palette />, label: "Color" },
              { name: "image", icon: <ImageIcon />, label: "Image" },
            ]}
          />
        </div>
        <div className="flex justify-center">
          <Image
            className="rounded-full relative -top-8 border-4 border-white shadow-lg shadow-black/50"
            src={img as string}
            alt="avatar"
            width={128}
            height={128}
            priority
            quality={100}
          />
        </div>
        <div className="p-4">
          <label className="input-label" htmlFor="nameIn">
            Display name
          </label>
          <input
            defaultValue={user[0].displayName as string}
            name="displayName"
            id="nameIn"
            type="text"
            placeholder="Victor Fazekas"
            maxLength={20}
          />
          <label className="input-label" htmlFor="locationIn">
            Location
          </label>
          <input
            defaultValue={user[0].location as string}
            name="location"
            id="locationIn"
            type="text"
            placeholder="Somewhere over the rainbow"
            maxLength={40}
          />
          <label className="input-label" htmlFor="bioIn">
            Bio
          </label>
          <textarea
            defaultValue={user[0].bio as string}
            name="bio"
            id="bioIn"
            placeholder="Your bio goes here..."
            maxLength={200}
          />
          <Button className="flex w-full md:w-1/2 xl:w-1/4 mx-auto mt-4 gap-2">
            {isLoading ? (
              <Loader2Icon className="animate-spin" size={16} />
            ) : (
              <>
                <Save size={20} />
                Save
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
