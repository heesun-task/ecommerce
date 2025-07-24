import { BreadcrumbItemType } from "@/types/category.types";
import Container from "../layouts/container";
import { ProductBreadcrumbs } from "./product-breadcrumbs";

type ProductPageHeaderProps = {
  title: string;
  description: string;
  image: string;
  breadcrumbs: BreadcrumbItemType[];
  children?: React.ReactNode;
};

const ProductPageHeader = ({
  title,
  description,
  image,
  breadcrumbs,
  children,
}: ProductPageHeaderProps) => {
  return (
    <div
      className="relative bg-cover bg-[position:left_20%_top_40%] text-white min-h-[300px] flex items-center justify-center"
      style={{ backgroundImage: `url('${image}')` }}
    >
      <Container>
        <ProductBreadcrumbs items={breadcrumbs} />
        <h2 className="text-3xl font-bold font-serif mb-3 mt-3">{title}</h2>
        <p className="whitespace-pre-line">{description}</p>
        {children}
      </Container>
    </div>
  );
};

export default ProductPageHeader;
