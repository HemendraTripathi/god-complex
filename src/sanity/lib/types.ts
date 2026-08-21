import type { PortableTextBlock } from "next-sanity";

export type SanityImage = {
  _type?: "image";
  asset?: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  tags?: string[];
  coverImage?: SanityImage;
};

export type Post = PostCard & {
  body: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
};
