"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CircleUserIcon, MenuIcon, ShoppingCartIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavbarSidebar } from "./navbar-sidebar";
import Logo from "./logo";

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  defaultColor?: string;
}

const NavbarItem = ({ href, children, isActive, defaultColor }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "relative bg-transparent hover:bg-transparent border-transparent px-2 text-sm",
        "after:absolute after:bottom-0 after:left-2 after:h-[3px] after:bg-current after:transition-all after:w-0 hover:after:w-6",
        isActive && "text-peak-forest",
        defaultColor ? `text-${defaultColor} hover:text-${defaultColor}` : "hover:text-peak-forest",
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
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed z-100 h-[70px] flex justify-between items-center font-medium bg-white p-2",
        "transition-all duration-200 top-0 left-1/2 -translate-x-1/2 max-w-[96rem]",
        isSticky
        ? "w-full"
        : "w-full lg:w-[calc(100%-10rem)]"
      )}
    >
      <Logo />

      {/* Navbar Items */}
      <div className="item-center gap-4 hidden lg:flex">
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
          className="h-full rounded-none bg-white size-sm"
        >
          <Link href="/login">
            <CircleUserIcon className="size-6"/>
          </Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant="secondary"
          className="h-full rounded-none bg-white gap-0"
        >
          <Link href="/cart">
            <ShoppingCartIcon className="size-6"/>
          </Link>
        </Button>
        <div className="flex lg:hidden items-center justify-center">
          <Button
            size="sm"
            variant="secondary"
            className="h-full rounded-none bg-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon className="size-6"/>
          </Button>
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
