import "server-only";

import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";

type FetchOpts = {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number | false;
};

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
  revalidate = 60
}: FetchOpts): Promise<T | null> {
  if (!isSanityConfigured) return null;

  return client.fetch<T>(query, params, {
    next: {
      revalidate: tags ? false : revalidate,
      tags
    }
  });
}