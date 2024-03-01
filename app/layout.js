import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import StoreProvider from "./storeProvider";
import "@/styles/globals.css";
import { Providers } from "./providers";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <html lang="en">
          <body className="overflow-hidden">
            <Providers>
              <div className="flex dark:bg-black">
                <Sidebar showSidebar={true} />
                <div className="main w-full max-h-[100vh] scrollbar-hide overflow-y-auto">
                  <Header
                    showSidebar
                    setShowSidebar={true}
                  />
                  {children}
                </div>
              </div>
            </Providers>
          </body>
        </html>
      </StoreProvider>
    </SessionProvider>
  );
}
