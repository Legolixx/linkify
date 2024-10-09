"use client";

import RadioTogglers from "@/components/formInputs/RadioTogglers";
import {
  Palette,
  ImageIcon,
  Save,
  Loader2Icon,
  CloudUpload,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { saveAccountSettingsAction } from "@/actions/accountAction";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/lib/uploadthing";

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
  bgType: string | null | undefined;
  bgColor: string | null | undefined;
  bgImage: string | null | undefined;
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
  const [backgroundImg, setBackGroundImg] = useState(
    user[0].bgImage || "/defaultBanner.png"
  );
  const { toast } = useToast();
  const router = useRouter();

  async function saveAccountSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    if (backgroundImg) {
      formData.append("bgImage", backgroundImg);
    }

    try {
      await saveAccountSettingsAction(formData);
    } catch (error) {
      toast({
        title: "Error",
        description: error as string,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "User information saved successfully!",
        variant: "success",
      });
    }

    router.refresh();
  }

  return (
    <div className="-m-4">
      <form onSubmit={saveAccountSettings}>
        <div
          className="py-[3.3em] flex justify-center items-center bg-cover"
          style={
            user[0].bgType === "color"
              ? { backgroundColor: user[0].bgColor || "#2196F3" }
              : {
                  backgroundImage:
                    `url(${backgroundImg})` || `url(${user[0].bgImage})`,
                }
          }
        >
          <div className="relative -top-5">
            <RadioTogglers
              defaultValue={user[0].bgType || "image"}
              options={[
                { name: "color", icon: <Palette />, label: "Color" },
                { name: "image", icon: <ImageIcon />, label: "Image" },
              ]}
            />
            {user[0].bgType === "color" ? (
              <div className="my-2 flex justify-center">
                <input
                  defaultValue={user[0].bgColor || "#2196F3"}
                  type="color"
                  name="bgColor"
                />
              </div>
            ) : (
              <div className="flex m-2 justify-center bg-primary rounded-full items-center gap-3 text-white text-sm">
                <CloudUpload />
                <UploadButton
                  className="flex mb-2 mr-3"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setBackGroundImg(res[0].url);
                    toast({
                      title: "Success",
                      description: "Image uploaded!",
                      variant: "success",
                    });
                    router.refresh();
                  }}
                  onUploadError={(error: Error) => {
                    toast({
                      title: "Error",
                      description: error.message,
                      variant: "destructive",
                    });
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            className="rounded-full relative -top-16 border-4 border-white shadow-lg shadow-black/50 -mb-[4.5em]"
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
