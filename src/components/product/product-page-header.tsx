import { BreadcrumbItemType } from "@/types/category.types";
import Container from "../layout/container";
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
      className="relative bg-cover bg-center text-white min-h-130 flex items-center justify-center mb-12"
      style={{ backgroundImage: `url('${image}')` }}
    >
      <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <Container className="relative z-10">
        <ProductBreadcrumbs items={breadcrumbs} />
        <h2 className="text-3xl font-bold font-serif mb-3 mt-3">{title}</h2>
        <p className="whitespace-pre-line">{description}</p>
        {children}
      </Container>
    </div>
  );
};

export default ProductPageHeader;
