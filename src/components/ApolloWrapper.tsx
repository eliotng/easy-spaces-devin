"use client";

import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const client = new ApolloClient({
    link: new HttpLink({ uri: "/api/graphql" }),
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
