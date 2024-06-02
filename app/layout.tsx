"use client";
import NavigationMenuBar from "@components/navigation-menu-bar.component";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "@ui/sonner";
import VideoContextProvider from "@context/video-context.provider";
import { Mulish } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={mulish.className}>
      <head>
        <title>Vid.io</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🎥</text></svg>"
        ></link>
      </head>
      <body className="h-full w-full bg-slate-950">
        <UserProvider>
          <VideoContextProvider>
            <NavigationMenuBar />
            <div className="overflow-hidden relative h-full w-full">
              {children}
            </div>
            <Toaster />
            <div className="-z-50 absolute bottom-0 left-0 right-0 top-[-20px] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          </VideoContextProvider>
        </UserProvider>
      </body>
    </html>
  );
}
