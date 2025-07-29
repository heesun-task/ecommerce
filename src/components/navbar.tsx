"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
        "relative bg-transparent hover:bg-transparent border-transparent px-2 text-sm font-medium",
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
    };
    
    // Check initial scroll position
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        "bg-background fixed z-100 h-[60px] lg:h-[70px] flex justify-between items-center  p-3 md:pl-6 md:pr-6 w-full shadow-xl",
        "transition-all [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] duration-300 top-0 left-1/2 -translate-x-1/2",
        isScrolled ? "top-0 max-w-full" : "top-5 lg:w-[calc(100%-14rem)] max-w-[96rem]"
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
            <CircleUserIcon className="size-6"/>
          </Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant="secondary"
          className="h-full rounded-none"
        >
          <Link href="/cart">
            <ShoppingCartIcon className="size-6"/>
          </Link>
        </Button>
        <div className="flex md:hidden items-center justify-center">
          <Button
            size="sm"
            variant="secondary"
            className="h-full rounded-none"
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
