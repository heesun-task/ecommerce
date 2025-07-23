import Container from "@/components/layouts/container";
import ProductListingTemplate from "@/components/product/product-listing-template";

export default function Home() {
  return (
    <div className="">
        <ProductListingTemplate
          title={"Women's"}
          description={
            "Adventure knows no limits. Neither should your gear. \nDiscover women's outdoor clothing designed for Canada's toughest conditions."
          }
          image={"/images/product-womens-banner-1.png"}
          breadcrumbs={[
            { label: "Women's", href: "/womens" },
          ]}
        />
    </div>
  );
}
