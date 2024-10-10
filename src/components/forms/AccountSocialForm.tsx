/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DiscordLogoIcon,
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
} from "@radix-ui/react-icons";
import SectionBox from "../SectionBox";
import { Button } from "../ui/button";
import { Facebook, Instagram, Plus, Smartphone, Youtube } from "lucide-react";

export default function AccountSocialForm() {
  const buttons = [
    { key: "email", label: "E-mail", icons: <EnvelopeOpenIcon /> },
    { key: "mobile", label: "Mobile", icons: <Smartphone /> },
    { key: "instagram", label: "Instagram", icons: <InstagramLogoIcon /> },
    // { key: "facebook", label: "Facebook", icons: <Facebook /> },
    { key: "discord", label: "Discord", icons: <DiscordLogoIcon /> },
    { key: "tiktok", label: "Tiktok", icons: <EnvelopeOpenIcon /> },
    // { key: "youtube", label: "Youtube", icons: <Youtube /> },
    { key: "whatsapp", label: "Whatsapp", icons: <EnvelopeOpenIcon /> },
    { key: "github", label: "Github", icons: <GitHubLogoIcon /> },
  ];
  return (
    <SectionBox>
      <div className="flex flex-col max-w-[8em]">
        {buttons.map((b) => (
          <Button key={b.key} className="gap-2">
            <div className="flex w-4 h-4">{b.icons}</div>
            <span>{b.label}</span>
            <Plus size={12} />
          </Button>
        ))}
      </div>
    </SectionBox>
  );
}
