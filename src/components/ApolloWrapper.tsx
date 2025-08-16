"use client";

import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const uri =
    typeof window !== "undefined" && window.location?.origin
      ? `${window.location.origin}/api/graphql`
      : "/api/graphql";

  const client = new ApolloClient({
    link: new HttpLink({ uri }),
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
