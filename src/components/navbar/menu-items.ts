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
    href: "/womens",
    children: [
      {
        label: "Shop All",
        href: "/womens",
        children: [
          { label: "All Women's", href: "/womens" },
        ],
      },
      {
        label: "Clothing",
        href: "/womens/clothing",
        children: [
          { label: "Jackets & Coats", href: "/womens/jackets-vests" },
          { label: "Tops & Shirts", href: "/womens/tops-base-layers" },
          { label: "Bottoms", href: "/womens/bottoms" },
          { label: "Dresses & Skirts", href: "/womens/dresses" },
        ],
      },
      {
        label: "Footwear",
        href: "/womens/footwear",
        children: [
          { label: "Hiking Boots", href: "/womens/hiking-boots" },
          { label: "Trail Running", href: "/womens/trail-shoes" },
          { label: "Casual Shoes", href: "/womens/casual-shoes" },
        ],
      },
      {
        label: "Accessories",
        href: "/womens/accessories",
        children: [
          { label: "Hats & Beanies", href: "/womens/hats" },
          { label: "Gloves", href: "/womens/gloves" },
          { label: "Bags", href: "/womens/bags" },
          { label: "Socks", href: "/womens/socks" },
        ],
      },
      {
        label: "New & Popular",
        href: "/womens/new",

        children: [
          { label: "New Arrivals", href: "/womens/new-arrivals" },
          {
            label: "Best Sellers",
            href: "/womens/best-sellers",
            disabled: true,
          },
          { label: "Sale Items", href: "/womens/sale" },
        ],
      },
    ],
  },
  {
    label: "Men's",
    href: "/mens",
    children: [
      {
        label: "Shop All",
        href: "/mens",
        children: [
          { label: "All Men's", href: "/mens" },
        ],
      },
      {
        label: "Clothing",
        href: "/mens/clothing",
        children: [
          { label: "Jackets & Coats", href: "/mens/jackets-vests" },
          { label: "Tops & Shirts", href: "/mens/tops-base-layers" },
          { label: "Bottoms", href: "/mens/bottoms" },
        ],
      },
      {
        label: "Footwear",
        href: "/mens/footwear",
        children: [
          { label: "Hiking Boots", href: "/mens/hiking-boots" },
          { label: "Trail Running", href: "/mens/trail-shoes" },
          { label: "Casual Shoes", href: "/mens/casual-shoes" },
        ],
      },
      {
        label: "Accessories",
        href: "/mens/accessories",
        children: [
          { label: "Hats & Beanies", href: "/mens/hats" },
          { label: "Gloves", href: "/mens/gloves" },
          { label: "Bags", href: "/mens/bags" },
          { label: "Socks", href: "/mens/socks" },
        ],
      },
      {
        label: "New & Popular",
        href: "/mens/new",
        children: [
          { label: "New Arrivals", href: "/mens/new-arrivals" },
          { label: "Best Sellers", href: "/mens/best-sellers", disabled: true },
          { label: "Sale Items", href: "/mens/sale" },
        ],
      },
    ],
  },
  {
    label: "Gear",
    href: "/gear",
    children: [
      {
        label: "Shop All",
        href: "/gear",
        children: [
          { label: "All Gear", href: "/gear" },
        ],
      },
      {
        label: "Backpacks",
        href: "/gear/backpacks",
        children: [
          { label: "Hiking Backpacks", href: "/gear/hiking-backpacks" },
          { label: "Daypacks", href: "/gear/daypacks" },
          { label: "Travel Packs", href: "/gear/travel-packs" },
        ],
      },
      {
        label: "Camping",
        href: "/gear/camping",
        children: [
          { label: "Tents", href: "/gear/tents" },
          { label: "Sleeping Bags", href: "/gear/sleeping-bags" },
          { label: "Sleeping Pads", href: "/gear/sleeping-pads" },
        ],
      },
      {
        label: "Tech & Tools",
        href: "/gear/tech",
        children: [
          { label: "GPS & Navigation", href: "/gear/gps" },
          { label: "Headlamps", href: "/gear/headlamps" },
          { label: "Multi-tools", href: "/gear/multi-tools" },
        ],
      },
      {
        label: "Popular Gear",
        href: "/gear/popular",
        children: [
          { label: "Best Sellers", href: "/gear/best-sellers", disabled: true },
          { label: "New Gear", href: "/gear/new-arrivals", disabled: true },
          { label: "Sale Gear", href: "/gear/sale" },
        ],
      },
    ],
  },
  {
    label: "Activities",
    href: "/activities",
    children: [
      {
        label: "Shop All",
        href: "/activities",
        children: [
          { label: "All Activities", href: "/activities" },
        ],
      },
      {
        label: "Hiking",
        href: "/activities/hiking",
        children: [
          { label: "Day Hiking", href: "/activities/day-hiking" },
          { label: "Backpacking", href: "/activities/backpacking" },
          { label: "Mountaineering", href: "/activities/mountaineering" },
        ],
      },
      {
        label: "Climbing",
        href: "/activities/climbing",
        children: [
          { label: "Rock Climbing", href: "/activities/rock-climbing" },
          { label: "Indoor Climbing", href: "/activities/indoor-climbing" },
          { label: "Bouldering", href: "/activities/bouldering" },
        ],
      },
      {
        label: "Running",
        href: "/activities/running",
        children: [
          { label: "Trail Running", href: "/activities/trail-running" },
          { label: "Ultra Running", href: "/activities/ultra-running" },
          { label: "Road Running", href: "/activities/road-running" },
        ],
      },
      {
        label: "Travel",
        href: "/activities/travel",
        disabled: true,
        children: [
          { label: "Adventure Travel", href: "/activities/adventure-travel" },
          { label: "Urban Exploration", href: "/activities/urban-exploration" },
          { label: "Digital Nomad", href: "/activities/digital-nomad" },
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
          { label: "Clothing", href: "/sale/womens-clothing" },
          { label: "Footwear", href: "/sale/womens-footwear" },
          { label: "Accessories", href: "/sale/womens-accessories" },
        ],
      },
      {
        label: "Men's Sale",
        href: "/sale/mens",
        children: [
          { label: "Clothing", href: "/sale/mens-clothing" },
          { label: "Footwear", href: "/sale/mens-footwear" },
          { label: "Accessories", href: "/sale/mens-accessories" },
        ],
      },
      {
        label: "Gear Sale",
        href: "/sale/gear",
        children: [
          { label: "Backpacks", href: "/sale/backpacks" },
          { label: "Camping Gear", href: "/sale/camping" },
          { label: "Tech & Tools", href: "/sale/tech" },
        ],
      },
      {
        label: "Clearance",
        href: "/sale/clearance",
        disabled: true,
        children: [
          { label: "Final Sale", href: "/sale/final-sale" },
          { label: "Last Chance", href: "/sale/last-chance" },
          { label: "End of Season", href: "/sale/end-of-season" },
        ],
      },
    ],
  },
];
