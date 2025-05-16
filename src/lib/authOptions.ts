import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { XataAdapter } from "@next-auth/xata-adapter";
import { XataClient } from "@/lib/xata";

const client = new XataClient();

export const authOptions: NextAuthOptions = {
  adapter: XataAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
