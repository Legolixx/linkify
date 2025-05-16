/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PagesRecord } from "@/lib/xata";
import SectionBox from "../SectionBox";
import { Button } from "../ui/button";
import {
  Loader2Icon,
  PlusCircle,
  SaveIcon,
  GripVertical,
  Camera,
  Trash2Icon,
} from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { UploadButton } from "@/lib/uploadthing";
import StoreImgKeys from "@/actions/storeImgKeys";
import Image from "next/image";
import { SavePageLinks } from "@/actions/accountAction";
import { useToast } from "@/hooks/use-toast";
import InputMask from "react-input-mask";

export type LinkType = {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  phone: string; // novo
  message: string; // novo
};

export default function AccountCustomLinksForm(user: PagesRecord) {
  const [isLoading, setIsLoading] = useState(false);
  const [links, setLinks] = useState<LinkType[]>(user.links || []);
  const [linkImgKey, setLinkImgKey] = useState("");
  const { toast } = useToast();

  const storeImg = useCallback(async () => {
    if (linkImgKey) {
      await StoreImgKeys(linkImgKey, "customLink");
    }
  }, [linkImgKey]);

  useEffect(() => {
    storeImg();
  }, [storeImg]);

  function save(ev: React.FormEvent) {
    ev.preventDefault();
    setIsLoading(true);

    // Monta os links do WhatsApp com base no telefone e mensagem
    const formattedLinks = links.map((link) => {
      const phone = link.phone.replace(/\D/g, ""); // remove não números
      const encodedMsg = encodeURIComponent(link.message || "");
      const whatsappUrl = `https://wa.me/${phone}${
        encodedMsg ? `?text=${encodedMsg}` : ""
      }`;

      return {
        ...link,
        url: whatsappUrl,
      };
    });

    SavePageLinks(formattedLinks)
      .then(() => {
        setIsLoading(false);
        toast({
          title: "Success",
          description: "Links do WhatsApp salvos com sucesso!",
          variant: "success",
        });
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Erro ao salvar links:", err);
      });
  }

  function addNewLink() {
    setLinks((prev: LinkType[]) => {
      return [
        ...prev,
        {
          id: Date.now().toString(),
          title: "",
          subtitle: "",
          icon: "",
          phone: "",
          message: "",
        },
      ];
    });
  }

  function handleUpload(id: string, url: string) {
    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks.forEach((link) => {
        if (link.id === id) {
          link.icon = url;
        }
      });
      return newLinks;
    });
  }

  function handleLinkChange(
    key: string,
    ev: ChangeEvent<HTMLInputElement>,
    prop: keyof LinkType
  ) {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.id === key) {
          link[prop] = ev.target.value;
        }
      });
      return newLinks;
    });
  }

  function removeLink(key: string) {
    setLinks((prevLinks) => [...prevLinks].filter((l) => l.id !== key));
  }

  return (
    <SectionBox>
      <form>
        <h2 className="text-2xl font-bold text-primary mb-4">Custom Links</h2>
        <Button onClick={addNewLink} type="button" className="flex gap-2">
          <PlusCircle />
          <span>Add new</span>
        </Button>
        <div className="">
          <ReactSortable handle=".handle" list={links} setList={setLinks}>
            {links.map((l: LinkType) => (
              <div key={l.id} className="mt-8 flex gap-2 items-center">
                <div className="handle">
                  <GripVertical className="mr-1 cursor-pointer" />
                </div>
                <div className="relative">
                  <label className="cursor-pointer">
                    {l.icon ? (
                      <Image
                        className="w-[64px] h-[64px] object-cover rounded-full"
                        src={l.icon}
                        alt="icon"
                        width={64}
                        height={64}
                        priority
                      />
                    ) : (
                      <Camera className="text-primary bg-white flex min-w-[2em]" />
                    )}

                    <UploadButton
                      endpoint="imageUploader"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onClientUploadComplete={(res) => {
                        handleUpload(l.id, res[0].url);
                        setLinkImgKey(res[0].key);
                      }}
                    />
                  </label>
                </div>

                <div className="grow">
                  <input
                    value={l.title}
                    onChange={(ev) => handleLinkChange(l.id, ev, "title")}
                    type="text"
                    placeholder="title"
                  />
                  <input
                    value={l.subtitle}
                    onChange={(ev) => handleLinkChange(l.id, ev, "subtitle")}
                    type="text"
                    placeholder="subtitle (optional)"
                  />
                  <InputMask
                    mask="+55 (99) 99999-9999"
                    value={l.phone}
                    onChange={(ev) => handleLinkChange(l.id, ev, "phone")}
                  >
                    
                    {(inputProps: any) => (
                      <input
                        {...inputProps}
                        type="text"
                        placeholder="Telefone com DDD"
                      />
                    )}
                  </InputMask>

                  <input
                    value={l.message}
                    onChange={(ev) => handleLinkChange(l.id, ev, "message")}
                    type="text"
                    placeholder="mensagem padrão do WhatsApp"
                  />
                </div>
                <div>
                  <Button
                    onClick={() => removeLink(l.id)}
                    type="button"
                    variant="destructive"
                  >
                    <Trash2Icon size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="flex w-full mx-auto mt-8">
          <Button
            type="button"
            onClick={save}
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
