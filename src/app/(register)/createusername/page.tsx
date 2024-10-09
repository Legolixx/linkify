import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { XataClient } from "@/lib/xata";
import UserNameForm from "@/components/forms/UserNameForm";

interface AccountPageProps {
  searchParams: {
    desiredUsername?: string;
  };
}
const xata = new XataClient();

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const session = await getServerSession(authOptions);
  const { desiredUsername } = searchParams;

  const alredyHavePage = await xata.db.pages
    .filter({
      owner: session?.user?.email as string,
    })
    .getMany();

  if (alredyHavePage.length > 0) {
    redirect(`/account/${alredyHavePage[0].uri}`);
  }

  async function handleFormSubmit(formData: FormData): Promise<string> {
    "use server";
    const username = formData.get("username") as string;

    try {
      const existingPage = await xata.db.pages
        .filter({ uri: username })
        .getFirst();

      if (existingPage) {
        return "Username already exists!";
      }

      await xata.db.pages.create({
        uri: username,
        owner: session?.user?.email as string,
      });
      return "Success";
    } catch (error) {
      console.log("Error creating page ", error);
      return "Error";
    }
  }

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <UserNameForm
        desiredUsername={desiredUsername}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}
