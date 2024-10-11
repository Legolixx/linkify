"use client";

import { PagesRecord } from "@/lib/xata";
import SectionBox from "../SectionBox";
import { Button } from "../ui/button";
import { Cloud, Loader2Icon, PlusCircle, SaveIcon } from "lucide-react";
import { useState } from "react";

export default function AccountCustomLinksForm(user: PagesRecord) {
  const [isLoading, setIsLoading] = useState(false);
  const [links, setLinks] = useState(user.links || []);

  function save(formData: FormData) {
    setIsLoading(true);
    console.log(formData);
  }

  function addNewLink() {
    setLinks((prev) => {
      return (prev) => {
        return [...prev, { title: "", subtitle: "", icon: "", url: "" }];
      };
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
          {links.map((l) => (
            <div key={l.key} className="mt-8 flex gap-2 items-center">
              <div className="text-center">
                <div className="bg-gray-300 p-4 rounded-s-none">
                  <Cloud />
                </div>
                <div className="grow">
                  <input type="text" placeholder="title" />
                  <input type="text" placeholder="subtitle (optional)" />
                  <input type="text" placeholder="url" />
                </div>
              </div>
            </div>
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
