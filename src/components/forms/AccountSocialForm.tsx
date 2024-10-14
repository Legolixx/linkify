"use client";

import { useState } from "react";
import SectionBox from "../SectionBox";
import { Button } from "../ui/button";
import { ReactSortable } from "react-sortablejs";
import {
  GripVertical,
  Loader2Icon,
  Plus,
  SaveIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import { SaveSocialButtons } from "@/actions/accountAction";
import { useToast } from "@/hooks/use-toast";
import { PagesRecord } from "@/lib/xata";

type ButtonProps = {
  id: string;
  label: string;
  placeholder: string;
  icons: JSX.Element;
  iconsDark: JSX.Element;
};

const allbuttons: ButtonProps[] = [
  {
    id: "email",
    label: "E-mail",
    icons: <Image src="/icons/email.svg" width={24} height={24} alt="email" />,
    iconsDark: (
      <Image src="/iconsDark/email.svg" width={24} height={24} alt="email" />
    ),
    placeholder: "johndoe@example.com",
  },
  {
    id: "instagram",
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
    id: "facebook",
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
    id: "discord",
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
    id: "tiktok",
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
    id: "whatsapp",
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
    id: "github",
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
    id: "x",
    label: "Twitter",
    icons: <Image src="/icons/x.svg" width={24} height={24} alt="X" />,
    iconsDark: <Image src="/iconsDark/x.svg" width={24} height={24} alt="X" />,
    placeholder: "https://www.twitter.com/johndoe",
  },
  {
    id: "telegram",
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
  const pageSavedButtonsArray = Array.isArray(user.buttons) ? user.buttons : [];

  const pageSavedButtonsInfo: ButtonProps[] = pageSavedButtonsArray
    .map((button: { key: string }) =>
      allbuttons.find((b) => b.id === button.key)
    )
    .filter((b): b is ButtonProps => b !== undefined);

  const [activeButtons, setActiveButtons] =
    useState<ButtonProps[]>(pageSavedButtonsInfo);
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

    const formData = new FormData();

    activeButtons.forEach((button) => {
      const inputElement = document.querySelector(
        `input[name="${button.id}"]`
      ) as HTMLInputElement;
      if (inputElement) {
        formData.append(button.id, inputElement.value);
      }
    });

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

  function removeButton(b: ButtonProps) {
    setActiveButtons((prevButtons) => {
      return prevButtons.filter((button) => button.id !== b.id);
    });
    toast({
      title: "Success",
      description: "Click save to apply your changes.",
      variant: "success",
    });
  }

  const availableButtons = allbuttons.filter(
    (b1) => !activeButtons.find((b2) => b1.id === b2.id)
  );

  return (
    <SectionBox>
      <form onSubmit={saveSocials}>
        <h2 className="text-2xl font-bold text-primary mb-4">Social Links</h2>
        <ReactSortable
          handle=".handle"
          list={activeButtons}
          setList={setActiveButtons}
        >
          {activeButtons.map((b) => {
            const buttonData = pageSavedButtonsArray.find(
              (btn: { key: string }) => btn.key === b.id
            );
            return (
              <div key={b.id} className="mb-4 flex gap-2 items-center">
                <div className="w-48 flex gap-1 md:gap-3 items-center">
                  <GripVertical className="cursor-pointer text-primary h-4 w-4 handle" />
                  <div className="flex w-4 h-4 md:w-auto md:h-auto">
                    {b.iconsDark}
                  </div>
                  <span className="text-xs md:text-base">{b.label}</span>
                </div>
                <input
                  type="text"
                  defaultValue={buttonData ? buttonData.value : ""}
                  style={{ marginBottom: 0 }}
                  placeholder={b.placeholder}
                  name={b.id}
                />
                <Button
                  type="button"
                  onClick={() => removeButton(b)}
                  variant="destructive"
                >
                  <Trash2Icon size={20} />
                </Button>
              </div>
            );
          })}
        </ReactSortable>

        <div className="flex flex-wrap gap-4 mt-4 border-t pt-4">
          {availableButtons.map((b) => (
            <Button
              type="button"
              onClick={() => addInputToSocial(b)}
              key={b.id}
              className="flex items-center gap-2"
            >
              <div>{b.icons}</div>
              <span>{b.label}</span>
              <Plus size={12} />
            </Button>
          ))}
        </div>
        <div className="flex w-full mx-auto mt-8">
          <Button
            type="submit"
            className="flex w-full md:w-1/2 xl:w-1/4 mx-auto mt-4 gap-2"
          >
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
