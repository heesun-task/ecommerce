export type MenuItemType = {
  href: string;
  label: string;
  children?: MenuItemType[];
  color?: string;
  disabled?: boolean;
};

export const menuItems: MenuItemType[] = [
  {
    label: "Women's",
    href: "/categories/womens",
    children: [
      {
        label: "Shop All",
        href: "/categories/womens",
        children: [
          { label: "All Women's", href: "/categories/womens" },
        ],
      },
      {
        label: "Clothing",
        href: "/categories/womens-clothing",
        children: [
          { label: "Jackets & Coats", href: "/categories/womens-jackets-vests" },
          { label: "Tops & Shirts", href: "/categories/womens-tops-base-layers" },
          { label: "Bottoms", href: "/categories/womens-bottoms" },
          { label: "Dresses & Skirts", href: "/categories/womens-dresses" },
        ],
      },
      {
        label: "Footwear",
        href: "/categories/womens-footwear",
        children: [
          { label: "Hiking Boots", href: "/categories/womens-hiking-boots" },
          { label: "Trail Running", href: "/categories/womens-trail-shoes" },
          { label: "Casual Shoes", href: "/categories/womens-casual-shoes" },
        ],
      },
      {
        label: "Accessories",
        href: "/categories/womens-accessories",
        children: [
          { label: "Hats & Beanies", href: "/categories/womens-hats" },
          { label: "Gloves", href: "/categories/womens-gloves" },
          { label: "Bags", href: "/categories/womens-bags" },
          { label: "Socks", href: "/categories/womens-socks" },
        ],
      },
      {
        label: "New & Popular",
        href: "/categories/womens-new",
        children: [
          { label: "New Arrivals", href: "/categories/womens-new-arrivals" },
          {
            label: "Best Sellers",
            href: "/categories/womens-best-sellers",
            disabled: true,
          },
          { label: "Sale Items", href: "/sale/womens" },
        ],
      },
    ],
  },
  {
    label: "Men's",
    href: "/categories/mens",
    children: [
      {
        label: "Shop All",
        href: "/categories/mens",
        children: [
          { label: "All Men's", href: "/categories/mens" },
        ],
      },
      {
        label: "Clothing",
        href: "/categories/mens-clothing",
        children: [
          { label: "Jackets & Coats", href: "/categories/mens-jackets-vests" },
          { label: "Tops & Shirts", href: "/categories/mens-tops-base-layers" },
          { label: "Bottoms", href: "/categories/mens-bottoms" },
        ],
      },
      {
        label: "Footwear",
        href: "/categories/mens-footwear",
        children: [
          { label: "Hiking Boots", href: "/categories/mens-hiking-boots" },
          { label: "Trail Running", href: "/categories/mens-trail-shoes" },
          { label: "Casual Shoes", href: "/categories/mens-casual-shoes" },
        ],
      },
      {
        label: "Accessories",
        href: "/categories/mens-accessories",
        children: [
          { label: "Hats & Beanies", href: "/categories/mens-hats" },
          { label: "Gloves", href: "/categories/mens-gloves" },
          { label: "Bags", href: "/categories/mens-bags" },
          { label: "Socks", href: "/categories/mens-socks" },
        ],
      },
      {
        label: "New & Popular",
        href: "/categories/mens-new",
        children: [
          { label: "New Arrivals", href: "/categories/mens-new-arrivals" },
          { label: "Best Sellers", href: "/categories/mens-best-sellers", disabled: true },
          { label: "Sale Items", href: "/sale/mens" },
        ],
      },
    ],
  },
  {
    label: "Footwear",
    href: "/categories/footwear",
    children: [
      {
        label: "Shop All",
        href: "/categories/footwear",
        children: [
          { label: "All Footwear", href: "/categories/footwear" },
        ],
      },
      {
        label: "Hiking Boots",
        href: "/categories/hiking-boots",
        children: [
          { label: "Men's Hiking Boots", href: "/categories/mens-hiking-boots" },
          { label: "Women's Hiking Boots", href: "/categories/womens-hiking-boots" },
        ],
      },
      {
        label: "Trail Running",
        href: "/categories/trail-shoes",
        children: [
          { label: "Men's Trail Running", href: "/categories/mens-trail-shoes" },
          { label: "Women's Trail Running", href: "/categories/womens-trail-shoes" },
        ],
      },
      {
        label: "Casual Shoes",
        href: "/categories/casual-shoes",
        children: [
          { label: "Men's Casual Shoes", href: "/categories/mens-casual-shoes" },
          { label: "Women's Casual Shoes", href: "/categories/womens-casual-shoes" },
        ],
      },
      {
        label: "Special Categories",
        href: "/categories/footwear-special",
        children: [
          { label: "Approach Shoes", href: "/categories/approach-shoes" },
          { label: "New Arrivals", href: "/categories/footwear-new-arrivals", disabled: true },
          { label: "Sale Footwear", href: "/sale/footwear" },
        ],
      },
    ],
  },
  {
    label: "Gear",
    href: "/categories/gear",
    children: [
      {
        label: "Shop All",
        href: "/categories/gear",
        children: [
          { label: "All Gear", href: "/categories/gear" },
        ],
      },
      {
        label: "Backpacks",
        href: "/categories/backpacks",
        children: [
          { label: "Hiking Backpacks", href: "/categories/hiking-backpacks" },
          { label: "Daypacks", href: "/categories/daypacks" },
          { label: "Travel Packs", href: "/categories/travel-packs" },
        ],
      },
      {
        label: "Camping",
        href: "/categories/camping",
        children: [
          { label: "Tents", href: "/categories/tents" },
          { label: "Sleeping Bags", href: "/categories/sleeping-bags" },
          { label: "Sleeping Pads", href: "/categories/sleeping-pads" },
        ],
      },
      {
        label: "Tech & Tools",
        href: "/categories/tech-tools",
        children: [
          { label: "GPS & Navigation", href: "/categories/gps" },
          { label: "Headlamps", href: "/categories/headlamps" },
          { label: "Multi-tools", href: "/categories/multi-tools" },
        ],
      },
      {
        label: "Popular Gear",
        href: "/categories/gear-popular",
        children: [
          { label: "Best Sellers", href: "/categories/gear-best-sellers", disabled: true },
          { label: "New Gear", href: "/categories/gear-new-arrivals", disabled: true },
          { label: "Sale Gear", href: "/sale/gear" },
        ],
      },
    ],
  },
  {
    label: "SALE",
    href: "/sale",
    color: "peak-maple",
    children: [
      {
        label: "Shop All",
        href: "/sale",
        children: [
          { label: "All Sale", href: "/sale" },
        ],
      },
      {
        label: "Women's Sale",
        href: "/sale/womens",
        children: [
          { label: "Women's Clothing", href: "/sale/womens-clothing" },
          { label: "Women's Accessories", href: "/sale/womens-accessories" },
        ],
      },
      {
        label: "Men's Sale",
        href: "/sale/mens",
        children: [
          { label: "Men's Clothing", href: "/sale/mens-clothing" },
          { label: "Men's Accessories", href: "/sale/mens-accessories" },
        ],
      },
      {
        label: "Footwear Sale",
        href: "/sale/footwear",
        children: [
          { label: "Hiking Boots Sale", href: "/sale/hiking-boots" },
          { label: "Trail Running Sale", href: "/sale/trail-running" },
          { label: "Casual Shoes Sale", href: "/sale/casual-shoes" },
        ],
      },
      {
        label: "Gear Sale",
        href: "/sale/gear",
        children: [
          { label: "Backpacks Sale", href: "/sale/backpacks" },
          { label: "Camping Gear Sale", href: "/sale/camping" },
          { label: "Tech & Tools Sale", href: "/sale/tech" },
        ],
      },
      {
        label: "Clearance",
        href: "/categories/clearance",
        disabled: true,
        children: [
          { label: "Final Sale", href: "/categories/final-sale" },
          { label: "Last Chance", href: "/categories/last-chance" },
          { label: "End of Season", href: "/categories/end-of-season" },
        ],
      },
    ],
  },
];