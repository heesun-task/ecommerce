"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  CircleUserIcon,
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavbarSidebar } from "./navbar-sidebar";
import Logo from "../logo";
import { useNavbarStore } from "@/stores/navbar-store";
import { menuItems, MenuItemType } from "./menu-items";
import NavbarSubMenu from "./navbar-submenu";

interface MenuLinkItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  isFocused?: boolean;
  defaultColor?: string;
  hasChildren?: boolean;
  onMouseEnter?: () => void;
}

const MenuLinkItem = ({
  href,
  children,
  isActive,
  isFocused,
  defaultColor,
  onMouseEnter,
}: MenuLinkItemProps) => {
  return (
    <div className="relative" onMouseEnter={onMouseEnter}>
      <Button
        asChild
        variant="ghost"
        className={cn(
          "relative bg-transparent hover:bg-transparent border-transparent px-2 text-sm font-semibold text-foreground",
          "after:absolute after:bottom-0 after:left-2 after:h-[3px] after:bg-current after:transition-all after:w-0 hover:after:w-6",
          isActive && "text-peak-forest",
          defaultColor
            ? `text-${defaultColor} hover:text-${defaultColor}`
            : "hover:text-peak-forest",
          isFocused && "after:w-6 text-peak-forest",
          isFocused && defaultColor && `text-${defaultColor}`
        )}
      >
        <Link href={href}>{children}</Link>
      </Button>
    </div>
  );
};

export const Navbar = () => {
  const variant = useNavbarStore((state) => state.variant);
  const pathName = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [minimized, setIsMinimized] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<MenuItemType[] | null>(
    null
  );
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
  const [focusedMenu, setFocusedMenu] = useState<string | null>(null);

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

  const handleMenuItemHover = (item: MenuItemType) => {
    if (item.children && item.children.length > 0) {
      setFocusedMenu(item.href);
      setActiveSubmenu(item.children);
      setIsSubmenuVisible(true);
    }
  };

  const handleMenuLeave = () => {
    // setIsSubmenuVisible(false);
    // setActiveSubmenu(null);
    // setFocusedMenu(null);
  };

  return (
    <nav
      className={cn(
        "z-20 w-full max-w-full flex justify-center ",
        "transition-all [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] duration-300",
        "fixed top-0 left-1/2 -translate-x-1/2 ",
        minimized && "md:pl-3 md:pr-3 md:top-5 w-full md:container"
      )}
      onMouseLeave={handleMenuLeave}
    >
      <div className="relative flex-1 flex justify-center bg-[#FAFAFA] w-full max-w-full">
        <div className="relative flex-1 flex items-center justify-between px-6 min-h-17 md:container  border-red-500">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Navbar Items */}
          <div className="items-center gap-7 hidden md:flex h-full px-3">
            {menuItems.map((item) => (
              <MenuLinkItem
                key={item.href}
                href={item.href}
                isActive={pathName === item.href}
                isFocused={focusedMenu === item.href}
                defaultColor={item.color}
                hasChildren={item.children && item.children.length > 0}
                onMouseEnter={() => handleMenuItemHover(item)}
              >
                {item.label}
              </MenuLinkItem>
            ))}
          </div>

          {/* Left Button Groups */}
          <div className="flex h-full -space-x-px">
            <Button
              size="sm"
              variant="secondary"
              className="h-full rounded-none"
            >
              <SearchIcon className="size-6" />
            </Button>
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
              {/* <Link href="/cart">
                <ShoppingCartIcon className="size-6" />
              </Link> */}
              <span className="cursor-not-allowed">
                <ShoppingCartIcon className="size-6" />
              </span>
            </Button>
            {/* Mobile Menu Button */}
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
        {/* Sub Menu */}
        {activeSubmenu && (
          <NavbarSubMenu items={activeSubmenu} isVisible={isSubmenuVisible} />
        )}
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <NavbarSidebar
          items={menuItems}
          open={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
        />
      )}
    </nav>
  );
};
