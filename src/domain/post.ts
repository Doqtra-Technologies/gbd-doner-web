export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImageUrl: string | null;
  publishedAt: string;
  author: string;
  category: string;
}
