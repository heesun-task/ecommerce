"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import { CircleUserIcon, MenuIcon, ShoppingCartIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavbarSidebar } from "./navbar-sidebar";
import Logo from "./logo";

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-2 text-sm",
        isActive && "bg-black text-white hover:bg-black hover:text-white",
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/women", children: "Women" },
  { href: "/men", children: "Men" },
  { href: "/bags", children: "Bags" },
  { href: "/accessories", children: "Accessories" },
  { href: "/whats-new", children: "What's New" },
  { href: "/summer-scores", children: "Summer Scores" },
];

export const Navbar = () => {
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav className="h-[70px] pl-6 flex border-b justify-between items-center font-medium bg-white">
      <Logo />

      {/* Navbar Items */}
      <div className="item-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathName === item.href}
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
