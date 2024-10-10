import SectionBox from "../SectionBox";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function AccountSocialForm() {
  const buttons = [
    {
      key: "email",
      label: "E-mail",
      icons: (
        <Image src="/icons/email.svg" width={24} height={24} alt="email" />
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
    },
    {
      key: "facebook",
      label: "Facebook",
      icons: (
        <Image
          src="/icons/facebook.svg"
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
        <Image
          src="/icons/discord.svg"
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
    },
    {
      key: "whatsapp",
      label: "Whatsapp",
      icons: (
        <Image
          src="/icons/whatsApp.svg"
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
    },
  ];

  return (
    <SectionBox>
      <div className="flex flex-col max-w-[10em] gap-4">
        {buttons.map((b) => (
          <Button key={b.key} className="gap-2">
            <div>{b.icons}</div>
            <span>{b.label}</span>
            <Plus size={12} />
          </Button>
        ))}
      </div>
    </SectionBox>
  );
}
