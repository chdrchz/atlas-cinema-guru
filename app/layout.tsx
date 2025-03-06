import "@/app/global.css";
import { SessionProvider } from "next-auth/react";
import { Metadata } from "next";
import AuthProvider from "@/components/providers/AuthProvider";

import SideNav from "@/components/SideNav/SideNav";
import Header from "@/components/Header";

import "@/styles/layout.css";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="body">
        <SessionProvider>
          <AuthProvider>
            <div className="container-layout">
              <Header />
              <div className="component-layout">
                <SideNav />
                <main className="main">{children}</main>
              </div>
            </div>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

