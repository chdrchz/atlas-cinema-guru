import "@/app/global.css";
import { SessionProvider } from "next-auth/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={`antialiased  bg-[#00003c] text-white`}>
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
