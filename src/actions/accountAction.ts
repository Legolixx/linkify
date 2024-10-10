"use server";

import { XataClient } from "@/lib/xata";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const xata = new XataClient();

export async function saveAccountSettingsAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  const account = await xata.db.pages
    .filter({
      owner: session?.user?.email,
    })
    .getMany();

  if (account.length === 0) {
    throw new Error("No account found for the given user.");
  }

  const accountID = account[0].id;

  if (session) {
    const displayName = formData.get("displayName") as string;
    const location = formData.get("location") as string;
    const bio = formData.get("bio") as string;
    const bgType = formData.get("bgType") as string;
    const bgImage = formData.get("bgImage") as string | null;
    const avatarImage = formData.get("avatarImage") as string | null;
    const bgColor = formData.get("bgColor") as string | null;

    const updateData: Record<string, string | null> = {
      displayName,
      location,
      bio,
      bgType,
    };

    if (bgColor) {
      updateData.bgColor = bgColor;
    }
    if (bgImage) {
      updateData.bgImage = bgImage;
    }
    if(avatarImage) {
      updateData.avatarImage = avatarImage
    }

    await xata.db.pages.update(accountID, updateData);
    return true;
  }

  return false;
}
