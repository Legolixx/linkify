"use client";

import { useState } from "react";
import SectionBox from "../SectionBox";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

type ButtonProps = {
  key: string;
  label: string;
  icons: JSX.Element;
  iconsDark: JSX.Element;
};

const allbuttons = [
  {
    key: "email",
    label: "E-mail",
    icons: <Image src="/icons/email.svg" width={24} height={24} alt="email" />,
    iconsDark: (
      <Image src="/iconsDark/email.svg" width={24} height={24} alt="email" />
    ),
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
  },
  {
    key: "x",
    label: "Twitter",
    icons: <Image src="/icons/x.svg" width={24} height={24} alt="X" />,
    iconsDark: <Image src="/iconsDark/x.svg" width={24} height={24} alt="X" />,
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
  },
];

export default function AccountSocialForm() {
  const [activeButtons, setActiveButtons] = useState<ButtonProps[]>([]);

  function addInputToSocial(b: ButtonProps) {
    setActiveButtons((prevButtons) => {
      return [...prevButtons, b];
    });
  }

  const availableButtons = allbuttons.filter(
    (b1) => !activeButtons.find((b2) => b1.key === b2.key)
  );

  return (
    <SectionBox>
      <h2 className="text-2xl font-bold text-primary mb-4">Links</h2>
      {activeButtons.map((b) => (
        <div key={b.key} className="mb-4 flex gap-2 items-center">
          <div className="w-36 flex gap-2 items-center">
            <div className="flex w-4 h-4 md:w-10 md:h-10">{b.iconsDark}</div>
            <span>{b.label}</span>
          </div>
          <input type="text" />
        </div>
      ))}
      <div className="flex flex-wrap  gap-4">
        {availableButtons.map((b) => (
          <Button
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
    </SectionBox>
  );
}
