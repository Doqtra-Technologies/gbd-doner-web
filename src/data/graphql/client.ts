import { GraphQLClient } from "graphql-request";
import { dataConfig } from "@/lib/config";

let cached: GraphQLClient | null = null;

export function getGraphQLClient(): GraphQLClient {
  if (!dataConfig.graphqlUrl) {
    throw new Error(
      "NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL is not set. Either configure it in .env or keep NEXT_PUBLIC_USE_MOCK_DATA=true.",
    );
  }
  if (!cached) {
    cached = new GraphQLClient(dataConfig.graphqlUrl, {
      headers: { "Content-Type": "application/json" },
    });
  }
  return cached;
}
