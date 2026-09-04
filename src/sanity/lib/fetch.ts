import { client } from "./client";
import {
  POST_QUERY,
  POST_SLUGS_QUERY,
  POSTS_QUERY,
  POSTS_SITEMAP_QUERY,
} from "./queries";
import type { Post, PostCard, SanityImage } from "./types";

const revalidate = { next: { revalidate: 60 } };

export async function getPosts(): Promise<PostCard[]> {
  return client.fetch(POSTS_QUERY, {}, revalidate);
}

export async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(POST_QUERY, { slug }, revalidate);
}

export async function getPostSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(POST_SLUGS_QUERY, {}, revalidate);
}

export async function getPostsForSitemap(): Promise<
  {
    slug: string;
    publishedAt: string;
    _updatedAt: string;
    coverImage?: SanityImage;
  }[]
> {
  return client.withConfig({ useCdn: false }).fetch(
    POSTS_SITEMAP_QUERY,
    {},
    { cache: "no-store" },
  );
}
