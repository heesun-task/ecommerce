import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Logo from "../logo";
import { MenuItemType } from "./menu-items";

interface Props {
  items: MenuItemType[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="p-0transition-none"
        aria-describedby="navbar-sidebar"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full py-2">
          <Link
            href="/"
            className="p-4 flex items-center"
            onClick={() => onOpenChange(false)}
          >
            <Logo />
          </Link>
          <Link
            href={"/"}
            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            onClick={() => onOpenChange(false)}
          >
            Home
          </Link>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              onClick={() => onOpenChange(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t">
            <Link
              href="/login"
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              onClick={() => onOpenChange(false)}
            >
              Log in
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
