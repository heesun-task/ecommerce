// ==================== Professional Outdoor Brand Category Structure ====================

/*
 =Structure

Header Menu (5 main categories):
├── MEN'S
│   ├── Jackets & Vests
│   ├── Tops & Base Layers  
│   └── Bottoms
├── WOMEN'S
│   ├── Jackets & Vests
│   ├── Tops & Base Layers
│   └── Bottoms
├── FOOTWEAR
│   ├── Hiking Boots
│   └── Trail Shoes
├── BAGS
│   ├── Backpacks
│   └── Daypacks
└── SALE
    └── (Discounted versions of existing products)

*/

// ==================== Updated Seed Data ====================

// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed data creation...');

  // Clean existing data
  try {
    await prisma.productCategory.deleteMany({});
    await prisma.productVariant.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    console.log('Existing data cleaned');
  } catch (error) {
    console.log('No existing data to clean');
  }

  // ==================== Admin User ====================
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@outdoor.com' },
    update: {},
    create: {
      email: 'admin@outdoor.com',
      name: 'Admin User',
      password: '$2b$10$K7L1oEoO5SkqhHKDw1tKTeoqRF1X.nB1Qr8xO9Oj4w1nRsEPHJ82q',
      role: 'ADMIN',
      emailVerified: true
    }
  });

  // ==================== Main Categories (5) ====================
  
  const mensCategory = await prisma.category.create({
    data: {
      name: 'Men\'s',
      slug: 'mens',
      description: 'Men\'s outdoor clothing and gear',
      image: '/images/categories/mens-hero.png'
    }
  });

  const womensCategory = await prisma.category.create({
    data: {
      name: 'Women\'s',
      slug: 'womens',
      description: 'Women\'s outdoor clothing and gear',
      image: '/images/categories/womens-hero.png'
    }
  });

  const footwearCategory = await prisma.category.create({
    data: {
      name: 'Footwear',
      slug: 'footwear',
      description: 'Hiking boots, trail runners, and outdoor footwear',
      image: '/images/categories/shoes-hero.avif'
    }
  });

  const bagsCategory = await prisma.category.create({
    data: {
      name: 'Bags',
      slug: 'bags',
      description: 'Backpacks, daypacks, and outdoor accessories',
      image: '/images/categories/bags-hero.avif'
    }
  });

  const saleCategory = await prisma.category.create({
    data: {
      name: 'Sale',
      slug: 'sale',
      description: 'Discounted outdoor gear and clothing',
      image: '/images/categories/sale-hero.avif'
    }
  });

  // ==================== Subcategories ====================

  // Men's subcategories
  const mensJackets = await prisma.category.create({
    data: {
      name: 'Jackets & Vests',
      slug: 'mens-jackets-vests',
      description: 'Men\'s outdoor jackets, shells, and vests',
      parentId: mensCategory.id
    }
  });

  const mensTops = await prisma.category.create({
    data: {
      name: 'Tops & Base Layers',
      slug: 'mens-tops-base-layers',
      description: 'Men\'s shirts, hoodies, and base layers',
      parentId: mensCategory.id
    }
  });

  const mensBottoms = await prisma.category.create({
    data: {
      name: 'Bottoms',
      slug: 'mens-bottoms',
      description: 'Men\'s pants, shorts, and hiking bottoms',
      parentId: mensCategory.id
    }
  });

  // Women's subcategories
  const womensJackets = await prisma.category.create({
    data: {
      name: 'Jackets & Vests',
      slug: 'womens-jackets-vests',
      description: 'Women\'s outdoor jackets, shells, and vests',
      parentId: womensCategory.id,
      // image: '/images/categories/womens-hero.png'
    }
  });

  const womensTops = await prisma.category.create({
    data: {
      name: 'Tops & Base Layers',
      slug: 'womens-tops-base-layers',
      description: 'Women\'s shirts, hoodies, and base layers',
      parentId: womensCategory.id
    }
  });

  const womensBottoms = await prisma.category.create({
    data: {
      name: 'Bottoms',
      slug: 'womens-bottoms',
      description: 'Women\'s pants, shorts, and hiking bottoms',
      parentId: womensCategory.id
    }
  });

  // Footwear subcategories
  const hikingBoots = await prisma.category.create({
    data: {
      name: 'Hiking Boots',
      slug: 'hiking-boots',
      description: 'Waterproof hiking boots and mountaineering boots',
      parentId: footwearCategory.id
    }
  });

  const trailShoes = await prisma.category.create({
    data: {
      name: 'Trail Shoes',
      slug: 'trail-shoes',
      description: 'Trail running shoes and approach shoes',
      parentId: footwearCategory.id
    }
  });

  // Bags subcategories
  const backpacks = await prisma.category.create({
    data: {
      name: 'Backpacks',
      slug: 'backpacks',
      description: 'Multi-day backpacks and expedition packs',
      parentId: bagsCategory.id
    }
  });

  const daypacks = await prisma.category.create({
    data: {
      name: 'Daypacks',
      slug: 'daypacks',
      description: 'Day hiking packs and travel bags',
      parentId: bagsCategory.id
    }
  });

  console.log('Categories and subcategories created');

  // ==================== Sample Products (2-3 per subcategory) ====================

  // 1. Men's Jackets & Vests (3 products)
  const mensDownJacket = await prisma.product.create({
    data: {
      name: 'Men\'s Alpine Down Jacket',
      slug: 'mens-alpine-down-jacket',
      description: 'Lightweight down jacket with 800-fill power goose down insulation.',
      shortDescription: 'Lightweight down jacket with 800-fill insulation',
      images: ['/images/products/mens-down-jacket-1.avif'],
      basePrice: 349,
      material: 'Ripstop Nylon, 800-Fill Goose Down',
      featured: true,
      variants: {
        create: [
          { sku: 'MDJ-S-BLK', size: 'S', color: 'Black', price: 349, stock: 8 },
          { sku: 'MDJ-M-BLK', size: 'M', color: 'Black', price: 349, stock: 12 },
          { sku: 'MDJ-L-BLK', size: 'L', color: 'Black', price: 349, stock: 10 },
          { sku: 'MDJ-XL-BLK', size: 'XL', color: 'Black', price: 349, stock: 6 },
          { sku: 'MDJ-M-NVY', size: 'M', color: 'Navy', price: 349, stock: 9 },
          { sku: 'MDJ-L-NVY', size: 'L', color: 'Navy', price: 349, stock: 7 }
        ]
      },
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensJackets.id }
        ]
      }
    }
  });

  const mensShellJacket = await prisma.product.create({
    data: {
      name: 'Men\'s Storm Shell Jacket',
      slug: 'mens-storm-shell-jacket',
      description: 'Waterproof and breathable shell jacket for alpine conditions.',
      shortDescription: 'Waterproof shell jacket for alpine use',
      images: ['/images/products/mens-shell-jacket-1.avif'],
      basePrice: 299,
      material: 'Gore-Tex Pro',
      variants: {
        create: [
          { sku: 'MSJ-S-RED', size: 'S', color: 'Red', price: 299, stock: 5 },
          { sku: 'MSJ-M-RED', size: 'M', color: 'Red', price: 299, stock: 8 },
          { sku: 'MSJ-L-RED', size: 'L', color: 'Red', price: 299, stock: 6 },
          { sku: 'MSJ-M-BLU', size: 'M', color: 'Blue', price: 299, stock: 7 }
        ]
      },
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensJackets.id }
        ]
      }
    }
  });

  const mensVest = await prisma.product.create({
    data: {
      name: 'Men\'s Insulated Vest',
      slug: 'mens-insulated-vest',
      description: 'Versatile insulated vest perfect for layering.',
      shortDescription: 'Versatile insulated vest for layering',
      images: ['/images/products/mens-vest-1.avif'],
      basePrice: 159,
      material: 'Synthetic Insulation',
      variants: {
        create: [
          { sku: 'MV-S-GRY', size: 'S', color: 'Grey', price: 159, stock: 6 },
          { sku: 'MV-M-GRY', size: 'M', color: 'Grey', price: 159, stock: 10 },
          { sku: 'MV-L-GRY', size: 'L', color: 'Grey', price: 159, stock: 8 },
          { sku: 'MV-M-BLK', size: 'M', color: 'Black', price: 159, stock: 9 }
        ]
      },
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensJackets.id }
        ]
      }
    }
  });

  // 2. Men's Tops & Base Layers (2 products)
  const mensBaseLayer = await prisma.product.create({
    data: {
      name: 'Men\'s Merino Base Layer',
      slug: 'mens-merino-base-layer',
      description: 'Premium merino wool base layer with natural odor resistance.',
      shortDescription: 'Merino wool base layer with odor resistance',
      images: ['/images/products/mens-baselayer-1.avif'],
      basePrice: 89,
      material: '100% Merino Wool',
      variants: {
        create: [
          { sku: 'MBL-S-GRY', size: 'S', color: 'Grey', price: 89, stock: 8 },
          { sku: 'MBL-M-GRY', size: 'M', color: 'Grey', price: 89, stock: 12 },
          { sku: 'MBL-L-GRY', size: 'L', color: 'Grey', price: 89, stock: 10 },
          { sku: 'MBL-XL-GRY', size: 'XL', color: 'Grey', price: 89, stock: 6 }
        ]
      },
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensTops.id }
        ]
      }
    }
  });

  const mensHoodie = await prisma.product.create({
    data: {
      name: 'Men\'s Tech Hoodie',
      slug: 'mens-tech-hoodie',
      description: 'Technical hoodie with moisture-wicking fabric.',
      shortDescription: 'Technical hoodie with moisture-wicking',
      images: ['/images/products/mens-hoodie-1.avif'],
      basePrice: 129,
      material: 'Polyester Blend',
      featured: true,
      variants: {
        create: [
          { sku: 'MH-S-GRN', size: 'S', color: 'Forest Green', price: 129, stock: 7 },
          { sku: 'MH-M-GRN', size: 'M', color: 'Forest Green', price: 129, stock: 11 },
          { sku: 'MH-L-GRN', size: 'L', color: 'Forest Green', price: 129, stock: 9 },
          { sku: 'MH-M-BLK', size: 'M', color: 'Black', price: 129, stock: 8 }
        ]
      },
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensTops.id }
        ]
      }
    }
  });

  // 3. Men's Bottoms (2 products)
  const mensHikingPants = await prisma.product.create({
    data: {
      name: 'Men\'s Hiking Pants',
      slug: 'mens-hiking-pants',
      description: 'Durable hiking pants with UPF 50+ sun protection.',
      shortDescription: 'Durable hiking pants with sun protection',
      images: ['/images/products/mens-pants-1.avif'],
      basePrice: 119,
      material: 'Ripstop Polyester',
      variants: {
        create: [
          { sku: 'MHP-30-KHK', size: '30', color: 'Khaki', price: 119, stock: 6 },
          { sku: 'MHP-32-KHK', size: '32', color: 'Khaki', price: 119, stock: 10 },
          { sku: 'MHP-34-KHK', size: '34', color: 'Khaki', price: 119, stock: 12 },
          { sku: 'MHP-36-KHK', size: '36', color: 'Khaki', price: 119, stock: 8 }
        ]
      },
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensBottoms.id }
        ]
      }
    }
  });

  const mensShorts = await prisma.product.create({
    data: {
      name: 'Men\'s Trail Shorts',
      slug: 'mens-trail-shorts',
      description: 'Lightweight trail shorts with built-in liner.',
      shortDescription: 'Lightweight trail shorts with liner',
      images: ['/images/products/mens-shorts-1.avif'],
      basePrice: 69,
      material: 'Quick-Dry Nylon',
      variants: {
        create: [
          { sku: 'MTS-S-BLK', size: 'S', color: 'Black', price: 69, stock: 8 },
          { sku: 'MTS-M-BLK', size: 'M', color: 'Black', price: 69, stock: 12 },
          { sku: 'MTS-L-BLK', size: 'L', color: 'Black', price: 69, stock: 10 },
          { sku: 'MTS-M-NVY', size: 'M', color: 'Navy', price: 69, stock: 9 }
        ]
      },
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensBottoms.id }
        ]
      }
    }
  });

  // 4. Women's Jackets & Vests (2 products)
  const womensDownJacket = await prisma.product.create({
    data: {
      name: 'Women\'s Alpine Down Jacket',
      slug: 'womens-alpine-down-jacket',
      description: 'Women\'s cut down jacket with 700-fill power insulation.',
      shortDescription: 'Women\'s down jacket with 700-fill insulation',
      images: ['/images/products/womens-down-jacket-1.avif'],
      basePrice: 329,
      material: 'Ripstop Nylon, 700-Fill Down',
      featured: true,
      variants: {
        create: [
          { sku: 'WDJ-XS-PNK', size: 'XS', color: 'Pink', price: 329, stock: 4 },
          { sku: 'WDJ-S-PNK', size: 'S', color: 'Pink', price: 329, stock: 8 },
          { sku: 'WDJ-M-PNK', size: 'M', color: 'Pink', price: 329, stock: 10 },
          { sku: 'WDJ-L-PNK', size: 'L', color: 'Pink', price: 329, stock: 6 },
          { sku: 'WDJ-S-BLK', size: 'S', color: 'Black', price: 329, stock: 7 },
          { sku: 'WDJ-M-BLK', size: 'M', color: 'Black', price: 329, stock: 9 }
        ]
      },
      categories: {
        create: [
          { categoryId: womensCategory.id },
          { categoryId: womensJackets.id }
        ]
      }
    }
  });

  const womensFleece = await prisma.product.create({
    data: {
      name: 'Women\'s Fleece Jacket',
      slug: 'womens-fleece-jacket',
      description: 'Cozy fleece jacket perfect for layering.',
      shortDescription: 'Cozy fleece jacket for layering',
      images: ['/images/products/womens-fleece-1.avif'],
      basePrice: 89,
      material: 'Recycled Polyester Fleece',
      variants: {
        create: [
          { sku: 'WFJ-XS-PUR', size: 'XS', color: 'Purple', price: 89, stock: 5 },
          { sku: 'WFJ-S-PUR', size: 'S', color: 'Purple', price: 89, stock: 9 },
          { sku: 'WFJ-M-PUR', size: 'M', color: 'Purple', price: 89, stock: 11 },
          { sku: 'WFJ-L-PUR', size: 'L', color: 'Purple', price: 89, stock: 7 }
        ]
      },
      categories: {
        create: [
          { categoryId: womensCategory.id },
          { categoryId: womensJackets.id }
        ]
      }
    }
  });

  // 5. Women's Tops & Base Layers (2 products)
  const womensBaseLayer = await prisma.product.create({
    data: {
      name: 'Women\'s Merino Base Layer',
      slug: 'womens-merino-base-layer',
      description: 'Women\'s merino wool base layer with feminine fit.',
      shortDescription: 'Women\'s merino wool base layer',
      images: ['/images/products/womens-baselayer-1.avif'],
      basePrice: 89,
      material: '100% Merino Wool',
      variants: {
        create: [
          { sku: 'WBL-XS-GRY', size: 'XS', color: 'Grey', price: 89, stock: 6 },
          { sku: 'WBL-S-GRY', size: 'S', color: 'Grey', price: 89, stock: 10 },
          { sku: 'WBL-M-GRY', size: 'M', color: 'Grey', price: 89, stock: 12 },
          { sku: 'WBL-L-GRY', size: 'L', color: 'Grey', price: 89, stock: 8 }
        ]
      },
      categories: {
        create: [
          { categoryId: womensCategory.id },
          { categoryId: womensTops.id }
        ]
      }
    }
  });

  // 6. Hiking Boots (2 products)
  const hikingBootsProduct = await prisma.product.create({
    data: {
      name: 'Alpine Hiking Boots',
      slug: 'alpine-hiking-boots',
      description: 'Waterproof hiking boots with Gore-Tex lining.',
      shortDescription: 'Waterproof hiking boots with Gore-Tex',
      images: ['/images/products/hiking-boots-1.avif'],
      basePrice: 299,
      material: 'Gore-Tex, Nubuck Leather',
      featured: true,
      variants: {
        create: [
          { sku: 'AHB-7-BRN', size: '7', color: 'Brown', price: 299, stock: 8 },
          { sku: 'AHB-8-BRN', size: '8', color: 'Brown', price: 299, stock: 12 },
          { sku: 'AHB-9-BRN', size: '9', color: 'Brown', price: 299, stock: 15 },
          { sku: 'AHB-10-BRN', size: '10', color: 'Brown', price: 299, stock: 10 },
          { sku: 'AHB-8-BLK', size: '8', color: 'Black', price: 299, stock: 9 },
          { sku: 'AHB-9-BLK', size: '9', color: 'Black', price: 299, stock: 11 }
        ]
      },
      categories: {
        create: [
          { categoryId: footwearCategory.id },
          { categoryId: hikingBoots.id }
        ]
      }
    }
  });

  // 7. Trail Shoes (2 products)
  const trailShoesProduct = await prisma.product.create({
    data: {
      name: 'Trail Running Shoes',
      slug: 'trail-running-shoes',
      description: 'Lightweight trail running shoes with aggressive tread.',
      shortDescription: 'Lightweight trail running shoes',
      images: ['/images/products/trail-shoes-1.avif'],
      basePrice: 149,
      material: 'Mesh, Synthetic Rubber',
      variants: {
        create: [
          { sku: 'TRS-7-GRY', size: '7', color: 'Grey/Orange', price: 149, stock: 6 },
          { sku: 'TRS-8-GRY', size: '8', color: 'Grey/Orange', price: 149, stock: 10 },
          { sku: 'TRS-9-GRY', size: '9', color: 'Grey/Orange', price: 149, stock: 12 },
          { sku: 'TRS-10-GRY', size: '10', color: 'Grey/Orange', price: 149, stock: 8 }
        ]
      },
      categories: {
        create: [
          { categoryId: footwearCategory.id },
          { categoryId: trailShoes.id }
        ]
      }
    }
  });

  // 8. Backpacks (2 products)
  const backpackProduct = await prisma.product.create({
    data: {
      name: 'Alpine Backpack 45L',
      slug: 'alpine-backpack-45l',
      description: 'Multi-day hiking backpack with 45L capacity.',
      shortDescription: '45L hiking backpack for multi-day trips',
      images: ['/images/products/backpack-45l-1.avif'],
      basePrice: 219,
      material: 'Ripstop Nylon, Aluminum Frame',
      variants: {
        create: [
          { sku: 'AB45-S-GRN', size: 'S', color: 'Forest Green', price: 219, stock: 5 },
          { sku: 'AB45-M-GRN', size: 'M', color: 'Forest Green', price: 219, stock: 8 },
          { sku: 'AB45-L-GRN', size: 'L', color: 'Forest Green', price: 219, stock: 6 },
          { sku: 'AB45-M-BLU', size: 'M', color: 'Navy Blue', price: 219, stock: 7 }
        ]
      },
      categories: {
        create: [
          { categoryId: bagsCategory.id },
          { categoryId: backpacks.id }
        ]
      }
    }
  });

  // 9. Daypacks (2 products)
  const daypackProduct = await prisma.product.create({
    data: {
      name: 'Summit Daypack 25L',
      slug: 'summit-daypack-25l',
      description: 'Versatile daypack perfect for hiking and travel.',
      shortDescription: '25L daypack for hiking and travel',
      images: ['/images/products/daypack-25l-1.avif', '/images/products/daypack-25l-2.avif'],
      basePrice: 89,
      material: 'Recycled Polyester',
      variants: {
        create: [
          { sku: 'SD25-OS-BLK', size: 'One Size', color: 'Black', price: 89, stock: 10 },
          { sku: 'SD25-OS-GRY', size: 'One Size', color: 'Grey', price: 89, stock: 8 },
          { sku: 'SD25-OS-BLU', size: 'One Size', color: 'Navy Blue', price: 89, stock: 12 }
        ]
      },
      categories: {
        create: [
          { categoryId: bagsCategory.id },
          { categoryId: daypacks.id }
        ]
      }
    }
  });

  // ==================== Additional Products ====================

  // 10. Women's Bottoms (2 products)
  const womensHikingPants = await prisma.product.create({
    data: {
      name: 'Women\'s Trail Pants',
      slug: 'womens-trail-pants',
      description: 'Comfortable hiking pants designed for women with articulated knees.',
      shortDescription: 'Women\'s hiking pants with articulated knees',
      images: ['/images/products/womens-pants-1.avif'],
      basePrice: 109,
      material: 'Stretch Ripstop',
      variants: {
        create: [
          { sku: 'WTP-XS-BLK', size: 'XS', color: 'Black', price: 109, stock: 6 },
          { sku: 'WTP-S-BLK', size: 'S', color: 'Black', price: 109, stock: 10 },
          { sku: 'WTP-M-BLK', size: 'M', color: 'Black', price: 109, stock: 12 },
          { sku: 'WTP-L-BLK', size: 'L', color: 'Black', price: 109, stock: 8 },
          { sku: 'WTP-S-KHK', size: 'S', color: 'Khaki', price: 109, stock: 7 },
          { sku: 'WTP-M-KHK', size: 'M', color: 'Khaki', price: 109, stock: 9 }
        ]
      },
      categories: {
        create: [
          { categoryId: womensCategory.id },
          { categoryId: womensBottoms.id }
        ]
      }
    }
  });

  // 11. Additional Men's Jacket (using multiple images)
  const mensHeavyDownJacket = await prisma.product.create({
    data: {
      name: 'Men\'s Expedition Down Jacket',
      slug: 'mens-expedition-down-jacket',
      description: 'Ultra-warm expedition jacket with 900-fill down for extreme conditions.',
      shortDescription: 'Ultra-warm expedition jacket with 900-fill down',
      images: ['/images/products/mens-down-jacket-1.avif', '/images/products/mens-down-jacket-2.avif'],
      basePrice: 449,
      material: 'DWR Ripstop, 900-Fill Goose Down',
      featured: true,
      variants: {
        create: [
          { sku: 'MEDJ-S-BLK', size: 'S', color: 'Black', price: 449, stock: 4 },
          { sku: 'MEDJ-M-BLK', size: 'M', color: 'Black', price: 449, stock: 8 },
          { sku: 'MEDJ-L-BLK', size: 'L', color: 'Black', price: 449, stock: 6 },
          { sku: 'MEDJ-XL-BLK', size: 'XL', color: 'Black', price: 449, stock: 3 },
          { sku: 'MEDJ-M-RED', size: 'M', color: 'Red', price: 449, stock: 5 },
          { sku: 'MEDJ-L-RED', size: 'L', color: 'Red', price: 449, stock: 4 }
        ]
      },
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensJackets.id }
        ]
      }
    }
  });

  // 12. Women's Additional Jacket 
  const womensShellJacket = await prisma.product.create({
    data: {
      name: 'Women\'s Technical Shell',
      slug: 'womens-technical-shell',
      description: 'Lightweight, packable shell jacket for women.',
      shortDescription: 'Lightweight packable shell jacket',
      images: ['/images/products/womens-jackets-1.avif'],
      basePrice: 219,
      material: 'Gore-Tex Paclite',
      variants: {
        create: [
          { sku: 'WTS-XS-BLU', size: 'XS', color: 'Blue', price: 219, stock: 5 },
          { sku: 'WTS-S-BLU', size: 'S', color: 'Blue', price: 219, stock: 8 },
          { sku: 'WTS-M-BLU', size: 'M', color: 'Blue', price: 219, stock: 10 },
          { sku: 'WTS-L-BLU', size: 'L', color: 'Blue', price: 219, stock: 7 }
        ]
      },
      categories: {
        create: [
          { categoryId: womensCategory.id },
          { categoryId: womensJackets.id }
        ]
      }
    }
  });

  // 13. More Backpacks (different sizes)
  const backpack30L = await prisma.product.create({
    data: {
      name: 'Alpine Backpack 30L',
      slug: 'alpine-backpack-30l',
      description: 'Versatile 30L backpack perfect for day hikes and weekend trips.',
      shortDescription: '30L backpack for day hikes',
      images: ['/images/products/backpack-45l-2.avif', '/images/products/backpack-45l-3.avif'],
      basePrice: 179,
      material: 'Ripstop Nylon, Internal Frame',
      variants: {
        create: [
          { sku: 'AB30-S-GRN', size: 'S', color: 'Forest Green', price: 179, stock: 8 },
          { sku: 'AB30-M-GRN', size: 'M', color: 'Forest Green', price: 179, stock: 12 },
          { sku: 'AB30-L-GRN', size: 'L', color: 'Forest Green', price: 179, stock: 9 },
          { sku: 'AB30-M-GRY', size: 'M', color: 'Grey', price: 179, stock: 10 }
        ]
      },
      categories: {
        create: [
          { categoryId: bagsCategory.id },
          { categoryId: backpacks.id }
        ]
      }
    }
  });

  // 14. Larger Travel Backpack
  const backpack65L = await prisma.product.create({
    data: {
      name: 'Expedition Backpack 65L',
      slug: 'expedition-backpack-65l',
      description: 'Large capacity backpack for extended expeditions and multi-week trips.',
      shortDescription: '65L backpack for extended expeditions',
      images: ['/images/products/backpack-25l-5.avif'],
      basePrice: 289,
      material: 'Heavy-Duty Nylon, External Frame',
      variants: {
        create: [
          { sku: 'EB65-M-BLK', size: 'M', color: 'Black', price: 289, stock: 4 },
          { sku: 'EB65-L-BLK', size: 'L', color: 'Black', price: 289, stock: 6 },
          { sku: 'EB65-XL-BLK', size: 'XL', color: 'Black', price: 289, stock: 3 }
        ]
      },
      categories: {
        create: [
          { categoryId: bagsCategory.id },
          { categoryId: backpacks.id }
        ]
      }
    }
  });

  // 15. More Daypacks
  const compactDaypack = await prisma.product.create({
    data: {
      name: 'Compact Daypack 15L',
      slug: 'compact-daypack-15l',
      description: 'Ultra-light daypack that packs down small for travel.',
      shortDescription: 'Ultra-light packable 15L daypack',
      images: ['/images/products/daypack-25l-3.avif', '/images/products/daypack-25l-4.avif'],
      basePrice: 59,
      material: 'Ultralight Nylon',
      variants: {
        create: [
          { sku: 'CD15-OS-BLK', size: 'One Size', color: 'Black', price: 59, stock: 15 },
          { sku: 'CD15-OS-GRY', size: 'One Size', color: 'Grey', price: 59, stock: 12 },
          { sku: 'CD15-OS-BLU', size: 'One Size', color: 'Blue', price: 59, stock: 18 }
        ]
      },
      categories: {
        create: [
          { categoryId: bagsCategory.id },
          { categoryId: daypacks.id }
        ]
      }
    }
  });

  // 16. Additional Hiking Shoes
  const approachShoes = await prisma.product.create({
    data: {
      name: 'Approach Shoes',
      slug: 'approach-shoes',
      description: 'Technical approach shoes for scrambling and light climbing.',
      shortDescription: 'Technical approach shoes for scrambling',
      images: ['/images/products/hiking-shoes-1.avif'],
      basePrice: 169,
      material: 'Suede, Climbing Rubber',
      variants: {
        create: [
          { sku: 'AS-7-GRY', size: '7', color: 'Grey', price: 169, stock: 6 },
          { sku: 'AS-8-GRY', size: '8', color: 'Grey', price: 169, stock: 8 },
          { sku: 'AS-9-GRY', size: '9', color: 'Grey', price: 169, stock: 10 },
          { sku: 'AS-10-GRY', size: '10', color: 'Grey', price: 169, stock: 7 },
          { sku: 'AS-8-BLK', size: '8', color: 'Black', price: 169, stock: 9 }
        ]
      },
      categories: {
        create: [
          { categoryId: footwearCategory.id },
          { categoryId: trailShoes.id }
        ]
      }
    }
  });

  // 17. Women's Down Jacket (multiple images)
  const womensLightDownJacket = await prisma.product.create({
    data: {
      name: 'Women\'s Ultralight Down Jacket',
      slug: 'womens-ultralight-down-jacket',
      description: 'Packable ultralight down jacket perfect for layering.',
      shortDescription: 'Packable ultralight down jacket',
      images: ['/images/products/womens-down-jacket-1.avif', '/images/products/womens-down-jacket-2.avif'],
      basePrice: 249,
      material: 'Ultralight Ripstop, 800-Fill Down',
      featured: true,
      variants: {
        create: [
          { sku: 'WUDJ-XS-PNK', size: 'XS', color: 'Pink', price: 249, stock: 6 },
          { sku: 'WUDJ-S-PNK', size: 'S', color: 'Pink', price: 249, stock: 10 },
          { sku: 'WUDJ-M-PNK', size: 'M', color: 'Pink', price: 249, stock: 12 },
          { sku: 'WUDJ-L-PNK', size: 'L', color: 'Pink', price: 249, stock: 8 },
          { sku: 'WUDJ-S-BLU', size: 'S', color: 'Blue', price: 249, stock: 9 },
          { sku: 'WUDJ-M-BLU', size: 'M', color: 'Blue', price: 249, stock: 11 }
        ]
      },
      categories: {
        create: [
          { categoryId: womensCategory.id },
          { categoryId: womensJackets.id }
        ]
      }
    }
  });

  // 18. Trail Running Shoes (multiple images)
  const trailRunners = await prisma.product.create({
    data: {
      name: 'Performance Trail Runners',
      slug: 'performance-trail-runners',
      description: 'High-performance trail running shoes with superior grip.',
      shortDescription: 'High-performance trail running shoes',
      images: ['/images/products/trail-shoes-1.jpg', '/images/products/trail-shoes-2.avif'],
      basePrice: 179,
      material: 'Mesh Upper, Vibram Sole',
      variants: {
        create: [
          { sku: 'PTR-7-ORG', size: '7', color: 'Orange/Black', price: 179, stock: 5 },
          { sku: 'PTR-8-ORG', size: '8', color: 'Orange/Black', price: 179, stock: 8 },
          { sku: 'PTR-9-ORG', size: '9', color: 'Orange/Black', price: 179, stock: 12 },
          { sku: 'PTR-10-ORG', size: '10', color: 'Orange/Black', price: 179, stock: 9 },
          { sku: 'PTR-8-BLU', size: '8', color: 'Blue/Grey', price: 179, stock: 7 },
          { sku: 'PTR-9-BLU', size: '9', color: 'Blue/Grey', price: 179, stock: 10 }
        ]
      },
      categories: {
        create: [
          { categoryId: footwearCategory.id },
          { categoryId: trailShoes.id }
        ]
      }
    }
  });

  // ==================== Update Sale Category with More Products ====================

  // Add more products to Sale category
  await prisma.productCategory.create({
    data: {
      productId: compactDaypack.id,
      categoryId: saleCategory.id
    }
  });

  await prisma.productCategory.create({
    data: {
      productId: mensHeavyDownJacket.id,
      categoryId: saleCategory.id
    }
  });

  await prisma.productCategory.create({
    data: {
      productId: womensHikingPants.id,
      categoryId: saleCategory.id
    }
  });

  // Sale category products (reuse existing products at discounted prices)
  // Add Men's Down Jacket to Sale category (discounted version)
  await prisma.productCategory.create({
    data: {
      productId: mensDownJacket.id,
      categoryId: saleCategory.id
    }
  });

  // Add Women's Fleece to Sale category
  await prisma.productCategory.create({
    data: {
      productId: womensFleece.id,
      categoryId: saleCategory.id
    }
  });

  // Add Trail Shoes to Sale category
  await prisma.productCategory.create({
    data: {
      productId: trailShoesProduct.id,
      categoryId: saleCategory.id
    }
  });

  console.log('Sample products created successfully!');
  console.log(`Created ${await prisma.category.count()} categories`);
  console.log(`Created ${await prisma.product.count()} products`);
  console.log(`Created ${await prisma.productVariant.count()} product variants`);
  console.log('Admin user: admin@outdoor.com / admin123');
}

main()
  .catch((e) => {
    console.error('Error creating seed data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });