"use client";

import { useState } from "react";
import SectionBox from "../SectionBox";
import { Button } from "../ui/button";
import { Loader2Icon, Plus, SaveIcon } from "lucide-react";
import Image from "next/image";
import { SaveSocialButtons } from "@/actions/accountAction";
import { useToast } from "@/hooks/use-toast";
import { PagesRecord } from "@/lib/xata";

type ButtonProps = {
  key: string;
  label: string;
  placeholder: string;
  icons: JSX.Element;
  iconsDark: JSX.Element;
};

const allbuttons: ButtonProps[] = [
  {
    key: "email",
    label: "E-mail",
    icons: <Image src="/icons/email.svg" width={24} height={24} alt="email" />,
    iconsDark: (
      <Image src="/iconsDark/email.svg" width={24} height={24} alt="email" />
    ),
    placeholder: "johndoe@example.com",
  },
  {
    key: "instagram",
    label: "Instagram",
    icons: (
      <Image
        src="/icons/instagram.svg"
        width={24}
        height={24}
        alt="instagram"
      />
    ),
    iconsDark: (
      <Image
        src="/iconsDark/instagram.svg"
        width={24}
        height={24}
        alt="instagram"
      />
    ),
    placeholder: "https://www.instagram.com/johndoe",
  },
  {
    key: "facebook",
    label: "Facebook",
    icons: (
      <Image src="/icons/facebook.svg" width={24} height={24} alt="Facebook" />
    ),
    iconsDark: (
      <Image
        src="/iconsDark/facebook.svg"
        width={24}
        height={24}
        alt="Facebook"
      />
    ),
    placeholder: "https://www.facebook.com/johndoe",
  },
  {
    key: "discord",
    label: "Discord",
    icons: (
      <Image src="/icons/discord.svg" width={24} height={24} alt="discord" />
    ),
    iconsDark: (
      <Image
        src="/iconsDark/discord.svg"
        width={24}
        height={24}
        alt="discord"
      />
    ),
    placeholder: "https://discord.com/users/johndoe",
  },
  {
    key: "tiktok",
    label: "Tiktok",
    icons: (
      <Image src="/icons/tiktok.svg" width={24} height={24} alt="tiktok" />
    ),
    iconsDark: (
      <Image src="/iconsDark/tiktok.svg" width={24} height={24} alt="tiktok" />
    ),
    placeholder: "https://www.tiktok.com/@johndoe",
  },
  {
    key: "whatsapp",
    label: "Whatsapp",
    icons: (
      <Image src="/icons/whatsApp.svg" width={24} height={24} alt="whatsapp" />
    ),
    iconsDark: (
      <Image
        src="/iconsDark/whatsApp.svg"
        width={24}
        height={24}
        alt="whatsapp"
      />
    ),
    placeholder: "+55 (00) 00000 0000 ",
  },
  {
    key: "github",
    label: "Github",
    icons: (
      <Image src="/icons/github.svg" width={24} height={24} alt="github" />
    ),
    iconsDark: (
      <Image src="/iconsDark/github.svg" width={24} height={24} alt="github" />
    ),
    placeholder: "https://github.com/johndoe",
  },
  {
    key: "x",
    label: "Twitter",
    icons: <Image src="/icons/x.svg" width={24} height={24} alt="X" />,
    iconsDark: <Image src="/iconsDark/x.svg" width={24} height={24} alt="X" />,
    placeholder: "https://www.twitter.com/johndoe",
  },
  {
    key: "telegram",
    label: "Telegram",
    icons: (
      <Image src="/icons/telegram.svg" width={24} height={24} alt="telegram" />
    ),
    iconsDark: (
      <Image
        src="/iconsDark/telegram.svg"
        width={24}
        height={24}
        alt="telegram"
      />
    ),
    placeholder: "https://t.me/johndoe",
  },
];

export default function AccountSocialForm(user: PagesRecord) {
  const pageSavedButtonsKeys = Object.keys(user.buttons);
  const pageSavedButtonsIfon: ButtonProps[] = pageSavedButtonsKeys
    .map((key) => allbuttons.find((b) => b.key === key))
    .filter((b): b is ButtonProps => b !== undefined);

  const [activeButtons, setActiveButtons] =
    useState<ButtonProps[]>(pageSavedButtonsIfon);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  function addInputToSocial(b: ButtonProps) {
    setActiveButtons((prevButtons) => {
      return [...prevButtons, b];
    });
  }

  const saveSocials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setIsLoading(true);

    const formData = new FormData(e.currentTarget); 
    const res = await SaveSocialButtons(formData);

    if (res === true) {
      toast({
        title: "Success",
        description: "Socials links Saved!",
        variant: "success",
      });
    }

    setIsLoading(false);
  };

  const availableButtons = allbuttons.filter(
    (b1) => !activeButtons.find((b2) => b1.key === b2.key)
  );

  return (
    <SectionBox>
      <form onSubmit={saveSocials}>
        <h2 className="text-2xl font-bold text-primary mb-4">Links</h2>
        {activeButtons.map((b) => (
          <div key={b.key} className="mb-4 flex gap-2 items-center">
            <div className="w-36 flex gap-2 items-center">
              <div className="flex w-4 h-4 md:w-10 md:h-10">{b.iconsDark}</div>
              <span>{b.label}</span>
            </div>
            <input
              type="text"
              defaultValue={user.buttons[b.key]}
              style={{ marginBottom: 0 }}
              placeholder={b.placeholder}
              name={b.key}
            />
          </div>
        ))}
        <div className="flex flex-wrap gap-4 mt-4 border-t pt-4">
          {availableButtons.map((b) => (
            <Button
              type="button"
              onClick={() => addInputToSocial(b)}
              key={b.key}
              className="flex items-center gap-2"
            >
              <div>{b.icons}</div>
              <span>{b.label}</span>
              <Plus size={12} />
            </Button>
          ))}
        </div>
        <div className="flex w-full mx-auto mt-4">
          <Button type="submit" className="flex w-full md:w-1/2 xl:w-1/4 mx-auto mt-4 gap-2">
            {isLoading ? (
              <Loader2Icon className="animate-spin" size={16} />
            ) : (
              <>
                <SaveIcon size={20} />
                Save
              </>
            )}
          </Button>
        </div>
      </form>
    </SectionBox>
  );
}
