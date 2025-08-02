import { prisma } from "@/lib/prisma";
import {
  BreadcrumbItemType,
  CategoryWithChildren,
} from "@/types/category.types";

export class CategoryService {
  static async getCategoryBySlug(
    slug: string
  ): Promise<CategoryWithChildren | null> {
    try {
      const categories = await prisma.category.findUnique({
        where: { slug },
        include: {
          parent: {
            include: {
              parent: true,
            },
          },
          children: true,
          _count: {
            select: { products: true },
          },
        },
      });

      return categories;
    } catch (error) {
      console.error(`Error fetching category with slug ${slug}:`, error);
      throw new Error("Failed to fetch category");
    }
  }

  static getCategoryBreadcrumbs(
    category: CategoryWithChildren
  ): BreadcrumbItemType[] {
    const breadcrumbs = [];

    const getParentCategories = (cat: CategoryWithChildren) => {
      if (cat.parent) {
        breadcrumbs.unshift({ label: cat.parent.name, href: `/${cat.parent.slug}` });
        getParentCategories(cat.parent);
      }
    };

    // add parent
    if (category.parent) {
      getParentCategories(category);
    }

    // add itself
    breadcrumbs.push({ label: category.name });

    return breadcrumbs;
  }

  static async getAllCategories(): Promise<CategoryWithChildren[]> {
    try {
      const categories = await prisma.category.findMany({
        include: {
          parent: {
            include: {
              parent: true,
            },
          },
          children: true,
          _count: {
            select: { products: true },
          },
        },
        orderBy: {
          parentId: "asc",
          name: "asc",
        },
      });

      return categories;
    } catch (error) {
      console.error("Error fetching all categories:", error);
      throw new Error("Failed to fetch categories");
    }
  }
}
