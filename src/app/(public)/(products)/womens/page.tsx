import Container from "@/components/layouts/container";
import ProductBanner from "@/components/product/product-banner";

export default function Home() {
  return (
    <div className="">
      <ProductBanner
        title={"Women's"}
        description={
          "adventure knows no limits. Neither should your gear. \nDiscover women's outdoor clothing designed for Canada's toughest conditions."
        }
        image={"/images/product-womens-banner-1.png"}
      />
      <Container>
        
      </Container>
    </div>
  );
}
