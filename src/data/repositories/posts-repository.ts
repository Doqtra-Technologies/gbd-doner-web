import { dataConfig } from "@/lib/config";
import type { Post } from "@/domain/post";
import { client } from "@/data/sanity/client";
import { MOCK_POSTS } from "@/data/graphql/mocks";

export interface PostDetail extends Post {
  bodyHtml: string;
}

export async function getPosts(): Promise<Post[]> {
  if (dataConfig.useMocks) return MOCK_POSTS;

  try {
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
  } catch (error) {
    console.error("Failed to fetch posts from Sanity, falling back to mock posts:", error);
    return MOCK_POSTS;
  }
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  if (dataConfig.useMocks) {
    const mock = (await getPosts()).find((p) => p.slug === slug);
    if (!mock) return null;
    return { ...mock, bodyHtml: `<p>${mock.excerpt}</p>` };
  }

  try {
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
  } catch (error) {
    console.error(`Failed to fetch post by slug ${slug} from Sanity, falling back to mock:`, error);
    const mock = MOCK_POSTS.find((p) => p.slug === slug);
    if (!mock) return null;
    return { ...mock, bodyHtml: `<p>${mock.excerpt}</p>` };
  }
}
