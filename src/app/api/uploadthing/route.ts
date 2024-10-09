import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export GET and POST routes for Next.js App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
