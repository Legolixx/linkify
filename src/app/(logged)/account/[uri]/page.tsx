import AccountSettingsForm from "@/components/forms/AccountSettingsForm";
import { authOptions } from "@/lib/authOptions";
import { XataClient } from "@/lib/xata";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type PageProps = {
  params: { uri: string };
};

const xata = new XataClient();

async function AccountPage({ params: { uri } }: PageProps) {
  const session = await getServerSession(authOptions);

  const userName = await xata.db.pages
    .filter({
      owner: session?.user?.email as string,
    })
    .getMany();

  if (uri !== userName[0].uri) {
    redirect(`/account/${userName[0].uri}`);
  }

  const userStringfy = JSON.parse(JSON.stringify(userName));

  return (
    <div>
      <AccountSettingsForm user={userStringfy} img={session?.user?.image} />
    </div>
  );
}

export default AccountPage;
