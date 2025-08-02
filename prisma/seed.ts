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

  // ==================== Categories (Combined Slug Approach) ====================
  
  // Top level gender categories
  const mensCategory = await prisma.category.create({
    data: {
      name: 'Men\'s',
      slug: 'mens',
      description: 'Men\'s outdoor clothing and gear',
      image: '/images/categories/mens-hero.jpg'
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

  // Women's categories with combined slugs
  const womensClothingCategory = await prisma.category.create({
    data: {
      name: 'Women\'s Clothing',
      slug: 'womens-clothing',
      description: 'Women\'s outdoor clothing collection',
      image: '/images/categories/womens-clothing-hero.jpg',
      parentId: womensCategory.id
    }
  });

  const womensJacketsCategory = await prisma.category.create({
    data: {
      name: 'Women\'s Jackets & Coats',
      slug: 'womens-jackets-vests',
      description: 'Women\'s outdoor jackets, coats and vests',
      image: '/images/categories/womens-jackets-hero.jpg',
      parentId: womensClothingCategory.id
    }
  });

  const womensTopsCategory = await prisma.category.create({
    data: {
      name: 'Women\'s Tops & Shirts',
      slug: 'womens-tops-base-layers',
      description: 'Women\'s tops, shirts and base layers',
      image: '/images/categories/womens-tops-hero.jpg',
      parentId: womensClothingCategory.id
    }
  });

  const womensBottomsCategory = await prisma.category.create({
    data: {
      name: 'Women\'s Bottoms',
      slug: 'womens-bottoms',
      description: 'Women\'s pants, shorts and bottoms',
      image: '/images/categories/womens-bottoms-hero.jpg',
      parentId: womensClothingCategory.id
    }
  });

  const womensDressesCategory = await prisma.category.create({
    data: {
      name: 'Women\'s Dresses & Skirts',
      slug: 'womens-dresses',
      description: 'Women\'s dresses and skirts for outdoor activities',
      image: '/images/categories/womens-dresses-hero.jpg',
      parentId: womensClothingCategory.id
    }
  });

  const womensFootwearCategory = await prisma.category.create({
    data: {
      name: 'Women\'s Footwear',
      slug: 'womens-footwear',
      description: 'Women\'s outdoor footwear collection',
      image: '/images/categories/womens-footwear-hero.jpg',
      parentId: womensCategory.id
    }
  });

  const womensHikingBootsCategory = await prisma.category.create({
    data: {
      name: 'Women\'s Hiking Boots',
      slug: 'womens-hiking-boots',
      description: 'Women\'s hiking boots for all terrains',
      image: '/images/categories/womens-hiking-boots-hero.jpg',
      parentId: womensFootwearCategory.id
    }
  });

  const womensTrailShoesCategory = await prisma.category.create({
    data: {
      name: 'Women\'s Trail Running',
      slug: 'womens-trail-shoes',
      description: 'Women\'s trail running shoes',
      image: '/images/categories/womens-trail-shoes-hero.jpg',
      parentId: womensFootwearCategory.id
    }
  });

  const womensCasualShoesCategory = await prisma.category.create({
    data: {
      name: 'Women\'s Casual Shoes',
      slug: 'womens-casual-shoes',
      description: 'Women\'s casual and travel shoes',
      image: '/images/categories/womens-casual-shoes-hero.jpg',
      parentId: womensFootwearCategory.id
    }
  });

  const womensAccessoriesCategory = await prisma.category.create({
    data: {
      name: 'Women\'s Accessories',
      slug: 'womens-accessories',
      description: 'Women\'s outdoor accessories',
      image: '/images/categories/womens-accessories-hero.jpg',
      parentId: womensCategory.id
    }
  });

  const womensHatsCategory = await prisma.category.create({
    data: {
      name: 'Women\'s Hats & Beanies',
      slug: 'womens-hats',
      description: 'Women\'s hats and beanies',
      parentId: womensAccessoriesCategory.id
    }
  });

  const womensGlovesCategory = await prisma.category.create({
    data: {
      name: 'Women\'s Gloves',
      slug: 'womens-gloves',
      description: 'Women\'s gloves and mittens',
      parentId: womensAccessoriesCategory.id
    }
  });

  const womensBagsCategory = await prisma.category.create({
    data: {
      name: 'Women\'s Bags',
      slug: 'womens-bags',
      description: 'Women\'s bags and purses',
      parentId: womensAccessoriesCategory.id
    }
  });

  const womensSocksCategory = await prisma.category.create({
    data: {
      name: 'Women\'s Socks',
      slug: 'womens-socks',
      description: 'Women\'s outdoor socks',
      parentId: womensAccessoriesCategory.id
    }
  });

  // Men's categories with combined slugs
  const mensClothingCategory = await prisma.category.create({
    data: {
      name: 'Men\'s Clothing',
      slug: 'mens-clothing',
      description: 'Men\'s outdoor clothing collection',
      image: '/images/categories/mens-clothing-hero.jpg',
      parentId: mensCategory.id
    }
  });

  const mensJacketsCategory = await prisma.category.create({
    data: {
      name: 'Men\'s Jackets & Coats',
      slug: 'mens-jackets-vests',
      description: 'Men\'s outdoor jackets, coats and vests',
      image: '/images/categories/mens-jackets-hero.jpg',
      parentId: mensClothingCategory.id
    }
  });

  const mensTopsCategory = await prisma.category.create({
    data: {
      name: 'Men\'s Tops & Shirts',
      slug: 'mens-tops-base-layers',
      description: 'Men\'s tops, shirts and base layers',
      image: '/images/categories/mens-tops-hero.jpg',
      parentId: mensClothingCategory.id
    }
  });

  const mensBottomsCategory = await prisma.category.create({
    data: {
      name: 'Men\'s Bottoms',
      slug: 'mens-bottoms',
      description: 'Men\'s pants, shorts and bottoms',
      image: '/images/categories/mens-bottoms-hero.jpg',
      parentId: mensClothingCategory.id
    }
  });

  const mensFootwearCategory = await prisma.category.create({
    data: {
      name: 'Men\'s Footwear',
      slug: 'mens-footwear',
      description: 'Men\'s outdoor footwear collection',
      image: '/images/categories/mens-footwear-hero.jpg',
      parentId: mensCategory.id
    }
  });

  const mensHikingBootsCategory = await prisma.category.create({
    data: {
      name: 'Men\'s Hiking Boots',
      slug: 'mens-hiking-boots',
      description: 'Men\'s hiking boots for all terrains',
      image: '/images/categories/mens-hiking-boots-hero.jpg',
      parentId: mensFootwearCategory.id
    }
  });

  const mensTrailShoesCategory = await prisma.category.create({
    data: {
      name: 'Men\'s Trail Running',
      slug: 'mens-trail-shoes',
      description: 'Men\'s trail running shoes',
      image: '/images/categories/mens-trail-shoes-hero.jpg',
      parentId: mensFootwearCategory.id
    }
  });

  const mensCasualShoesCategory = await prisma.category.create({
    data: {
      name: 'Men\'s Casual Shoes',
      slug: 'mens-casual-shoes',
      description: 'Men\'s casual and travel shoes',
      image: '/images/categories/mens-casual-shoes-hero.jpg',
      parentId: mensFootwearCategory.id
    }
  });

  const mensAccessoriesCategory = await prisma.category.create({
    data: {
      name: 'Men\'s Accessories',
      slug: 'mens-accessories',
      description: 'Men\'s outdoor accessories',
      image: '/images/categories/mens-accessories-hero.jpg',
      parentId: mensCategory.id
    }
  });

  const mensHatsCategory = await prisma.category.create({
    data: {
      name: 'Men\'s Hats & Beanies',
      slug: 'mens-hats',
      description: 'Men\'s hats and beanies',
      parentId: mensAccessoriesCategory.id
    }
  });

  const mensGlovesCategory = await prisma.category.create({
    data: {
      name: 'Men\'s Gloves',
      slug: 'mens-gloves',
      description: 'Men\'s gloves and mittens',
      parentId: mensAccessoriesCategory.id
    }
  });

  const mensBagsCategory = await prisma.category.create({
    data: {
      name: 'Men\'s Bags',
      slug: 'mens-bags',
      description: 'Men\'s bags and backpacks',
      parentId: mensAccessoriesCategory.id
    }
  });

  const mensSocksCategory = await prisma.category.create({
    data: {
      name: 'Men\'s Socks',
      slug: 'mens-socks',
      description: 'Men\'s outdoor socks',
      parentId: mensAccessoriesCategory.id
    }
  });

  // Gear categories
  const gearCategory = await prisma.category.create({
    data: {
      name: 'Gear',
      slug: 'gear',
      description: 'Outdoor gear and equipment',
      image: '/images/categories/gear-hero.jpg'
    }
  });

  const backpacksCategory = await prisma.category.create({
    data: {
      name: 'Backpacks',
      slug: 'backpacks',
      description: 'Hiking and travel backpacks',
      image: '/images/categories/backpacks-hero.jpg',
      parentId: gearCategory.id
    }
  });

  const hikingBackpacksCategory = await prisma.category.create({
    data: {
      name: 'Hiking Backpacks',
      slug: 'hiking-backpacks',
      description: 'Multi-day hiking backpacks',
      parentId: backpacksCategory.id
    }
  });

  const daypacksCategory = await prisma.category.create({
    data: {
      name: 'Daypacks',
      slug: 'daypacks',
      description: 'Day hiking packs and travel bags',
      parentId: backpacksCategory.id
    }
  });

  const travelPacksCategory = await prisma.category.create({
    data: {
      name: 'Travel Packs',
      slug: 'travel-packs',
      description: 'Travel backpacks and luggage',
      parentId: backpacksCategory.id
    }
  });

  const campingCategory = await prisma.category.create({
    data: {
      name: 'Camping',
      slug: 'camping',
      description: 'Camping gear and equipment',
      image: '/images/categories/camping-hero.jpg',
      parentId: gearCategory.id
    }
  });

  const tentsCategory = await prisma.category.create({
    data: {
      name: 'Tents',
      slug: 'tents',
      description: 'Backpacking and camping tents',
      parentId: campingCategory.id
    }
  });

  const sleepingBagsCategory = await prisma.category.create({
    data: {
      name: 'Sleeping Bags',
      slug: 'sleeping-bags',
      description: 'Sleeping bags for all seasons',
      parentId: campingCategory.id
    }
  });

  const sleepingPadsCategory = await prisma.category.create({
    data: {
      name: 'Sleeping Pads',
      slug: 'sleeping-pads',
      description: 'Sleeping pads and mattresses',
      parentId: campingCategory.id
    }
  });

  const techToolsCategory = await prisma.category.create({
    data: {
      name: 'Tech & Tools',
      slug: 'tech-tools',
      description: 'Outdoor technology and tools',
      image: '/images/categories/tech-tools-hero.jpg',
      parentId: gearCategory.id
    }
  });

  const gpsCategory = await prisma.category.create({
    data: {
      name: 'GPS & Navigation',
      slug: 'gps',
      description: 'GPS devices and navigation tools',
      parentId: techToolsCategory.id
    }
  });

  const headlampsCategory = await prisma.category.create({
    data: {
      name: 'Headlamps',
      slug: 'headlamps',
      description: 'Headlamps and lighting equipment',
      parentId: techToolsCategory.id
    }
  });

  const multiToolsCategory = await prisma.category.create({
    data: {
      name: 'Multi-tools',
      slug: 'multi-tools',
      description: 'Multi-tools and outdoor knives',
      parentId: techToolsCategory.id
    }
  });

  // Activities categories
  const activitiesCategory = await prisma.category.create({
    data: {
      name: 'Activities',
      slug: 'activities',
      description: 'Gear organized by outdoor activities',
      image: '/images/categories/activities-hero.jpg'
    }
  });

  const hikingCategory = await prisma.category.create({
    data: {
      name: 'Hiking',
      slug: 'hiking',
      description: 'Hiking gear and equipment',
      parentId: activitiesCategory.id
    }
  });

  const dayHikingCategory = await prisma.category.create({
    data: {
      name: 'Day Hiking',
      slug: 'day-hiking',
      description: 'Day hiking essentials',
      parentId: hikingCategory.id
    }
  });

  const backpackingCategory = await prisma.category.create({
    data: {
      name: 'Backpacking',
      slug: 'backpacking',
      description: 'Multi-day backpacking gear',
      parentId: hikingCategory.id
    }
  });

  const mountaineeringCategory = await prisma.category.create({
    data: {
      name: 'Mountaineering',
      slug: 'mountaineering',
      description: 'Technical mountaineering equipment',
      parentId: hikingCategory.id
    }
  });

  const climbingCategory = await prisma.category.create({
    data: {
      name: 'Climbing',
      slug: 'climbing',
      description: 'Rock climbing and bouldering gear',
      parentId: activitiesCategory.id
    }
  });

  const rockClimbingCategory = await prisma.category.create({
    data: {
      name: 'Rock Climbing',
      slug: 'rock-climbing',
      description: 'Outdoor rock climbing gear',
      parentId: climbingCategory.id
    }
  });

  const indoorClimbingCategory = await prisma.category.create({
    data: {
      name: 'Indoor Climbing',
      slug: 'indoor-climbing',
      description: 'Indoor climbing and gym gear',
      parentId: climbingCategory.id
    }
  });

  const boulderingCategory = await prisma.category.create({
    data: {
      name: 'Bouldering',
      slug: 'bouldering',
      description: 'Bouldering equipment and gear',
      parentId: climbingCategory.id
    }
  });

  const runningCategory = await prisma.category.create({
    data: {
      name: 'Running',
      slug: 'running',
      description: 'Trail and road running gear',
      parentId: activitiesCategory.id
    }
  });

  const trailRunningCategory = await prisma.category.create({
    data: {
      name: 'Trail Running',
      slug: 'trail-running',
      description: 'Trail running shoes and gear',
      parentId: runningCategory.id
    }
  });

  const ultraRunningCategory = await prisma.category.create({
    data: {
      name: 'Ultra Running',
      slug: 'ultra-running',
      description: 'Ultra marathon running gear',
      parentId: runningCategory.id
    }
  });

  const roadRunningCategory = await prisma.category.create({
    data: {
      name: 'Road Running',
      slug: 'road-running',
      description: 'Road running shoes and gear',
      parentId: runningCategory.id
    }
  });

  const travelCategory = await prisma.category.create({
    data: {
      name: 'Travel',
      slug: 'travel',
      description: 'Adventure travel gear',
      parentId: activitiesCategory.id
    }
  });

  // Sale categories
  const saleCategory = await prisma.category.create({
    data: {
      name: 'Sale',
      slug: 'sale',
      description: 'Discounted outdoor gear and clothing',
      image: '/images/categories/sale-hero.jpg'
    }
  });

  const saleWomensCategory = await prisma.category.create({
    data: {
      name: 'Women\'s Sale',
      slug: 'sale-womens',
      description: 'Women\'s sale items',
      parentId: saleCategory.id
    }
  });

  const saleMensCategory = await prisma.category.create({
    data: {
      name: 'Men\'s Sale',
      slug: 'sale-mens',
      description: 'Men\'s sale items',
      parentId: saleCategory.id
    }
  });

  const saleGearCategory = await prisma.category.create({
    data: {
      name: 'Gear Sale',
      slug: 'sale-gear',
      description: 'Discounted outdoor gear',
      parentId: saleCategory.id
    }
  });

  console.log('Categories created');

  // ==================== Products with Category Assignment ====================

  // 1. Men's Down Jacket
  const mensDownJacket = await prisma.product.create({
    data: {
      name: 'Men\'s Alpine Down Jacket',
      slug: 'mens-alpine-down-jacket',
      description: 'Lightweight down jacket with 800-fill power goose down insulation.',
      shortDescription: 'Lightweight down jacket with 800-fill insulation',
      basePrice: 349,
      gender: 'MENS',
      material: 'Ripstop Nylon, 800-Fill Goose Down',
      featured: true,
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensClothingCategory.id },
          { categoryId: mensJacketsCategory.id }
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

  // 2. Men's Tech Hoodie
  const mensHoodie = await prisma.product.create({
    data: {
      name: 'Men\'s Tech Hoodie',
      slug: 'mens-tech-hoodie',
      description: 'Technical hoodie with moisture-wicking fabric.',
      shortDescription: 'Technical hoodie with moisture-wicking',
      basePrice: 129,
      gender: 'MENS',
      material: 'Polyester Blend',
      featured: true,
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensClothingCategory.id },
          { categoryId: mensTopsCategory.id }
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

  // Men's Hoodie variants
  const mensHoodieColors = [
    { colorObj: mensHoodieBlack, stock: [8, 12, 10, 6] },
    { colorObj: mensHoodieGray, stock: [7, 11, 9, 5] }
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

  // 3. Men's Padded Jacket
  const mensPaddedJacket = await prisma.product.create({
    data: {
      name: 'Men\'s Padded Jacket',
      slug: 'mens-padded-jacket',
      description: 'Insulated padded jacket for cold weather adventures.',
      shortDescription: 'Insulated padded jacket for cold weather',
      basePrice: 279,
      gender: 'MENS',
      material: 'Synthetic Insulation, Water-resistant Shell',
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensClothingCategory.id },
          { categoryId: mensJacketsCategory.id }
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

  // Add Red hoodie color that was missing
  const mensHoodieRed = await prisma.productColor.create({
    data: {
      productId: mensHoodie.id,
      name: 'Red',
      code: '#DC2626',
      images: ['/images/products/mens-hoodies-red-1.avif']
    }
  });

  // Add variants for red hoodie
  for (let i = 0; i < mensDownSizes.length; i++) {
    await prisma.productVariant.create({
      data: {
        sku: `MH-${mensDownSizes[i]}-RED`,
        productId: mensHoodie.id,
        colorId: mensHoodieRed.id,
        size: mensDownSizes[i],
        stock: [5, 8, 7, 4][i]
      }
    });
  }

  // 4. Men's Hiking Pants
  const mensHikingPants = await prisma.product.create({
    data: {
      name: 'Men\'s Hiking Pants',
      slug: 'mens-hiking-pants',
      description: 'Durable hiking pants with UPF 50+ sun protection.',
      shortDescription: 'Durable hiking pants with sun protection',
      basePrice: 119,
      gender: 'MENS',
      material: 'Ripstop Polyester',
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensClothingCategory.id },
          { categoryId: mensBottomsCategory.id }
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
      gender: 'MENS',
      material: 'Stretch Cotton Blend',
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensClothingCategory.id },
          { categoryId: mensBottomsCategory.id }
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
      gender: 'MENS',
      material: 'Quick-Dry Nylon',
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensClothingCategory.id },
          { categoryId: mensBottomsCategory.id }
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
      gender: 'MENS',
      material: 'Wind-resistant Nylon',
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: mensClothingCategory.id },
          { categoryId: mensJacketsCategory.id }
        ]
      }
    }
  });

  const mensWindbreakerGray = await prisma.productColor.create({
    data: {
      productId: mensWindbreaker.id,
      name: 'Gray',
      code: '#6B7280',
      price: 79,
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
      gender: 'WOMENS',
      material: 'Ripstop Nylon, 700-Fill Down',
      featured: true,
      categories: {
        create: [
          { categoryId: womensCategory.id },
          { categoryId: womensClothingCategory.id },
          { categoryId: womensJacketsCategory.id }
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
      gender: 'WOMENS',
      material: 'Wind-resistant Nylon',
      categories: {
        create: [
          { categoryId: womensCategory.id },
          { categoryId: womensClothingCategory.id },
          { categoryId: womensJacketsCategory.id }
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
      gender: 'WOMENS',
      material: '100% Merino Wool',
      categories: {
        create: [
          { categoryId: womensCategory.id },
          { categoryId: womensClothingCategory.id },
          { categoryId: womensTopsCategory.id }
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
      gender: 'WOMENS',
      material: 'Stretch Polyester Blend',
      categories: {
        create: [
          { categoryId: womensCategory.id },
          { categoryId: womensClothingCategory.id },
          { categoryId: womensBottomsCategory.id }
        ]
      }
    }
  });

  const womensLeggingsGray = await prisma.productColor.create({
    data: {
      productId: womensLeggings.id,
      name: 'Gray',
      code: '#6B7280',
      price: 55,
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
      gender: 'WOMENS',
      material: 'Stretch Cotton Blend',
      categories: {
        create: [
          { categoryId: womensCategory.id },
          { categoryId: womensClothingCategory.id },
          { categoryId: womensBottomsCategory.id }
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

  // 4. Men's Hoodie - Deep Blue variant
  const mensHoodieDeepBlue = await prisma.productColor.create({
    data: {
      productId: mensHoodie.id,
      name: 'Deep Blue',
      code: '#1E3A8A',
      images: ['/images/products/mens-hoodie-deep-blue-1.avif']
    }
  });

  // Add deep blue to mens hoodie colors array
  const mensHoodieColorsComplete = [
    { colorObj: mensHoodieBlack, stock: [8, 12, 10, 6] },
    { colorObj: mensHoodieGray, stock: [7, 11, 9, 5] },
    { colorObj: mensHoodieDeepBlue, stock: [6, 10, 8, 4] }
  ];

  // Add variants for deep blue
  for (let i = 0; i < mensDownSizes.length; i++) {
    await prisma.productVariant.create({
      data: {
        sku: `MH-${mensDownSizes[i]}-${mensHoodieDeepBlue.name.replace(' ', '').substring(0, 3).toUpperCase()}`,
        productId: mensHoodie.id,
        colorId: mensHoodieDeepBlue.id,
        size: mensDownSizes[i],
        stock: mensHoodieColorsComplete[2].stock[i]
      }
    });
  }

  // 13. Hiking Shoes (Unisex - multiple category assignment)
  const hikingShoes = await prisma.product.create({
    data: {
      name: 'Alpine Hiking Shoes',
      slug: 'alpine-hiking-shoes',
      description: 'Durable hiking shoes with excellent grip and comfort.',
      shortDescription: 'Durable hiking shoes with excellent grip',
      basePrice: 189,
      gender: 'UNISEX',
      material: 'Synthetic Leather, Rubber Sole',
      featured: true,
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: womensCategory.id },
          { categoryId: mensFootwearCategory.id },
          { categoryId: womensFootwearCategory.id },
          { categoryId: mensHikingBootsCategory.id },
          { categoryId: womensHikingBootsCategory.id },
          { categoryId: hikingCategory.id },
          { categoryId: dayHikingCategory.id }
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

  // 14. Trail Running Shoes (Unisex - multiple category assignment)
  const trailRunningShoes = await prisma.product.create({
    data: {
      name: 'Trail Running Shoes',
      slug: 'trail-running-shoes',
      description: 'Lightweight trail running shoes with aggressive tread.',
      shortDescription: 'Lightweight trail running shoes',
      basePrice: 149,
      gender: 'UNISEX',
      material: 'Mesh, Synthetic Rubber',
      categories: {
        create: [
          { categoryId: mensCategory.id },
          { categoryId: womensCategory.id },
          { categoryId: womensFootwearCategory.id },
          { categoryId: womensTrailShoesCategory.id },
          { categoryId: mensFootwearCategory.id },
          { categoryId: mensTrailShoesCategory.id }
        ]
      }
    }
  });

  const trailRunningShoesGray = await prisma.productColor.create({
    data: {
      productId: trailRunningShoes.id,
      name: 'Gray',
      code: '#6B7280',
      images: ['/images/products/trail-shoes-gray-1.jpg']
    }
  });

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

  // 15. Backpack 45L (Unisex)
  const backpack45L = await prisma.product.create({
    data: {
      name: 'Alpine Backpack 45L',
      slug: 'alpine-backpack-45l',
      description: 'Multi-day hiking backpack with 45L capacity.',
      shortDescription: '45L hiking backpack for multi-day trips',
      basePrice: 219,
      gender: 'UNISEX',
      material: 'Ripstop Nylon, Aluminum Frame',
      categories: {
        create: [
          { categoryId: backpacksCategory.id },
          { categoryId: womensBagsCategory.id },
          { categoryId: mensBagsCategory.id },
          { categoryId: hikingBackpacksCategory.id },
          { categoryId: gearCategory.id },
          { categoryId: travelPacksCategory.id },
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

  // 16. Backpack 15L (Unisex)
  const backpack15L = await prisma.product.create({
    data: {
      name: 'Compact Backpack 15L',
      slug: 'compact-backpack-15l',
      description: 'Ultra-light backpack that packs down small for travel.',
      shortDescription: 'Ultra-light packable 15L backpack',
      basePrice: 89,
      gender: 'UNISEX',
      material: 'Ultralight Nylon',
      categories: {
        create: [
          { categoryId: backpacksCategory.id },
          { categoryId: womensBagsCategory.id },
          { categoryId: mensBagsCategory.id },
          { categoryId: daypacksCategory.id },
          { categoryId: travelPacksCategory.id },
          { categoryId: gearCategory.id },
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

  // 17. Daypack 25L (Unisex)
  const daypack25L = await prisma.product.create({
    data: {
      name: 'Summit Daypack 25L',
      slug: 'summit-daypack-25l',
      description: 'Versatile daypack perfect for hiking and travel.',
      shortDescription: '25L daypack for hiking and travel',
      basePrice: 129,
      gender: 'UNISEX',
      material: 'Recycled Polyester',
      featured: true,
      categories: {
        create: [
          { categoryId: daypacksCategory.id },
          { categoryId: womensBagsCategory.id },
          { categoryId: mensBagsCategory.id },
          { categoryId: backpacksCategory.id },
          { categoryId: travelPacksCategory.id },
          { categoryId: dayHikingCategory.id },
          { categoryId: travelCategory.id },
          { categoryId: gearCategory.id },
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
      images: ['/images/products/daypack-25l-blue-1.avif']
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
// Get all categories with hierarchy
const categoriesWithHierarchy = await prisma.category.findMany({
  include: {
    children: true,
    parent: true,
    _count: {
      select: {
        products: true
      }
    }
  },
  orderBy: [
    { parentId: 'asc' },
    { name: 'asc' }
  ]
});

// Get products by gender
const mensProducts = await prisma.product.findMany({
  where: {
    gender: 'MENS'
  },
  include: {
    colors: {
      select: {
        name: true,
        code: true,
        images: true
      }
    },
    categories: {
      include: {
        category: true
      }
    }
  }
});

// Get products by category (works with new structure)
const jacketsProducts = await prisma.product.findMany({
  where: {
    categories: {
      some: {
        category: {
          slug: 'jackets-vests'
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

// Get unisex products that appear in both men's and women's categories
const unisexInBothCategories = await prisma.product.findMany({
  where: {
    AND: [
      {
        categories: {
          some: {
            category: {
              slug: 'mens'
            }
          }
        }
      },
      {
        categories: {
          some: {
            category: {
              slug: 'womens'
            }
          }
        }
      }
    ]
  },
  include: {
    colors: true,
    categories: {
      include: {
        category: true
      }
    }
  }
});

// Advanced filtering: Men's jackets under $200
const affordableMensJackets = await prisma.product.findMany({
  where: {
    AND: [
      {
        categories: {
          some: {
            category: {
              slug: 'mens'
            }
          }
        }
      },
      {
        categories: {
          some: {
            category: {
              slug: 'jackets-vests'
            }
          }
        }
      },
      {
        basePrice: {
          lt: 200
        }
      }
    ]
  },
  include: {
    colors: true
  }
});

// Get featured products across all categories
const featuredProducts = await prisma.product.findMany({
  where: {
    featured: true
  },
  include: {
    colors: {
      select: {
        name: true,
        code: true,
        images: true
      }
    },
    categories: {
      include: {
        category: true
      }
    }
  }
});
*/