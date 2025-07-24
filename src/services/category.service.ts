import { Breadcrumb } from "@/components/ui/breadcrumb";
import { prisma } from "@/lib/prisma";
import {
  BreadcrumbItemType,
  CategoryWithChildren,
} from "@/types/category.types";
import { Category } from "@prisma/client";

export class CategoryService {
  static async getCategoryBySlug(
    slug: string
  ): Promise<CategoryWithChildren | null> {
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
    } catch (error) {
      console.error(`Error fetching category with slug ${slug}:`, error);
      throw new Error("Failed to fetch category");
    }
  }

  static getCategoryBreadcrumbs(
    category: CategoryWithChildren
  ): BreadcrumbItemType[] {
    const breadcrumbs = [];

    const { parent } = category;

    // add parent
    if (parent) {
      breadcrumbs.push({ label: parent.name, href: `/${parent.slug}` });
    }

    // add itself
    breadcrumbs.push({ label: category.name});

    return breadcrumbs;
  }
}
