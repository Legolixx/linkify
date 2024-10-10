"use server";

import { XataClient } from "@/lib/xata";
import { UTApi } from "uploadthing/server";

const xata = new XataClient();
const utapi = new UTApi();

export async function CheckAndDeleteImage(email: string) {
  const userRecord = await xata.db.uploads_by_user
    .filter({
      userEmail: email,
    })
    .getFirst();

  if (userRecord && userRecord.img_keys) {
    const imgKeys = userRecord.img_keys;

    if (imgKeys.length > 1) {
      const imagesToDelete = imgKeys.slice(0, -1);
      const lastImageKey = imgKeys[imgKeys.length - 1];

      await utapi.deleteFiles(imagesToDelete);

      const updatedRecord = await xata.db.uploads_by_user.update(
        userRecord.id,
        {
          img_keys: [lastImageKey],
        }
      );

      return JSON.parse(JSON.stringify(updatedRecord));
    } else {
      return JSON.parse(JSON.stringify(userRecord));
    }
  } else {
    throw new Error("Usuário não encontrado ou sem imagens.");
  }
}
