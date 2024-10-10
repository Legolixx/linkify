/* eslint-disable @typescript-eslint/no-unused-vars */
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions);

      if (!session?.user?.email) {
        throw new UploadThingError("Unauthorized");
      }

      return { customId: session.user.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.customId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
