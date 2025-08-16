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
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <ApolloWrapper>
          <AppProvider>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
                <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
                  <h1 className="text-xl font-semibold tracking-tight">Easy Spaces</h1>
                  <nav className="flex gap-6 text-sm">
                    <a className="hover:text-slate-900 text-slate-600" href="/">Home</a>
                    <a className="hover:text-slate-900 text-slate-600" href="/customers">Customers</a>
                    <a className="hover:text-slate-900 text-slate-600" href="/reservations">Reservations</a>
                    <a className="hover:text-slate-900 text-slate-600" href="/designer">Designer</a>
                  </nav>
                </div>
              </header>
              <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
              <footer className="border-t border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500">
                  © {new Date().getFullYear()} Easy Spaces
                </div>
              </footer>
            </div>
          </AppProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
