import { dataConfig } from "@/lib/config";
import type { Post } from "@/domain/post";
import { getGraphQLClient } from "@/data/graphql/client";
import { POSTS_QUERY } from "@/data/graphql/queries";
import { MOCK_POSTS } from "@/data/graphql/mocks";

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

  const client = getGraphQLClient();
  const data = await client.request<RawPostsResponse>(POSTS_QUERY);

  return data.posts.nodes.map((node): Post => ({
    id: node.id,
    slug: node.slug,
    title: node.title,
    excerpt: stripHtml(node.excerpt),
    featuredImageUrl: node.featuredImage?.node.sourceUrl ?? null,
    publishedAt: node.date,
    author: node.author?.node.name ?? "GBD Editorial",
    category: node.categories?.nodes[0]?.name ?? "The Feed",
  }));
}
