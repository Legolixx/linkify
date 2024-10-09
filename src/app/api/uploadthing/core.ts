/* eslint-disable @typescript-eslint/no-unused-vars */
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

// Create an instance of Uploadthing
const f = createUploadthing();

// FileRouter for handling the upload
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      // Get the server session inside the middleware
      const session = await getServerSession(authOptions);
      
      // If there's no session, throw an error
      if (!session?.user?.email) {
        throw new UploadThingError("Unauthorized");
      }
      
      // Return the user email as metadata (accessible in `onUploadComplete`)
      return { userId: session.user.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on the server after the upload is complete
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

// Export the FileRouter type
export type OurFileRouter = typeof ourFileRouter;
