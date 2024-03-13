"use client";

import NavigationMenuBar from "@components/navigation-menu-bar/navigation-menu-bar.component";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative h-full w-full bg-slate-950">
        <UserProvider>
          <NavigationMenuBar />
          {children}
          <Toaster />
          <div className="-z-50 absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </UserProvider>
      </body>
    </html>
  );
}
