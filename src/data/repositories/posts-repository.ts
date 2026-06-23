import type { Post } from "@/domain/post";
import { client } from "@/data/sanity/client";

export interface PostDetail extends Post {
  bodyHtml: string;
}

export async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    "featuredImageUrl": featuredImage.asset->url,
    publishedAt,
    author,
    category
  }`;

  const posts = await client.fetch<Post[]>(query);
  return posts || [];
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    "featuredImageUrl": featuredImage.asset->url,
    publishedAt,
    author,
    category,
    bodyHtml
  }`;

  const post = await client.fetch<PostDetail | null>(query, { slug });
  return post;
}
