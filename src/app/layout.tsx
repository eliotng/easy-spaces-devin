import "./globals.css";
import { ReactNode } from "react";
import { ApolloWrapper } from "@/components/ApolloWrapper";
import { AppProvider } from "@/context/AppContext";

export const metadata = {
  title: "Easy Spaces",
  description: "Easy Spaces (Next.js + Tailwind + GraphQL)"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <ApolloWrapper>
          <AppProvider>
            <div className="mx-auto max-w-6xl px-4 py-6">
              <header className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Easy Spaces</h1>
                <nav className="flex gap-4 text-sm">
                  <a className="hover:underline" href="/">Home</a>
                  <a className="hover:underline" href="/customers">Customers</a>
                  <a className="hover:underline" href="/reservations">Reservations</a>
                  <a className="hover:underline" href="/designer">Designer</a>
                </nav>
              </header>
              {children}
            </div>
          </AppProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
