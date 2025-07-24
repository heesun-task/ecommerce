import { prisma } from "@/lib/prisma";
import { CategoryWithChildren } from "@/types/category.types";

export class CategoryService {
  static async getCategoryBySlug(slug: string): Promise<CategoryWithChildren | null> {
    try {
      const categories = await prisma.category.findUnique({
        where: { slug },
        include: {
          parent: true,
          children: true,
          _count: {
            select: { products: true },
          },
        },
      });

      return categories;
    } catch (error) {console.error(`Error fetching category with slug ${slug}:`, error);
      throw new Error("Failed to fetch category");
    }

  }
}