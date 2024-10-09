import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { XataAdapter } from "@auth/xata-adapter";
import { XataClient } from "@/lib/xata";

const client = new XataClient();

export const authOptions = {
  adapter: XataAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};
    
// Handler for the Next.js API route
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST methods
export { handler as GET, handler as POST };
