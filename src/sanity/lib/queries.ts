import { defineQuery } from "next-sanity";

const postCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  tags,
  coverImage
`;

const postFields = /* groq */ `
  ${postCardFields},
  body,
  seoTitle,
  seoDescription
`;

export const POSTS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc) {
    ${postCardFields}
  }
`);

export const POST_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields}
  }
`);

export const POST_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const POSTS_SITEMAP_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc) {
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }
`);
