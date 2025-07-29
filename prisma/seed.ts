

// ==================== Updated Seed Data with Real Images ====================
// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed data creation...');

  // Clean existing data
  try {
    await prisma.productVariant.deleteMany({});
    await prisma.productColor.deleteMany({});
    await prisma.productCategory.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.user.deleteMany({});
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

  // ==================== Categories ====================
  
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

  const mensBottoms = await prisma.category.create({
    data: {
      name: 'Bottoms',
      slug: 'mens-bottoms',
      description: 'Men\'s pants, shorts, and hiking bottoms',
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

  // ==================== Products with Real Images ====================

  // 1. Men's Down Jacket
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

  const mensDownJacketYellow = await prisma.productColor.create({
    data: {
      productId: mensDownJacket.id,
      name: 'Yellow',
      code: '#EAB308',
      images: [
        '/images/products/mens-down-jacket-yellow-1.avif'
      ]
    }
  });

  // Men's Down Jacket variants
  const mensDownSizes = ['S', 'M', 'L', 'XL'];
  const mensDownColors = [
    { colorObj: mensDownJacketNavy, stock: [5, 9, 7, 4] },
    { colorObj: mensDownJacketRed, stock: [3, 6, 5, 2] },
    { colorObj: mensDownJacketYellow, stock: [4, 8, 6, 3] }
  ];

  for (const { colorObj, stock } of mensDownColors) {
    for (let i = 0; i < mensDownSizes.length; i++) {
      await prisma.productVariant.create({
        data: {
          sku: `MDJ-${mensDownSizes[i]}-${colorObj.name.substring(0, 3).toUpperCase()}`,
          productId: mensDownJacket.id,
          colorId: colorObj.id,
          size: mensDownSizes[i],
          stock: stock[i]
        }
      });
    }
  }

  // 2. Men's Padded Jacket
  const mensPaddedJacket = await prisma.product.create({
    data: {
      name: 'Men\'s Padded Jacket',
      slug: 'mens-padded-jacket',
      description: 'Insulated padded jacket for cold weather adventures.',
      shortDescription: 'Insulated padded jacket for cold weather',
      basePrice: 279,
      material: 'Synthetic Insulation, Water-resistant Shell',
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensJackets.id }
        ]
      }
    }
  });

  const mensPaddedJacketGreen = await prisma.productColor.create({
    data: {
      productId: mensPaddedJacket.id,
      name: 'Green',
      code: '#059669',
      images: ['/images/products/mens-padded-jacket-green-1.avif']
    }
  });

  const mensPaddedJacketRed = await prisma.productColor.create({
    data: {
      productId: mensPaddedJacket.id,
      name: 'Red',
      code: '#DC2626',
      images: ['/images/products/mens-padded-jacket-red-1.avif']
    }
  });

  // Men's Padded Jacket variants
  const mensPaddedColors = [
    { colorObj: mensPaddedJacketGreen, stock: [6, 10, 8, 5] },
    { colorObj: mensPaddedJacketRed, stock: [4, 7, 6, 3] }
  ];

  for (const { colorObj, stock } of mensPaddedColors) {
    for (let i = 0; i < mensDownSizes.length; i++) {
      await prisma.productVariant.create({
        data: {
          sku: `MPJ-${mensDownSizes[i]}-${colorObj.name.substring(0, 3).toUpperCase()}`,
          productId: mensPaddedJacket.id,
          colorId: colorObj.id,
          size: mensDownSizes[i],
          stock: stock[i]
        }
      });
    }
  }

  // 3. Men's Hoodie
  const mensHoodie = await prisma.product.create({
    data: {
      name: 'Men\'s Tech Hoodie',
      slug: 'mens-tech-hoodie',
      description: 'Technical hoodie with moisture-wicking fabric.',
      shortDescription: 'Technical hoodie with moisture-wicking',
      basePrice: 129,
      material: 'Polyester Blend',
      featured: true,
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensTops.id }
        ]
      }
    }
  });

  const mensHoodieBlack = await prisma.productColor.create({
    data: {
      productId: mensHoodie.id,
      name: 'Black',
      code: '#000000',
      price: 99,
      images: ['/images/products/mens-hoodie-black-1.avif']
    }
  });

  const mensHoodieGray = await prisma.productColor.create({
    data: {
      productId: mensHoodie.id,
      name: 'Gray',
      code: '#6B7280',
      price: 120,
      images: ['/images/products/mens-hoodie-gray-1.avif']
    }
  });

  const mensHoodieRed = await prisma.productColor.create({
    data: {
      productId: mensHoodie.id,
      name: 'Red',
      code: '#DC2626',
      images: ['/images/products/mens-hoodies-red-1.avif']
    }
  });

  // Men's Hoodie variants
  const mensHoodieColors = [
    { colorObj: mensHoodieBlack, stock: [8, 12, 10, 6] },
    { colorObj: mensHoodieGray, stock: [7, 11, 9, 5] },
    { colorObj: mensHoodieRed, stock: [5, 8, 7, 4] }
  ];

  for (const { colorObj, stock } of mensHoodieColors) {
    for (let i = 0; i < mensDownSizes.length; i++) {
      await prisma.productVariant.create({
        data: {
          sku: `MH-${mensDownSizes[i]}-${colorObj.name.substring(0, 3).toUpperCase()}`,
          productId: mensHoodie.id,
          colorId: colorObj.id,
          size: mensDownSizes[i],
          stock: stock[i]
        }
      });
    }
  }

  // 4. Men's Hiking Pants
  const mensHikingPants = await prisma.product.create({
    data: {
      name: 'Men\'s Hiking Pants',
      slug: 'mens-hiking-pants',
      description: 'Durable hiking pants with UPF 50+ sun protection.',
      shortDescription: 'Durable hiking pants with sun protection',
      basePrice: 119,
      material: 'Ripstop Polyester',
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensBottoms.id }
        ]
      }
    }
  });

  const mensHikingPantsGreen = await prisma.productColor.create({
    data: {
      productId: mensHikingPants.id,
      name: 'Green',
      code: '#059669',
      images: ['/images/products/mens-hiking-pants-green-1.avif']
    }
  });

  // Men's Hiking Pants variants
  const pantsSizes = ['30', '32', '34', '36', '38'];
  for (let i = 0; i < pantsSizes.length; i++) {
    await prisma.productVariant.create({
      data: {
        sku: `MHP-${pantsSizes[i]}-GRN`,
        productId: mensHikingPants.id,
        colorId: mensHikingPantsGreen.id,
        size: pantsSizes[i],
        stock: [6, 10, 12, 8, 4][i]
      }
    });
  }

  // 5. Men's Stretch Pants
  const mensStretchPants = await prisma.product.create({
    data: {
      name: 'Men\'s Stretch Pants',
      slug: 'mens-stretch-pants',
      description: 'Flexible stretch pants for active outdoor use.',
      shortDescription: 'Flexible stretch pants for active use',
      basePrice: 139,
      material: 'Stretch Cotton Blend',
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensBottoms.id }
        ]
      }
    }
  });

  const mensStretchPantsBeige = await prisma.productColor.create({
    data: {
      productId: mensStretchPants.id,
      name: 'Beige',
      code: '#D2B48C',
      images: ['/images/products/mens-stretch-pants-beige-1.avif']
    }
  });

  const mensStretchPantsGray = await prisma.productColor.create({
    data: {
      productId: mensStretchPants.id,
      name: 'Gray',
      code: '#6B7280',
      images: ['/images/products/mens-stretch-pants-gray-1.avif']
    }
  });

  // Men's Stretch Pants variants
  const mensStretchColors = [
    { colorObj: mensStretchPantsBeige, stock: [5, 8, 10, 7, 3] },
    { colorObj: mensStretchPantsGray, stock: [6, 9, 11, 8, 4] }
  ];

  for (const { colorObj, stock } of mensStretchColors) {
    for (let i = 0; i < pantsSizes.length; i++) {
      await prisma.productVariant.create({
        data: {
          sku: `MSP-${pantsSizes[i]}-${colorObj.name.substring(0, 3).toUpperCase()}`,
          productId: mensStretchPants.id,
          colorId: colorObj.id,
          size: pantsSizes[i],
          stock: stock[i]
        }
      });
    }
  }

  // 6. Men's Shorts
  const mensShorts = await prisma.product.create({
    data: {
      name: 'Men\'s Trail Shorts',
      slug: 'mens-trail-shorts',
      description: 'Lightweight trail shorts with built-in liner.',
      shortDescription: 'Lightweight trail shorts with liner',
      basePrice: 69,
      material: 'Quick-Dry Nylon',
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensBottoms.id }
        ]
      }
    }
  });

  const mensShortsBlack = await prisma.productColor.create({
    data: {
      productId: mensShorts.id,
      name: 'Black',
      code: '#000000',
      images: [
        '/images/products/mens-shorts-black-1.avif',
        '/images/products/mens-shorts-black-2.avif',
        '/images/products/mens-shorts-black-3.avif'
      ]
    }
  });

  // Men's Shorts variants
  for (let i = 0; i < mensDownSizes.length; i++) {
    await prisma.productVariant.create({
      data: {
        sku: `MTS-${mensDownSizes[i]}-BLK`,
        productId: mensShorts.id,
        colorId: mensShortsBlack.id,
        size: mensDownSizes[i],
        stock: [8, 12, 10, 6][i]
      }
    });
  }

  // 7. Men's Windbreaker
  const mensWindbreaker = await prisma.product.create({
    data: {
      name: 'Men\'s Windbreaker',
      slug: 'mens-windbreaker',
      description: 'Lightweight windbreaker for unpredictable weather.',
      shortDescription: 'Lightweight windbreaker jacket',
      basePrice: 89,
      material: 'Wind-resistant Nylon',
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensJackets.id }
        ]
      }
    }
  });

  const mensWindbreakerGray = await prisma.productColor.create({
    data: {
      productId: mensWindbreaker.id,
      name: 'Gray',
      code: '#6B7280',
      images: ['/images/products/mens-windgreaker-gray-1.avif']
    }
  });

  // Men's Windbreaker variants
  for (let i = 0; i < mensDownSizes.length; i++) {
    await prisma.productVariant.create({
      data: {
        sku: `MWB-${mensDownSizes[i]}-GRY`,
        productId: mensWindbreaker.id,
        colorId: mensWindbreakerGray.id,
        size: mensDownSizes[i],
        stock: [7, 11, 9, 5][i]
      }
    });
  }

  // 8. Women's Down Jacket
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

  const womensDownJacketGreen = await prisma.productColor.create({
    data: {
      productId: womensDownJacket.id,
      name: 'Green',
      code: '#059669',
      images: ['/images/products/womens-down-jacket-green-1.avif']
    }
  });

  const womensDownJacketRed = await prisma.productColor.create({
    data: {
      productId: womensDownJacket.id,
      name: 'Red',
      code: '#DC2626',
      images: ['/images/products/womens-down-jacket-red-1.avif']
    }
  });

  // Women's Down Jacket variants
  const womensSizes = ['XS', 'S', 'M', 'L'];
  const womensDownColors = [
    { colorObj: womensDownJacketGreen, stock: [4, 8, 10, 6] },
    { colorObj: womensDownJacketRed, stock: [5, 9, 11, 7] }
  ];

  for (const { colorObj, stock } of womensDownColors) {
    for (let i = 0; i < womensSizes.length; i++) {
      await prisma.productVariant.create({
        data: {
          sku: `WDJ-${womensSizes[i]}-${colorObj.name.substring(0, 3).toUpperCase()}`,
          productId: womensDownJacket.id,
          colorId: colorObj.id,
          size: womensSizes[i],
          stock: stock[i]
        }
      });
    }
  }

  // 9. Women's Windbreaker
  const womensWindbreaker = await prisma.product.create({
    data: {
      name: 'Women\'s Windbreaker',
      slug: 'womens-windbreaker',
      description: 'Lightweight windbreaker designed for women.',
      shortDescription: 'Lightweight women\'s windbreaker',
      basePrice: 89,
      material: 'Wind-resistant Nylon',
      categories: {
        create: [
          { categoryId: womensCategory.id },
          { categoryId: womensJackets.id }
        ]
      }
    }
  });

  const womensWindbreakerRed = await prisma.productColor.create({
    data: {
      productId: womensWindbreaker.id,
      name: 'Red',
      code: '#DC2626',
      price: 79,
      images: ['/images/products/womens-windbreaker-red-1.avif']
    }
  });

  const womensWindbreakerYellow = await prisma.productColor.create({
    data: {
      productId: womensWindbreaker.id,
      name: 'Yellow',
      code: '#EAB308',
      price: 49,
      images: ['/images/products/womens-windbreaker-yellow-1.avif']
    }
  });

  // Women's Windbreaker variants
  const womensWindbreakerColors = [
    { colorObj: womensWindbreakerRed, stock: [3, 7, 9, 5] },
    { colorObj: womensWindbreakerYellow, stock: [4, 6, 8, 4] }
  ];

  for (const { colorObj, stock } of womensWindbreakerColors) {
    for (let i = 0; i < womensSizes.length; i++) {
      await prisma.productVariant.create({
        data: {
          sku: `WWB-${womensSizes[i]}-${colorObj.name.substring(0, 3).toUpperCase()}`,
          productId: womensWindbreaker.id,
          colorId: colorObj.id,
          size: womensSizes[i],
          stock: stock[i]
        }
      });
    }
  }

  // 10. Women's Base Layer
  const womensBaseLayer = await prisma.product.create({
    data: {
      name: 'Women\'s Merino Base Layer',
      slug: 'womens-merino-base-layer',
      description: 'Women\'s merino wool base layer with feminine fit.',
      shortDescription: 'Women\'s merino wool base layer',
      basePrice: 89,
      material: '100% Merino Wool',
      categories: {
        create: [
          { categoryId: womensCategory.id },
          { categoryId: womensTops.id }
        ]
      }
    }
  });

  const womensBaseLayerBlack = await prisma.productColor.create({
    data: {
      productId: womensBaseLayer.id,
      name: 'Black',
      code: '#000000',
      images: [
        '/images/products/womens-baselayer-black-1.avif',
        '/images/products/womens-baselayer-black-2.avif'
      ]
    }
  });

  // Women's Base Layer variants
  for (let i = 0; i < womensSizes.length; i++) {
    await prisma.productVariant.create({
      data: {
        sku: `WBL-${womensSizes[i]}-BLK`,
        productId: womensBaseLayer.id,
        colorId: womensBaseLayerBlack.id,
        size: womensSizes[i],
        stock: [6, 10, 12, 8][i]
      }
    });
  }

  // 11. Women's Leggings
  const womensLeggings = await prisma.product.create({
    data: {
      name: 'Women\'s Performance Leggings',
      slug: 'womens-performance-leggings',
      description: 'High-performance leggings with moisture-wicking fabric.',
      shortDescription: 'High-performance moisture-wicking leggings',
      basePrice: 79,
      material: 'Stretch Polyester Blend',
      categories: {
        create: [
          { categoryId: womensCategory.id },
          { categoryId: womensBottoms.id }
        ]
      }
    }
  });

  const womensLeggingsGray = await prisma.productColor.create({
    data: {
      productId: womensLeggings.id,
      name: 'Gray',
      code: '#6B7280',
      images: ['/images/products/womens-leggings-gray-1.avif']
    }
  });

  const womensLeggingsGreen = await prisma.productColor.create({
    data: {
      productId: womensLeggings.id,
      name: 'Green',
      code: '#059669',
      images: ['/images/products/womens-leggings-green-1.avif']
    }
  });

  // Women's Leggings variants
  const womensLeggingsColors = [
    { colorObj: womensLeggingsGray, stock: [5, 9, 11, 7] },
    { colorObj: womensLeggingsGreen, stock: [4, 8, 10, 6] }
  ];

  for (const { colorObj, stock } of womensLeggingsColors) {
    for (let i = 0; i < womensSizes.length; i++) {
      await prisma.productVariant.create({
        data: {
          sku: `WL-${womensSizes[i]}-${colorObj.name.substring(0, 3).toUpperCase()}`,
          productId: womensLeggings.id,
          colorId: colorObj.id,
          size: womensSizes[i],
          stock: stock[i]
        }
      });
    }
  }

  // 12. Women's Stretch Pants
  const womensStretchPants = await prisma.product.create({
    data: {
      name: 'Women\'s Stretch Pants',
      slug: 'womens-stretch-pants',
      description: 'Comfortable stretch pants for outdoor activities.',
      shortDescription: 'Comfortable stretch pants for outdoor use',
      basePrice: 119,
      material: 'Stretch Cotton Blend',
      categories: {
        create: [
          { categoryId: womensCategory.id },
          { categoryId: womensBottoms.id }
        ]
      }
    }
  });

  const womensStretchPantsWhite = await prisma.productColor.create({
    data: {
      productId: womensStretchPants.id,
      name: 'White',
      code: '#FFFFFF',
      price: 99,
      images: ['/images/products/womens-stretch-pants-white-1.avif']
    }
  });

  // Women's Stretch Pants variants
  for (let i = 0; i < womensSizes.length; i++) {
    await prisma.productVariant.create({
      data: {
        sku: `WSP-${womensSizes[i]}-WHT`,
        productId: womensStretchPants.id,
        colorId: womensStretchPantsWhite.id,
        size: womensSizes[i],
        stock: [4, 7, 9, 6][i]
      }
    });
  }

  // 13. Hiking Shoes
  const hikingShoes = await prisma.product.create({
    data: {
      name: 'Alpine Hiking Shoes',
      slug: 'alpine-hiking-shoes',
      description: 'Durable hiking shoes with excellent grip and comfort.',
      shortDescription: 'Durable hiking shoes with excellent grip',
      basePrice: 189,
      material: 'Synthetic Leather, Rubber Sole',
      featured: true,
      categories: {
        create: [
          { categoryId: footwearCategory.id },
          { categoryId: hikingBoots.id }
        ]
      }
    }
  });

  const hikingShoesBeige = await prisma.productColor.create({
    data: {
      productId: hikingShoes.id,
      name: 'Beige',
      code: '#D2B48C',
      images: ['/images/products/hiking-shoes-beige-1.avif']
    }
  });

  const hikingShoesCobalt = await prisma.productColor.create({
    data: {
      productId: hikingShoes.id,
      name: 'Cobalt',
      code: '#1E40AF',
      price: 120,
      images: ['/images/products/hiking-shoes-covalt-1.avif']
    }
  });

  const hikingShoesGray = await prisma.productColor.create({
    data: {
      productId: hikingShoes.id,
      name: 'Gray',
      code: '#6B7280',
      price: 130,
      images: ['/images/products/hiking-shoes-gray-1.avif']
    }
  });

  // Hiking Shoes variants
  const bootSizes = ['7', '8', '9', '10', '11'];
  const hikingShoesColors = [
    { colorObj: hikingShoesBeige, stock: [5, 8, 10, 7, 4] },
    { colorObj: hikingShoesCobalt, stock: [4, 7, 9, 6, 3] },
    { colorObj: hikingShoesGray, stock: [6, 9, 11, 8, 5] }
  ];

  for (const { colorObj, stock } of hikingShoesColors) {
    for (let i = 0; i < bootSizes.length; i++) {
      await prisma.productVariant.create({
        data: {
          sku: `AHS-${bootSizes[i]}-${colorObj.name.substring(0, 3).toUpperCase()}`,
          productId: hikingShoes.id,
          colorId: colorObj.id,
          size: bootSizes[i],
          stock: stock[i]
        }
      });
    }
  }

  // 14. Trail Running Shoes
  const trailRunningShoes = await prisma.product.create({
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

  console.log('Trail Running Shoes created:', trailRunningShoes.id);

  const trailRunningShoesGray = await prisma.productColor.create({
    data: {
      productId: trailRunningShoes.id,
      name: 'Gray',
      code: '#6B7280',
      images: ['/images/products/trail-shoes-gray-1.jpg']
    }
  });

  console.log('Trail Running Shoes Gray created:', trailRunningShoesGray.id);

  const trailRunningShoesRed = await prisma.productColor.create({
    data: {
      productId: trailRunningShoes.id,
      name: 'Red',
      code: '#DC2626',
      images: ['/images/products/trail-shoes-red-2.avif']
    }
  });

  const trailRunningShoesWhite = await prisma.productColor.create({
    data: {
      productId: trailRunningShoes.id,
      name: 'White',
      code: '#FFFFFF',
      images: ['/images/products/trail-shoes-white-1.avif']
    }
  });

  // Trail Running Shoes variants
  const trailRunningShoesColors = [
    { colorObj: trailRunningShoesGray, stock: [6, 10, 12, 8, 5] },
    { colorObj: trailRunningShoesRed, stock: [4, 7, 9, 6, 3] },
    { colorObj: trailRunningShoesWhite, stock: [5, 8, 10, 7, 4] }
  ];

  for (const { colorObj, stock } of trailRunningShoesColors) {
    for (let i = 0; i < bootSizes.length; i++) {
      await prisma.productVariant.create({
        data: {
          sku: `TRS-${bootSizes[i]}-${colorObj.name.substring(0, 3).toUpperCase()}`,
          productId: trailRunningShoes.id,
          colorId: colorObj.id,
          size: bootSizes[i],
          stock: stock[i]
        }
      });
    }
  }

  // 15. Backpack 45L
  const backpack45L = await prisma.product.create({
    data: {
      name: 'Alpine Backpack 45L',
      slug: 'alpine-backpack-45l',
      description: 'Multi-day hiking backpack with 45L capacity.',
      shortDescription: '45L hiking backpack for multi-day trips',
      basePrice: 219,
      material: 'Ripstop Nylon, Aluminum Frame',
      categories: {
        create: [
          { categoryId: bagsCategory.id },
          { categoryId: backpacks.id }
        ]
      }
    }
  });

  const backpack45LBlack = await prisma.productColor.create({
    data: {
      productId: backpack45L.id,
      name: 'Black',
      code: '#000000',
      images: ['/images/products/backpack-45l-black.avif']
    }
  });

  const backpack45LBlue = await prisma.productColor.create({
    data: {
      productId: backpack45L.id,
      name: 'Blue',
      code: '#2563EB',
      images: [
        '/images/products/backpack-45l-blue-1.avif',
        '/images/products/backpack-45l-blue-2.avif',
        '/images/products/backpack-45l-blue-3.avif'
      ]
    }
  });

  const backpack45LGray = await prisma.productColor.create({
    data: {
      productId: backpack45L.id,
      name: 'Gray',
      code: '#6B7280',
      images: [
        '/images/products/backpack-45l-gray-1.avif',
        '/images/products/backpack-45l-gray-2.avif'
      ]
    }
  });

  const backpack45LRed = await prisma.productColor.create({
    data: {
      productId: backpack45L.id,
      name: 'Red',
      code: '#DC2626',
      images: [
        '/images/products/backpack-45l-red-1.avif',
        '/images/products/backpack-45l-red-2.avif'
      ]
    }
  });

  const backpack45LYellow = await prisma.productColor.create({
    data: {
      productId: backpack45L.id,
      name: 'Yellow',
      code: '#EAB308',
      images: ['/images/products/backpack-45l-yellow-1.avif']
    }
  });

  // Backpack 45L variants
  const backpackSizes = ['S', 'M', 'L'];
  const backpack45LColors = [
    { colorObj: backpack45LBlack, stock: [3, 5, 4] },
    { colorObj: backpack45LBlue, stock: [4, 7, 6] },
    { colorObj: backpack45LGray, stock: [5, 8, 7] },
    { colorObj: backpack45LRed, stock: [3, 6, 5] },
    { colorObj: backpack45LYellow, stock: [2, 4, 3] }
  ];

  for (const { colorObj, stock } of backpack45LColors) {
    for (let i = 0; i < backpackSizes.length; i++) {
      await prisma.productVariant.create({
        data: {
          sku: `AB45-${backpackSizes[i]}-${colorObj.name.substring(0, 3).toUpperCase()}`,
          productId: backpack45L.id,
          colorId: colorObj.id,
          size: backpackSizes[i],
          stock: stock[i]
        }
      });
    }
  }

  // 16. Backpack 15L
  const backpack15L = await prisma.product.create({
    data: {
      name: 'Compact Backpack 15L',
      slug: 'compact-backpack-15l',
      description: 'Ultra-light backpack that packs down small for travel.',
      shortDescription: 'Ultra-light packable 15L backpack',
      basePrice: 89,
      material: 'Ultralight Nylon',
      categories: {
        create: [
          { categoryId: bagsCategory.id },
          { categoryId: backpacks.id }
        ]
      }
    }
  });

  const backpack15LBlack = await prisma.productColor.create({
    data: {
      productId: backpack15L.id,
      name: 'Black',
      code: '#000000',
      images: ['/images/products/backpack-15l-black-1.avif']
    }
  });

  const backpack15LBlue = await prisma.productColor.create({
    data: {
      productId: backpack15L.id,
      name: 'Blue',
      code: '#2563EB',
      images: ['/images/products/backpack-15l-blue-1.avif']
    }
  });

  const backpack15LOrange = await prisma.productColor.create({
    data: {
      productId: backpack15L.id,
      name: 'Orange',
      code: '#EA580C',
      images: ['/images/products/backpack-15l-orange-1.avif']
    }
  });

  const backpack15LRed = await prisma.productColor.create({
    data: {
      productId: backpack15L.id,
      name: 'Red',
      code: '#DC2626',
      images: ['/images/products/backpack-15l-red-1.avif']
    }
  });

  // Backpack 15L variants (One Size fits all)
  const backpack15LColors = [
    { colorObj: backpack15LBlack, stock: 15 },
    { colorObj: backpack15LBlue, stock: 12 },
    { colorObj: backpack15LOrange, stock: 10 },
    { colorObj: backpack15LRed, stock: 8 }
  ];

  for (const { colorObj, stock } of backpack15LColors) {
    await prisma.productVariant.create({
      data: {
        sku: `CB15-OS-${colorObj.name.substring(0, 3).toUpperCase()}`,
        productId: backpack15L.id,
        colorId: colorObj.id,
        size: 'One Size',
        stock: stock
      }
    });
  }

  // 17. Daypack 25L
  const daypack25L = await prisma.product.create({
    data: {
      name: 'Summit Daypack 25L',
      slug: 'summit-daypack-25l',
      description: 'Versatile daypack perfect for hiking and travel.',
      shortDescription: '25L daypack for hiking and travel',
      basePrice: 129,
      material: 'Recycled Polyester',
      featured: true,
      categories: {
        create: [
          { categoryId: bagsCategory.id },
          { categoryId: daypacks.id }
        ]
      }
    }
  });

  const daypack25LGray = await prisma.productColor.create({
    data: {
      productId: daypack25L.id,
      name: 'Gray',
      code: '#6B7280',
      images: ['/images/products/daypack-25l-gray-1.avif']
    }
  });

  const daypack25LRed = await prisma.productColor.create({
    data: {
      productId: daypack25L.id,
      name: 'Red',
      code: '#DC2626',
      images: ['/images/products/daypack-25l-red-1.avif']
    }
  });

  const daypack25LSkyBlue = await prisma.productColor.create({
    data: {
      productId: daypack25L.id,
      name: 'Sky Blue',
      code: '#0EA5E9',
      images: ['/images/products/daypack-25l-skyblue-1.avif']
    }
  });

  // Daypack 25L variants (One Size fits all)
  const daypack25LColors = [
    { colorObj: daypack25LGray, stock: 10 },
    { colorObj: daypack25LRed, stock: 8 },
    { colorObj: daypack25LSkyBlue, stock: 12 }
  ];

  for (const { colorObj, stock } of daypack25LColors) {
    await prisma.productVariant.create({
      data: {
        sku: `SD25-OS-${colorObj.name.replace(' ', '').substring(0, 3).toUpperCase()}`,
        productId: daypack25L.id,
        colorId: colorObj.id,
        size: 'One Size',
        stock: stock
      }
    });
  }

  // Add products to sale category
  await prisma.productCategory.create({
    data: {
      productId: mensDownJacket.id,
      categoryId: saleCategory.id
    }
  });

  await prisma.productCategory.create({
    data: {
      productId: mensHoodie.id,
      categoryId: saleCategory.id
    }
  });

  await prisma.productCategory.create({
    data: {
      productId: trailRunningShoes.id,
      categoryId: saleCategory.id
    }
  });

  await prisma.productCategory.create({
    data: {
      productId: backpack15L.id,
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

// Get product with colors and variants for product detail page
const productDetail = await prisma.product.findUnique({
  where: { slug: 'mens-alpine-down-jacket' },
  include: {
    colors: {
      include: {
        variants: {
          where: { stock: { gt: 0 } }, // only show available sizes
          select: {
            size: true,
            stock: true,
            price: true,
            sku: true
          }
        }
      }
    },
    categories: {
      include: {
        category: true
      }
    }
  }
});

// Get available sizes for specific color
const availableSizes = await prisma.productVariant.findMany({
  where: {
    productId: 'product-id',
    colorId: 'color-id',
    stock: { gt: 0 }
  },
  select: {
    size: true,
    stock: true,
    price: true,
    sku: true
  }
});

// Get products by category with colors
const categoryProducts = await prisma.product.findMany({
  where: {
    categories: {
      some: {
        category: {
          slug: 'mens-jackets-vests'
        }
      }
    }
  },
  include: {
    colors: {
      select: {
        name: true,
        code: true,
        images: true
      }
    }
  }
});
*/