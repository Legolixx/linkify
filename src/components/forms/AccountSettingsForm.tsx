"use client";

import RadioTogglers from "@/components/formInputs/RadioTogglers";
import {
  Palette,
  ImageIcon,
  Save,
  Loader2Icon,
  CloudUpload,
  Camera,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { saveAccountSettingsAction } from "@/actions/accountAction";
import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/lib/uploadthing";
import { CheckAndDeleteImage } from "@/actions/checkAndDelete";
import StoreImgKeys from "@/actions/storeImgKeys";
import SectionBox from "../SectionBox";
import { PagesRecord } from "@/lib/xata";

type AccountSettingsFormProps = PagesRecord & {
  img: string | null | undefined;
};

export default function AccountSettingsForm({
  img,
  ...user
}: AccountSettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState("");
  const [avatarkey, setAvatarKey] = useState("");
  const [backgroundImg, setBackGroundImg] = useState(
    user.bgImage || "/defaultBanner.png"
  );
  const [avatarImg, setAvatarImg] = useState(user.avatarImage || img);
  const { toast } = useToast();
  const router = useRouter();

  const storeImg = useCallback(async () => {
    if (key) {
      await StoreImgKeys(key, "background");
    }

    if (avatarkey) {
      await StoreImgKeys(avatarkey, "avatar");
    }
  }, [key, avatarkey]);

  useEffect(() => {
    storeImg();
  }, [storeImg]);

  async function saveAccountSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    if (backgroundImg) {
      formData.append("bgImage", backgroundImg);
    }

    if (avatarImg) {
      formData.append("avatarImage", avatarImg);
    }

    try {
      await saveAccountSettingsAction(formData);

      if (key) {
        await CheckAndDeleteImage(user.owner as string, "background");
      }
      if (avatarImg) {
        await CheckAndDeleteImage(user.owner as string, "avatar");
      }

      toast({
        title: "Success",
        description: "User information saved successfully!",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error as string,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }

  return (
    <div>
      <SectionBox>
        <form onSubmit={saveAccountSettings}>
          <div
            className="py-[3.3em] -m-4 min-h-[300px] flex justify-center items-center bg-cover bg-center"
            style={
              user.bgType === "color"
                ? { backgroundColor: user.bgColor || "#2196F3" }
                : {
                    backgroundImage:
                      `url(${backgroundImg})` || `url(${user.bgImage})`,
                  }
            }
          >
            <div className="relative -top-5 opacity-75">
              <RadioTogglers
                defaultValue={user.bgType || "image"}
                options={[
                  { name: "color", icon: <Palette />, label: "Color" },
                  { name: "image", icon: <ImageIcon />, label: "Image" },
                ]}
              />
              {user.bgType === "color" ? (
                <div className="my-2 flex justify-center">
                  <input
                    defaultValue={user.bgColor || "#2196F3"}
                    type="color"
                    name="bgColor"
                  />
                </div>
              ) : (
                <div className="flex m-2 justify-center bg-primary rounded-full items-center gap-3 text-white text-sm cursor-pointer opacity-55">
                  <CloudUpload />
                  <UploadButton
                    className="flex pb-2"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setBackGroundImg(res[0].url);
                      setKey(res[0].key);
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
            <div className="relative -top-12">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg shadow-black/50 overflow-hidden bg-cover bg-center">
                <Image
                  className="w-full h-full object-cover"
                  src={avatarImg as string}
                  alt="avatar"
                  width={128}
                  height={128}
                  priority
                  quality={100}
                />
              </div>
              <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 top-[5.5em]">
                <label className="cursor-pointer">
                  <Camera className="text-primary bg-white flex min-w-[2em] rounded-full" />
                  <UploadButton
                    endpoint="imageUploader"
                    className="opacity-0 w-full h-full absolute inset-0"
                    onClientUploadComplete={(res) => {
                      setAvatarImg(res[0].url);
                      setAvatarKey(res[0].key);
                      toast({
                        title: "Success Avatar Image uploaded!",
                        description:
                          "Press Save to save changes on avatar image!",
                        variant: "success",
                      });
                      router.refresh();
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="px-4">
            <label className="input-label" htmlFor="nameIn">
              Display name
            </label>
            <input
              defaultValue={user.displayName as string}
              name="displayName"
              id="nameIn"
              type="text"
              placeholder="Victor Fazekas"
              maxLength={100}
            />
            <label className="input-label" htmlFor="locationIn">
              Location
            </label>
            <input
              defaultValue={user.location as string}
              name="location"
              id="locationIn"
              type="text"
              placeholder="Somewhere over the rainbow"
              maxLength={100}
            />
            <label className="input-label" htmlFor="bioIn">
              Bio
            </label>
            <textarea
              defaultValue={user.bio as string}
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
      </SectionBox>
    </div>
  );
}
