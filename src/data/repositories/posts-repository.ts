import { dataConfig } from "@/lib/config";
import type { Post } from "@/domain/post";
import { getGraphQLClient } from "@/data/graphql/client";
import { POSTS_QUERY, POST_BY_SLUG_QUERY } from "@/data/graphql/queries";
import { MOCK_POSTS } from "@/data/graphql/mocks";
import { sanitizeImageUrl } from "@/lib/utils";

interface RawPostsResponse {
  posts: {
    nodes: Array<{
      id: string;
      slug: string;
      title: string;
      excerpt: string | null;
      date: string;
      featuredImage: { node: { sourceUrl: string } } | null;
      author: { node: { name: string } } | null;
      categories: { nodes: Array<{ name: string }> } | null;
    }>;
  };
}

function stripHtml(s: string | null | undefined): string {
  if (!s) return "";
  return s.replace(/<[^>]*>/g, "").trim();
}

export async function getPosts(): Promise<Post[]> {
  if (dataConfig.useMocks) return MOCK_POSTS;

  try {
    const client = getGraphQLClient();
    const data = await client.request<RawPostsResponse>(POSTS_QUERY);

    return (data.posts?.nodes ?? [])
      .filter((node) => node && node.slug)
      .map((node): Post => ({
        id: node.id,
        slug: node.slug,
        title: node.title,
        excerpt: stripHtml(node.excerpt),
        featuredImageUrl: sanitizeImageUrl(node.featuredImage?.node.sourceUrl) || null,
        publishedAt: node.date,
        author: node.author?.node.name ?? "GBD Editorial",
        category: node.categories?.nodes[0]?.name ?? "The Feed",
      }));
  } catch (error) {
    console.error("Failed to fetch posts from WordPress, falling back to mock posts:", error);
    return MOCK_POSTS;
  }
}

export interface PostDetail extends Post {
  /** Sanitized-from-WP HTML body. Render with dangerouslySetInnerHTML. */
  bodyHtml: string;
}

interface RawPostBySlugResponse {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string | null;
    date: string;
    featuredImage: { node: { sourceUrl: string; altText: string | null } } | null;
    author: { node: { name: string } } | null;
    categories: { nodes: Array<{ name: string }> } | null;
  } | null;
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  if (dataConfig.useMocks) {
    // Mock posts don't carry a body; surface the excerpt so the page renders.
    // (No notFound — keeps preview routes navigable while WP is offline.)
    const mock = (await getPosts()).find((p) => p.slug === slug);
    if (!mock) return null;
    return { ...mock, bodyHtml: `<p>${mock.excerpt}</p>` };
  }

  try {
    const client = getGraphQLClient();
    const data = await client.request<RawPostBySlugResponse>(POST_BY_SLUG_QUERY, { slug });
    const node = data.post;
    if (!node) return null;

    return {
      id: node.id,
      slug: node.slug,
      title: node.title,
      excerpt: stripHtml(node.excerpt),
      featuredImageUrl: sanitizeImageUrl(node.featuredImage?.node.sourceUrl) || null,
      publishedAt: node.date,
      author: node.author?.node.name ?? "GBD Editorial",
      category: node.categories?.nodes[0]?.name ?? "The Feed",
      bodyHtml: node.content ?? "",
    };
  } catch (error) {
    console.error(`Failed to fetch post by slug ${slug} from WordPress, falling back to mock:`, error);
    const mock = MOCK_POSTS.find((p) => p.slug === slug);
    if (!mock) return null;
    return { ...mock, bodyHtml: `<p>${mock.excerpt}</p>` };
  }
}
