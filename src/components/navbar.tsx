"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CircleUserIcon, MenuIcon, ShoppingCartIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavbarSidebar } from "./navbar-sidebar";
import Logo from "./logo";
import { useNavbarStore } from "@/stores/navbar-store";

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  defaultColor?: string;
}

const NavbarItem = ({
  href,
  children,
  isActive,
  defaultColor,
}: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "relative bg-transparent hover:bg-transparent border-transparent px-2 text-sm font-medium text-foreground",
        "after:absolute after:bottom-0 after:left-2 after:h-[3px] after:bg-current after:transition-all after:w-0 hover:after:w-6",
        isActive && "text-peak-forest",
        defaultColor
          ? `text-${defaultColor} hover:text-${defaultColor}`
          : "hover:text-peak-forest"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/womens", children: "Women" },
  { href: "/mens", children: "Men" },
  { href: "/footwear", children: "Footwear" },
  { href: "/bags", children: "Bags" },
  { href: "/sale", children: "SALE", color: "peak-maple" },
];

export const Navbar = () => {
  const variant = useNavbarStore((state) => state.variant);
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [minimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (variant !== "float") return;

    const handleScroll = () => {
      setIsMinimized(window.scrollY < 70);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Clean event
    return () => {
      setIsMinimized(false);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [variant]);

  return (
    <nav
      className={cn(
        "z-100 h-[60px] lg:h-[70px] w-full max-w-full flex justify-center ",
        "transition-all [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] duration-300  ",
        "fixed top-0 left-1/2 -translate-x-1/2 ",
        minimized && "md:pl-3 md:pr-3", // adds side padding on md+ when minimized to prevent edge-to-edge layout
        minimized && "md:top-5 md:w-full md:container" // md:container constrains outer box to container width on md+ when minimized
      )}
    >
      <div
        className="flex-1 flex justify-center bg-background shadow-xl w-full max-w-full"
      >
        <div
          className={cn(
            "flex-1 flex items-center justify-between  pl-3 pr-3",
            "container" // md:container to center and limit inner width
          )}
        >
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Navbar Items */}
          <div className="items-center gap-7 hidden md:flex">
            {navbarItems.map((item) => (
              <NavbarItem
                key={item.href}
                href={item.href}
                isActive={pathName === item.href}
                defaultColor={item.color}
              >
                {item.children}
              </NavbarItem>
            ))}
          </div>

          {/* TODO */}
          {/* Search Bar */}

          {/* Button Groups */}
          <div className="flex h-full -space-x-px">
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="h-full rounded-none"
            >
              <Link href="/login">
                <CircleUserIcon className="size-6" />
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="h-full rounded-none"
            >
              <Link href="/cart">
                <ShoppingCartIcon className="size-6" />
              </Link>
            </Button>
            <div className="flex md:hidden items-center justify-center">
              <Button
                size="sm"
                variant="secondary"
                className="h-full rounded-none"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <MenuIcon className="size-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
    </nav>
  );
};
