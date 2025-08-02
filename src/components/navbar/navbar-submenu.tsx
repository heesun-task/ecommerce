import { cn } from "@/lib/utils";
import { MenuItemType } from "./menu-items";
import Link from "next/link";


interface SubMenuProps {
  items: MenuItemType[];
  isVisible: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const NavbarSubMenu = ({
  items,
  isVisible,
  onMouseEnter,
  onMouseLeave,
}: SubMenuProps) => {

  return (
    <div
      className={cn(
        "hidden md:block absolute left-0 right-0 top-full w-full z-30 mx-auto",
        "opacity-0 translate-y-2 pointer-events-none",
        "transition-all duration-200 ease-out",
        isVisible && "opacity-100 translate-y-0 pointer-events-auto"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-full pt-6 pb-12 px-20 bg-[#FAFAFA] flex justify-center">
        <div className="container grid grid-cols-5 gap-4 md:max-w-146 lg:max-w-210 xl:max-w-274">
          {items.map((item) => (
            <div key={item.href} className="space-y-3">
              {item.disabled ? (
                <strong
                  className="block text-sm font-semibold text-gray-400 cursor-not-allowed outline-none focus:outline-none"
                  title="In maintenance"
                >
                  {item.label}
                </strong>
              ) : (
                <Link
                  href={item.disabled ? "#" : item.href}
                  className="block text-sm font-semibold text-gray-900 hover:text-peak-forest transition-colors"
                >
                  {item.label}
                </Link>
              )}
              {item.children && (
                <ul className="space-y-2">
                  {item.children.map((subItem) =>
                    subItem.disabled || item.disabled ? (
                      <li key={subItem.href}>
                        <span className="block text-sm text-gray-400 cursor-not-allowed">
                          {subItem.label}
                        </span>
                      </li>
                    ) : (
                      <li key={subItem.href}>
                        <Link
                          href={subItem.href}
                          className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default NavbarSubMenu;