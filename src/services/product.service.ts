import { prisma } from "@/lib/prisma";
import { Pagination, SearchParams } from "@/types/category.types";

// fetches products based on various filters, sorting options, and pagination
export async function getFilteredProducts(
  categorySlug: string,
  searchParams: SearchParams
) {
  try {
    const sizes = searchParams.sizes?.split(",").filter(Boolean) || [];
    const minPrice = searchParams.minPrice
      ? Number(searchParams.minPrice)
      : undefined;
    const maxPrice = searchParams.maxPrice
      ? Number(searchParams.maxPrice)
      : undefined;
    const sortBy = searchParams.sortBy || "newest";
    const page = Number(searchParams.page) || 1;
    const limit = 20;

    const where: any = {
      active: true,
      categories: {
        some: {
          category: { slug: categorySlug },
        },
      },
    };

    // size filter
    if (sizes.length > 0) {
      where.variants = {
        some: {
          size: { in: sizes },
          stock: { gt: 0 }, // only include variants with stock
          active: true,
        },
      };
    }

    // price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      const priceConditions: any[] = [];
      
      // when base price is in range
      const basePriceCondition: any = {};
      if (minPrice !== undefined) basePriceCondition.gte = minPrice;
      if (maxPrice !== undefined) basePriceCondition.lte = maxPrice;
      
      priceConditions.push({ basePrice: basePriceCondition });

      // when color price is in range
      const colorPriceCondition: any = {
        colors: {
          some: {
            price: {
              ...(minPrice !== undefined && { gte: minPrice }),
              ...(maxPrice !== undefined && { lte: maxPrice }),
            }
          }
        }
      };
      
      priceConditions.push(colorPriceCondition);
      
      // if one of the conditions is true, include the product
      where.OR = priceConditions;
    }

    // Sorting
    let orderBy: any = {};
    switch (sortBy) {
      case "name-asc":
        orderBy = { name: "asc" };
        break;
      case "name-desc":
        orderBy = { name: "desc" };
        break;
      case "price-asc":
        orderBy = { basePrice: "asc" };
        break;
      case "price-desc":
        orderBy = { basePrice: "desc" };
        break;
      case "newest":
      default:
        orderBy = { createdAt: "desc" };
    }

    // Fetch products with pagination
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        orderBy,
        where,
        include: {
          categories: { 
            include: { category: true } 
          },
          variants: {
            where: { 
              active: true,
              stock: { gt: 0 } // only include variants with stock
            },
            select: {
              id: true,
              size: true,
              stock: true,
              sku: true,
              colorId: true
            }
          },
          colors: {
            orderBy: { 
              price: "asc" // order colors by price
            }
          }
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);
    
    // Map products to include pricing details
    const productsWithPricing = products.map(product => ({
      ...product,
      // minPrice: base price or lowest color price
      minPrice: Math.min(
        product.basePrice || Infinity,
        ...product.colors
          .filter(color => color.price !== null)
          .map(color => color.price!)
      ),
      // maxPrice: base price or highest color price
      maxPrice: Math.max(
        product.basePrice || 0,
        ...product.colors
          .filter(color => color.price !== null)
          .map(color => color.price!)
      ),
      // hasDiscount: whether the product is discounted
      hasDiscount: product.colors.some(color => 
        color.price && color.price < (product.basePrice || Infinity)
      )
    }));

    const pagination: Pagination = {
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    };

    return { 
      products: productsWithPricing, 
      pagination 
    };
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw error;
  }
}

export async function getSaleProducts(limit?: number) {
  try {
    const products = await prisma.product.findMany({
      where: {
        active: true,
        colors: {
          some: {
            price: {
              not: null // only include colors with a (sale) price
            }
          }
        }
      },
      include: {
        colors: {
          select: {
            id: true,
            name: true,
            code: true,
            images: true,
            price: true
          },
          orderBy: {
            price: 'asc'
          }
        },
        categories: {
          include: {
            category: true
          }
        },
        variants: {
          where: {
            active: true,
            stock: {gt: 0} // only include variants with stock
          },
        }
      }
    });


    // Filter only sale products (those with color prices lower than base price)
    const saleProducts = products.filter((product) => {
      return product.colors.some(color => 
        color.price && color.price < product.basePrice
      );
    });

    return saleProducts;
  } catch (error) {
    console.error("Error fetching sale products:", error);
    return [];
  }
}