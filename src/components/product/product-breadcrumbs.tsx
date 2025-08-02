import React from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { BreadcrumbItemType } from "@/types/category.types"


type ProductBreadcrumbsProps = {
  items: BreadcrumbItemType[]
  className?: string
  variant?: "light" | "dark"
}

export function ProductBreadcrumbs({ items, className, variant="dark" }: ProductBreadcrumbsProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {/* Home Link */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <span>Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          
          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {item.href && !isLast ? (
                  <BreadcrumbLink 
                    href={"/categories" + item.href}
                    variant={variant}
                  >
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage variant={variant}>
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}