import { XataClient } from "@/lib/xata";
import { LinkIcon, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface UserPageParams {
  uri: string;
}

const xata = new XataClient();

const buttonsIcons = {
  email: (
    <Image src="/iconsdark/email.svg" width={24} height={24} alt="email" />
  ),
  instagram: (
    <Image
      src="/iconsdark/instagram.svg"
      width={24}
      height={24}
      alt="instagram"
    />
  ),
  facebook: (
    <Image
      src="/iconsdark/facebook.svg"
      width={24}
      height={24}
      alt="Facebook"
    />
  ),
  discord: (
    <Image src="/iconsdark/discord.svg" width={24} height={24} alt="discord" />
  ),
  tiktok: (
    <Image src="/iconsdark/tiktok.svg" width={24} height={24} alt="tiktok" />
  ),
  whatsapp: (
    <Image
      src="/iconsdark/whatsApp.svg"
      width={24}
      height={24}
      alt="whatsapp"
    />
  ),
  github: (
    <Image src="/iconsdark/github.svg" width={24} height={24} alt="github" />
  ),
  x: <Image src="/iconsdark/x.svg" width={24} height={24} alt="X" />,
  telegram: (
    <Image
      src="/iconsdark/telegram.svg"
      width={24}
      height={24}
      alt="telegram"
    />
  ),
};

type ButtonKey = keyof typeof buttonsIcons;

export default async function UserPage({ params }: { params: UserPageParams }) {
  const uri = params.uri;

  const page = await xata.db.pages
    .filter({
      uri,
    })
    .getMany();

  const pageData = page[0];
  let buttons = [];
  let links = [];

  if (typeof pageData.buttons === "string") {
    try {
      buttons = JSON.parse(pageData.buttons);
    } catch (error) {
      console.error("Error parsing buttons JSON:", error);
    }
  } else {
    buttons = pageData.buttons;
  }

  if (typeof pageData.links === "string") {
    try {
      links = JSON.parse(pageData.links);
    } catch (error) {
      console.error("Error parsing buttons JSON:", error);
    }
  } else {
    links = pageData.links;
  }

  return (
    <div>
      <div
        className="min-h-[200px] bg-gray-400 bg-cover bg-center"
        style={
          pageData.bgType === "color"
            ? { backgroundColor: pageData.bgColor || "#2196F3" }
            : { backgroundImage: `url(${pageData.bgImage})` }
        }
      ></div>
      <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg shadow-black/50 overflow-hidden bg-cover bg-center mx-auto relative -top-16 -mb-12">
        <Image
          className="w-full h-full object-cover"
          src={pageData.avatarImage || "/defaultBanner.png"}
          alt="avatar"
          width={128}
          height={128}
          priority
        />
      </div>
      <h2 className="text-lg text-center mb-1 text-primary">
        {pageData.displayName}
      </h2>
      <h3 className="flex text-md text-muted-foreground gap-2 justify-center items-center">
        <MapPin size={18} />
        <span>{pageData.location}</span>
      </h3>
      <div className="max-w-xs mx-auto text-center my-2">
        <p className="text-primary">{pageData.bio}</p>
      </div>
      <div className="flex gap-2 justify-center mt-4">
        {buttons.map((button: { key: string; value: string }) => (
          <Link
            target="_blank"
            key={button.key}
            href={button.value}
            className="rounded-full border border-primary p-2"
          >
            {button.key in buttonsIcons
              ? buttonsIcons[button.key as ButtonKey]
              : null}
          </Link>
        ))}
      </div>
      <div className="max-w-lg md:max-w-5xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-8 text-white">
        {links.map(
          (link: {
            url: string;
            title: string;
            subtitle: string;
            icon: string;
          }) => (
            <Link
              target="_blank"
              className="bg-primary p-2 flex rounded-sm"
              key={link.url}
              href={link.url}
            >
              <div className="bg-slate-700 aspect-square relative -left-4 w-16 h-16 flex items-center justify-center rounded-md">
                {link.icon ? (
                  <Image
                    className="rounded-md"
                    src={link.icon}
                    alt="icon"
                    width={64}
                    height={64}
                  />
                ) : (
                  <LinkIcon size={32} />
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg">{link.title}</h3>
                <p className="text-sm text-white/50">{link.subtitle}</p>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
