"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { XataClient } from "@/lib/xata";
import { getServerSession } from "next-auth";

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

    await xata.db.pages.update(accountID, {
      displayName,
      location,
      bio,
    });
    return true;
  }
  return false;
}
