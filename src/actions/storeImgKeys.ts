"use server";

import { authOptions } from "@/lib/authOptions";
import { XataClient } from "@/lib/xata";
import { getServerSession } from "next-auth";

const xata = new XataClient();

type UploadType = "avatar" | "background" | "customLink";
type UploadsByUserRecord = {
  img_keys?: string[];
  img_avatar_keys?: string[];
  custom_link_keys?: string[];
  userEmail: string;
  id: string;
};

export default async function StoreImgKeys(key: string, type: UploadType) {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("User not found");

  if (!key || key.trim() === "") {
    throw new Error("Invalid image key");
  }

  let columnToUpdate: keyof UploadsByUserRecord;
  switch (type) {
    case "background":
      columnToUpdate = "img_keys";
      break;
    case "avatar":
      columnToUpdate = "img_avatar_keys";
      break;
    case "customLink":
      columnToUpdate = "custom_link_keys";
      break;
    default:
      throw new Error("Invalid type");
  }

  const existingRecord = await xata.db.uploads_by_user
    .filter({ userEmail: session.user?.email as string })
    .getMany();

  if (existingRecord.length > 0) {
    const currentKeys = existingRecord[0][columnToUpdate] ?? [];

    if (!currentKeys.includes(key)) {
      const updatedKeys = [...currentKeys, key];

      const res = await xata.db.uploads_by_user.update(existingRecord[0].id, {
        [columnToUpdate]: updatedKeys,
      });

      return JSON.parse(JSON.stringify(res));
    } else {
      console.log("Key already exists in the array.");
      return existingRecord[0];
    }
  } else {
    const res = await xata.db.uploads_by_user.create({
      userEmail: session.user?.email as string,
      [columnToUpdate]: [key],
    });

    return JSON.parse(JSON.stringify(res));
  }
}
