import { prisma } from "@/lib/prisma";
import { Pagination, SearchParams } from "@/types/category.types";

export default async function getFilteredProducts(
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
          active: true,
        },
      };
    }

    // price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.variants = {
        ...where.variants,
        some: {
          ...where.variants?.some,
          ...(minPrice !== undefined && { price: { gte: minPrice } }),
          ...(maxPrice !== undefined && { price: { lte: maxPrice } }),
          active: true,
        },
      };
    }

    // sorting
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
        where,
        include: {
          categories: { include: { category: true } },
          variants: {
            where: { active: true },
            orderBy: { price: "asc" },
          },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    const pagination: Pagination = {
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    };

    return { products, pagination };
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw error;
  }
}
