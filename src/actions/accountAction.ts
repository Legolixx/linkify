"use server";

import { XataClient } from "@/lib/xata";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { LinkType } from "@/components/forms/accountCustomLinks";

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
    if (avatarImage) {
      updateData.avatarImage = avatarImage;
    }

    await xata.db.pages.update(accountID, updateData);
    return true;
  }

  return false;
}

export async function SaveSocialButtons(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      throw new Error("No active session found.");
    }

    const page = await xata.db.pages
      .filter({ owner: session.user.email })
      .getMany();

    if (!page || page.length === 0) {
      throw new Error("Page not found for the user.");
    }

    const pageId = page[0].id;

    const buttonsToSave: { key: string; value: string }[] = [];
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        buttonsToSave.push({ key, value });
      }
    });

    const dataToUpdate = { buttons: buttonsToSave };

    await xata.db.pages.update(pageId, dataToUpdate);

    return true;
  } catch (error) {
    console.error("Failed to save social buttons:", error);
    return false;
  }
}

export async function SavePageLinks(links: LinkType[]) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      throw new Error("No active session found.");
    }

    const page = await xata.db.pages
      .filter({ owner: session.user.email })
      .getMany();

    if (!page || page.length === 0) {
      throw new Error("Page not found for the user.");
    }

    const pageId = page[0].id;

    await xata.db.pages.update(pageId, {
      links: links,
    });
  } catch (error) {
    console.error("Error saving links:", error);
    throw error;
  }
}
