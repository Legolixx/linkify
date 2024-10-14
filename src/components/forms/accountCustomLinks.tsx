"use client";

import { PagesRecord } from "@/lib/xata";
import SectionBox from "../SectionBox";
import { Button } from "../ui/button";
import {
  Cloud,
  Loader2Icon,
  PlusCircle,
  SaveIcon,
  Link,
  GripVertical,
} from "lucide-react";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";

type LinkType = {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  url: string;
};

export default function AccountCustomLinksForm(user: PagesRecord) {
  const [isLoading, setIsLoading] = useState(false);
  const [links, setLinks] = useState<LinkType[]>(user.links || []);

  function save(formData: FormData) {
    setIsLoading(true);
    console.log(formData);
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
          url: "",
        },
      ];
    });
  }

  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-2xl font-bold text-primary mb-4">Custom Links</h2>
        <Button onClick={addNewLink} type="button" className="flex gap-2">
          <PlusCircle />
          <span>Add new</span>
        </Button>
        <div className="">
          <ReactSortable list={links} setList={setLinks}>
            {links.map((l: LinkType) => (
              <div key={l.id} className="mt-8 flex gap-2 items-center">
                <div>
                  <GripVertical className="mr-1 cursor-pointer" />
                </div>
                <div className="text-center">
                  <div className="p-4 rounded-full inline-block">
                    <Link />
                  </div>
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2 p-2 gap-1"
                    >
                      <Cloud />
                      <span>change icon</span>
                    </Button>
                  </div>
                </div>
                <div className="grow">
                  <input type="text" placeholder="title" />
                  <input type="text" placeholder="subtitle (optional)" />
                  <input type="text" placeholder="url" />
                </div>
              </div>
            ))}
          </ReactSortable>
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
