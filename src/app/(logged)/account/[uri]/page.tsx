import AccountSettingsForm from "@/components/forms/AccountSettingsForm";
import AccountSocialForm from "@/components/forms/AccountSocialForm";
import { authOptions } from "@/lib/authOptions";
import { XataClient } from "@/lib/xata";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PagesRecord } from "@/lib/xata";
import AccountCustomLinksForm from "@/components/forms/accountCustomLinks";

type PageProps = {
  params: { uri: string };
};

const xata = new XataClient();

async function AccountPage({ params: { uri } }: PageProps) {
  const session = await getServerSession(authOptions);

  const page = await xata.db.pages
    .filter({
      owner: session?.user?.email as string,
    })
    .getMany();

  if (uri !== page[0].uri) {
    redirect(`/account/${page[0].uri}`);
  }

  const user: PagesRecord = JSON.parse(JSON.stringify(page[0]));

  return (
    <>
      <AccountSettingsForm {...user} img={session?.user?.image} />
      <AccountSocialForm {...user} />
      <AccountCustomLinksForm {...user} />
    </>
  );
}

export default AccountPage;
