/**
 * Mount Sanity Studio at /studio.
 * After running `npm run dev`, visit http://localhost:3000/studio.
 */
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

// Must be dynamic — Studio cannot be statically rendered
export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
