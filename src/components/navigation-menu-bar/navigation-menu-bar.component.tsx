import { useUser } from "@auth0/nextjs-auth0/client";
import {
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui/navigation-menu";

import Link from "next/link";
import Image from "next/image";
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";

import { cn } from "ui/components/lib/utils";

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-snug">{title}</div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

const NavigationMenuBar = () => {
  const { user } = useUser();

  return (
    <NavigationMenu
      style={{
        minHeight: "5vh",
        maxHeight: "5vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: "20px",
        marginTop: "20px",
        alignItems: "center",
        marginLeft: "auto",
      }}
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          {!user && (
            <Link href="/api/auth/login" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Sign In
              </NavigationMenuLink>
            </Link>
          )}
          {user && (
            <>
              <NavigationMenuTrigger>
                <Image
                  src={user.picture || "/default_avatar.jpeg"}
                  alt="user profile picture"
                  height={25}
                  width={25}
                  style={{
                    borderRadius: "100%",
                    marginRight: "10px",
                  }}
                />
                {user.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col w-[150px]">
                  <ListItem
                    key="library"
                    title="Your Library"
                    href="/my-library"
                  />
                  <ListItem
                    key="logout"
                    title="Log out"
                    href="/api/auth/logout"
                  />
                </ul>
              </NavigationMenuContent>
            </>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenuBar;
