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
    await prisma.productColor.deleteMany({});
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

  // ==================== Categories (same as before) ====================
  
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
      image: '/images/categories/womens-hero.jpg'
    }
  });

  const footwearCategory = await prisma.category.create({
    data: {
      name: 'Footwear',
      slug: 'footwear',
      description: 'Hiking boots, trail runners, and outdoor footwear',
      image: '/images/categories/shoes-hero.jpg'
    }
  });

  const bagsCategory = await prisma.category.create({
    data: {
      name: 'Bags',
      slug: 'bags',
      description: 'Backpacks, daypacks, and outdoor accessories',
      image: '/images/categories/bags-hero.jpg'
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

  // Subcategories
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

  const womensJackets = await prisma.category.create({
    data: {
      name: 'Jackets & Vests',
      slug: 'womens-jackets-vests',
      description: 'Women\'s outdoor jackets, shells, and vests',
      parentId: womensCategory.id
    }
  });

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

  console.log('Categories created');

  // ==================== Product Creation (Color and Size Separated) ====================

  // 1. Men's Alpine Down Jacket
  const mensDownJacket = await prisma.product.create({
    data: {
      name: 'Men\'s Alpine Down Jacket',
      slug: 'mens-alpine-down-jacket',
      description: 'Lightweight down jacket with 800-fill power goose down insulation.',
      shortDescription: 'Lightweight down jacket with 800-fill insulation',
      basePrice: 349,
      material: 'Ripstop Nylon, 800-Fill Goose Down',
      featured: true,
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensJackets.id }
        ]
      }
    }
  });

  // Men's Down Jacket colors
  const mensDownJacketBlack = await prisma.productColor.create({
    data: {
      productId: mensDownJacket.id,
      name: 'Black',
      code: '#000000',
      images: [
        '/images/products/mens-down-jacket-black-1.avif',
        '/images/products/mens-down-jacket-black-2.avif',
        '/images/products/mens-down-jacket-black-3.avif'
      ]
    }
  });

  const mensDownJacketNavy = await prisma.productColor.create({
    data: {
      productId: mensDownJacket.id,
      name: 'Navy',
      code: '#1E3A8A',
      images: [
        '/images/products/mens-down-jacket-navy-1.avif',
        '/images/products/mens-down-jacket-navy-2.avif'
      ]
    }
  });

  const mensDownJacketRed = await prisma.productColor.create({
    data: {
      productId: mensDownJacket.id,
      name: 'Red',
      code: '#DC2626',
      images: [
        '/images/products/mens-down-jacket-red-1.avif',
        '/images/products/mens-down-jacket-red-2.avif'
      ]
    }
  });

  // Men's Down Jacket variants (size + color combination)
  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = [
    { colorObj: mensDownJacketBlack, stock: [8, 12, 10, 6] },
    { colorObj: mensDownJacketNavy, stock: [5, 9, 7, 4] },
    { colorObj: mensDownJacketRed, stock: [3, 6, 5, 2] }
  ];

  for (const { colorObj, stock } of colors) {
    for (let i = 0; i < sizes.length; i++) {
      await prisma.productVariant.create({
        data: {
          sku: `MDJ-${sizes[i]}-${colorObj.name.substring(0, 3).toUpperCase()}`,
          productId: mensDownJacket.id,
          colorId: colorObj.id,
          size: sizes[i],
          price: 349,
          stock: stock[i]
        }
      });
    }
  }

  // 2. Women's Alpine Down Jacket
  const womensDownJacket = await prisma.product.create({
    data: {
      name: 'Women\'s Alpine Down Jacket',
      slug: 'womens-alpine-down-jacket',
      description: 'Women\'s cut down jacket with 700-fill power insulation.',
      shortDescription: 'Women\'s down jacket with 700-fill insulation',
      basePrice: 329,
      material: 'Ripstop Nylon, 700-Fill Down',
      featured: true,
      categories: {
        create: [
          { categoryId: womensCategory.id },
          { categoryId: womensJackets.id }
        ]
      }
    }
  });

  // Women's Down Jacket colors
  const womensDownJacketPink = await prisma.productColor.create({
    data: {
      productId: womensDownJacket.id,
      name: 'Pink',
      code: '#EC4899',
      images: [
        '/images/products/womens-down-jacket-pink-1.avif',
        '/images/products/womens-down-jacket-pink-2.avif'
      ]
    }
  });

  const womensDownJacketBlack = await prisma.productColor.create({
    data: {
      productId: womensDownJacket.id,
      name: 'Black',
      code: '#000000',
      images: [
        '/images/products/womens-down-jacket-black-1.avif',
        '/images/products/womens-down-jacket-black-2.avif'
      ]
    }
  });

  const womensDownJacketBlue = await prisma.productColor.create({
    data: {
      productId: womensDownJacket.id,
      name: 'Blue',
      code: '#2563EB',
      images: [
        '/images/products/womens-down-jacket-blue-1.avif',
        '/images/products/womens-down-jacket-blue-2.avif'
      ]
    }
  });

  // Women's sizes
  const womensSizes = ['XS', 'S', 'M', 'L'];
  const womensColors = [
    { colorObj: womensDownJacketPink, stock: [4, 8, 10, 6] },
    { colorObj: womensDownJacketBlack, stock: [6, 9, 12, 8] },
    { colorObj: womensDownJacketBlue, stock: [3, 7, 9, 5] }
  ];

  for (const { colorObj, stock } of womensColors) {
    for (let i = 0; i < womensSizes.length; i++) {
      await prisma.productVariant.create({
        data: {
          sku: `WDJ-${womensSizes[i]}-${colorObj.name.substring(0, 3).toUpperCase()}`,
          productId: womensDownJacket.id,
          colorId: colorObj.id,
          size: womensSizes[i],
          price: 329,
          stock: stock[i]
        }
      });
    }
  }

  // 3. Hiking Boots
  const hikingBootsProduct = await prisma.product.create({
    data: {
      name: 'Alpine Hiking Boots',
      slug: 'alpine-hiking-boots',
      description: 'Waterproof hiking boots with Gore-Tex lining.',
      shortDescription: 'Waterproof hiking boots with Gore-Tex',
      basePrice: 299,
      material: 'Gore-Tex, Nubuck Leather',
      featured: true,
      categories: {
        create: [
          { categoryId: footwearCategory.id },
          { categoryId: hikingBoots.id }
        ]
      }
    }
  });

  // Hiking Boots colors
  const hikingBootsBrown = await prisma.productColor.create({
    data: {
      productId: hikingBootsProduct.id,
      name: 'Brown',
      code: '#8B4513',
      images: [
        '/images/products/hiking-boots-brown-1.avif',
        '/images/products/hiking-boots-brown-2.avif',
        '/images/products/hiking-boots-brown-detail.avif'
      ]
    }
  });

  const hikingBootsBlack = await prisma.productColor.create({
    data: {
      productId: hikingBootsProduct.id,
      name: 'Black',
      code: '#000000',
      images: [
        '/images/products/hiking-boots-black-1.avif',
        '/images/products/hiking-boots-black-2.avif'
      ]
    }
  });

  // Hiking Boots variants
  const bootSizes = ['7', '8', '9', '10', '11'];
  const bootColors = [
    { colorObj: hikingBootsBrown, stock: [8, 12, 15, 10, 5] },
    { colorObj: hikingBootsBlack, stock: [6, 9, 11, 8, 4] }
  ];

  for (const { colorObj, stock } of bootColors) {
    for (let i = 0; i < bootSizes.length; i++) {
      await prisma.productVariant.create({
        data: {
          sku: `AHB-${bootSizes[i]}-${colorObj.name.substring(0, 3).toUpperCase()}`,
          productId: hikingBootsProduct.id,
          colorId: colorObj.id,
          size: bootSizes[i],
          price: 299,
          stock: stock[i]
        }
      });
    }
  }

  // 4. Trail Running Shoes
  const trailShoesProduct = await prisma.product.create({
    data: {
      name: 'Trail Running Shoes',
      slug: 'trail-running-shoes',
      description: 'Lightweight trail running shoes with aggressive tread.',
      shortDescription: 'Lightweight trail running shoes',
      basePrice: 149,
      material: 'Mesh, Synthetic Rubber',
      categories: {
        create: [
          { categoryId: footwearCategory.id },
          { categoryId: trailShoes.id }
        ]
      }
    }
  });

  // Trail Shoes colors
  const trailShoesGreyOrange = await prisma.productColor.create({
    data: {
      productId: trailShoesProduct.id,
      name: 'Grey/Orange',
      code: '#6B7280',
      images: [
        '/images/products/trail-shoes-grey-orange-1.avif',
        '/images/products/trail-shoes-grey-orange-2.avif'
      ]
    }
  });

  const trailShoesBlueGrey = await prisma.productColor.create({
    data: {
      productId: trailShoesProduct.id,
      name: 'Blue/Grey',
      code: '#2563EB',
      images: [
        '/images/products/trail-shoes-blue-grey-1.avif',
        '/images/products/trail-shoes-blue-grey-2.avif'
      ]
    }
  });

  const trailShoesBlackRed = await prisma.productColor.create({
    data: {
      productId: trailShoesProduct.id,
      name: 'Black/Red',
      code: '#000000',
      images: [
        '/images/products/trail-shoes-black-red-1.avif',
        '/images/products/trail-shoes-black-red-2.avif'
      ]
    }
  });

  // Trail Shoes variants
  const trailShoeColors = [
    { colorObj: trailShoesGreyOrange, stock: [6, 10, 12, 8, 5] },
    { colorObj: trailShoesBlueGrey, stock: [4, 7, 9, 6, 3] },
    { colorObj: trailShoesBlackRed, stock: [5, 8, 10, 7, 4] }
  ];

  for (const { colorObj, stock } of trailShoeColors) {
    for (let i = 0; i < bootSizes.length; i++) {
      await prisma.productVariant.create({
        data: {
          sku: `TRS-${bootSizes[i]}-${colorObj.name.replace('/', '').substring(0, 6).toUpperCase()}`,
          productId: trailShoesProduct.id,
          colorId: colorObj.id,
          size: bootSizes[i],
          price: 149,
          stock: stock[i]
        }
      });
    }
  }

  // Add to sale category
  await prisma.productCategory.create({
    data: {
      productId: mensDownJacket.id,
      categoryId: saleCategory.id
    }
  });

  await prisma.productCategory.create({
    data: {
      productId: trailShoesProduct.id,
      categoryId: saleCategory.id
    }
  });

  console.log('Sample products created successfully!');
  console.log(`Created ${await prisma.category.count()} categories`);
  console.log(`Created ${await prisma.product.count()} products`);
  console.log(`Created ${await prisma.productColor.count()} product colors`);
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

// ==================== Usage Examples ====================

/*
// Display color-specific images in product grid
const productsWithColors = await prisma.product.findMany({
  include: {
    colors: {
      select: {
        id: true,
        name: true,
        code: true,
        images: true
      }
    }
  }
});

// Check color-specific stock for specific product
const productWithVariants = await prisma.product.findUnique({
  where: { slug: 'mens-alpine-down-jacket' },
  include: {
    colors: {
      include: {
        variants: {
          select: {
            size: true,
            stock: true,
            price: true
          }
        }
      }
    }
  }
});

// Available sizes for specific color
const availableSizes = await prisma.productVariant.findMany({
  where: {
    productId: 'product-id',
    colorId: 'color-id',
    stock: { gt: 0 }
  },
  select: {
    size: true,
    stock: true,
    price: true
  }
});
*/