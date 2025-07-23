import { BreadcrumbItemType } from "./product-breadcrumbs";
import ProductPageHeader from "./product-page-header";

type ProductListingTemplate = {
  title: string;
  description: string;
  image: string;
  breadcrumbs: BreadcrumbItemType[];
};

const ProductListingTemplate = ({
  title,
  description,
  image,
  breadcrumbs,
}: ProductListingTemplate) => {
  // const [filters, setFilter = useState({})];
  // const [sort, setSort = useState({})];

  return (
    <div>
      <ProductPageHeader
        title={title}
        description={description}
        image={image}
        breadcrumbs={breadcrumbs}
      />
      {/* <FilterSort/> */}
      {/* <ProductGrid/> */}
    </div>
  );
};

export default ProductListingTemplate;
