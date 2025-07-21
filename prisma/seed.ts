// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  // remove original data (only in dev)
  await prisma.productVariant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  // 1. user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@peakcanada.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LwlAF0fhTc8K9q8Yu', // "password123"
      name: 'PEAK Admin',
      role: 'ADMIN',
      emailVerified: true
    }
  })

  // 2. top categories
  const mens = await prisma.category.create({
    data: {
      name: "Men's",
      slug: 'mens',
      description: 'Outdoor gear designed for men',
      parentId: null
    }
  })

  const womens = await prisma.category.create({
    data: {
      name: "Women's",
      slug: 'womens',
      description: 'Outdoor gear designed for women',
      parentId: null
    }
  })

  const unisex = await prisma.category.create({
    data: {
      name: 'Unisex',
      slug: 'unisex',
      description: 'Outdoor gear for everyone',
      parentId: null
    }
  })

  // 3. sub categories
  const mensJackets = await prisma.category.create({
    data: {
      name: 'Jackets',
      slug: 'mens-jackets',
      description: 'Insulated and shell jackets for men',
      parentId: mens.id
    }
  })

  const mensPants = await prisma.category.create({
    data: {
      name: 'Pants',
      slug: 'mens-pants',
      description: 'Hiking and outdoor pants for men',
      parentId: mens.id
    }
  })

  const mensAccessories = await prisma.category.create({
    data: {
      name: 'Accessories',
      slug: 'mens-accessories',
      description: 'Hats, gloves, and accessories for men',
      parentId: mens.id
    }
  })

  const womensJackets = await prisma.category.create({
    data: {
      name: 'Jackets',
      slug: 'womens-jackets',
      description: 'Insulated and shell jackets for women',
      parentId: womens.id
    }
  })

  const womensPants = await prisma.category.create({
    data: {
      name: 'Pants',
      slug: 'womens-pants',
      description: 'Hiking and outdoor pants for women',
      parentId: womens.id
    }
  })

  const gear = await prisma.category.create({
    data: {
      name: 'Gear',
      slug: 'gear',
      description: 'Backpacks, equipment, and outdoor gear',
      parentId: unisex.id
    }
  })

  // 4. Men's products
  
  // Arctic Jacket (Men's)
  const arcticJacket = await prisma.product.create({
    data: {
      name: 'Arctic Insulation Jacket',
      slug: 'arctic-insulation-jacket',
      description: 'Premium down insulation jacket designed for extreme Canadian winters. Tested in -40°C conditions.',
      basePrice: 299.99,
      images: [
        '/images/arctic-jacket-forest.jpg',
        '/images/arctic-jacket-detail.jpg'
      ],
      featured: true,
      categoryId: mensJackets.id,
      variants: {
        create: [
          {
            sku: 'ARCTIC-M-S-FOREST',
            size: 'S',
            color: 'Forest Green',
            price: 299.99,
            stock: 15
          },
          {
            sku: 'ARCTIC-M-M-FOREST',
            size: 'M',
            color: 'Forest Green',
            price: 299.99,
            stock: 25
          },
          {
            sku: 'ARCTIC-M-L-FOREST',
            size: 'L',
            color: 'Forest Green',
            price: 299.99,
            stock: 20
          },
          {
            sku: 'ARCTIC-M-XL-FOREST',
            size: 'XL',
            color: 'Forest Green',
            price: 319.99,
            stock: 12
          },
          {
            sku: 'ARCTIC-M-M-STONE',
            size: 'M',
            color: 'Stone Grey',
            price: 299.99,
            stock: 18
          },
          {
            sku: 'ARCTIC-M-L-STONE',
            size: 'L',
            color: 'Stone Grey',
            price: 299.99,
            stock: 16
          }
        ]
      }
    }
  })

  // Trail Pants (Men's)
  const trailPants = await prisma.product.create({
    data: {
      name: 'Trail Performance Pants',
      slug: 'trail-performance-pants',
      description: 'Durable hiking pants with reinforced knees and water-resistant coating. Perfect for Rocky Mountain trails.',
      basePrice: 149.99,
      images: [
        '/images/trail-pants-stone.jpg',
        '/images/trail-pants-action.jpg'
      ],
      categoryId: mensPants.id,
      variants: {
        create: [
          {
            sku: 'TRAIL-M-30-STONE',
            size: '30',
            color: 'Stone Grey',
            price: 149.99,
            stock: 22
          },
          {
            sku: 'TRAIL-M-32-STONE',
            size: '32',
            color: 'Stone Grey',
            price: 149.99,
            stock: 28
          },
          {
            sku: 'TRAIL-M-34-STONE',
            size: '34',
            color: 'Stone Grey',
            price: 149.99,
            stock: 25
          },
          {
            sku: 'TRAIL-M-32-FOREST',
            size: '32',
            color: 'Forest Green',
            price: 149.99,
            stock: 20
          },
          {
            sku: 'TRAIL-M-34-FOREST',
            size: '34',
            color: 'Forest Green',
            price: 149.99,
            stock: 18
          }
        ]
      }
    }
  })

  // Peak Beanie (Men's Accessories)
  const peakBeanie = await prisma.product.create({
    data: {
      name: 'Peak Logo Beanie',
      slug: 'peak-logo-beanie',
      description: 'Warm merino wool beanie with embroidered PEAK logo. Essential for Canadian winters.',
      basePrice: 29.99,
      images: [
        '/images/beanie-forest.jpg',
        '/images/beanie-lifestyle.jpg'
      ],
      categoryId: mensAccessories.id,
      variants: {
        create: [
          {
            sku: 'BEANIE-M-OS-FOREST',
            size: 'One Size',
            color: 'Forest Green',
            price: 29.99,
            stock: 50
          },
          {
            sku: 'BEANIE-M-OS-STONE',
            size: 'One Size',
            color: 'Stone Grey',
            price: 29.99,
            stock: 45
          },
          {
            sku: 'BEANIE-M-OS-BLACK',
            size: 'One Size',
            color: 'Black',
            price: 29.99,
            stock: 60
          }
        ]
      }
    }
  })

  // 5. Women's products
  
  // Storm Shell Jacket (Women's)
  const stormShell = await prisma.product.create({
    data: {
      name: 'Storm Shell Jacket',
      slug: 'storm-shell-jacket-womens',
      description: 'Lightweight waterproof shell jacket for Pacific Coast weather. Perfect for Vancouver\'s rainy seasons.',
      basePrice: 189.99,
      images: [
        '/images/storm-shell-glacier.jpg',
        '/images/storm-shell-detail.jpg'
      ],
      featured: true,
      categoryId: womensJackets.id,
      variants: {
        create: [
          {
            sku: 'STORM-W-XS-GLACIER',
            size: 'XS',
            color: 'Glacier Blue',
            price: 189.99,
            stock: 12
          },
          {
            sku: 'STORM-W-S-GLACIER',
            size: 'S',
            color: 'Glacier Blue',
            price: 189.99,
            stock: 20
          },
          {
            sku: 'STORM-W-M-GLACIER',
            size: 'M',
            color: 'Glacier Blue',
            price: 189.99,
            stock: 18
          },
          {
            sku: 'STORM-W-L-GLACIER',
            size: 'L',
            color: 'Glacier Blue',
            price: 189.99,
            stock: 15
          },
          {
            sku: 'STORM-W-M-STONE',
            size: 'M',
            color: 'Stone Grey',
            price: 189.99,
            stock: 16
          }
        ]
      }
    }
  })

  // Flex Hiking Pants (Women's)
  const flexPants = await prisma.product.create({
    data: {
      name: 'Flex Hiking Pants',
      slug: 'flex-hiking-pants-womens',
      description: 'Stretchy, comfortable hiking pants designed for women. 4-way stretch fabric for ultimate mobility.',
      basePrice: 129.99,
      images: [
        '/images/flex-pants-stone.jpg',
        '/images/flex-pants-action.jpg'
      ],
      categoryId: womensPants.id,
      variants: {
        create: [
          {
            sku: 'FLEX-W-XS-STONE',
            size: 'XS',
            color: 'Stone Grey',
            price: 129.99,
            stock: 14
          },
          {
            sku: 'FLEX-W-S-STONE',
            size: 'S',
            color: 'Stone Grey',
            price: 129.99,
            stock: 22
          },
          {
            sku: 'FLEX-W-M-STONE',
            size: 'M',
            color: 'Stone Grey',
            price: 129.99,
            stock: 25
          },
          {
            sku: 'FLEX-W-L-STONE',
            size: 'L',
            color: 'Stone Grey',
            price: 129.99,
            stock: 20
          },
          {
            sku: 'FLEX-W-M-BLACK',
            size: 'M',
            color: 'Black',
            price: 129.99,
            stock: 18
          }
        ]
      }
    }
  })

  // 6. Unisex Gear 
  
  // Summit Backpack
  const summitBackpack = await prisma.product.create({
    data: {
      name: 'Summit Hiking Backpack',
      slug: 'summit-hiking-backpack',
      description: '40L hiking backpack with hydration system compatibility. Designed for multi-day Canadian backcountry adventures.',
      basePrice: 159.99,
      images: [
        '/images/summit-backpack-forest.jpg',
        '/images/summit-backpack-features.jpg'
      ],
      featured: true,
      categoryId: gear.id,
      variants: {
        create: [
          {
            sku: 'SUMMIT-U-OS-FOREST',
            size: 'One Size',
            color: 'Forest Green',
            price: 159.99,
            stock: 25
          },
          {
            sku: 'SUMMIT-U-OS-STONE',
            size: 'One Size',
            color: 'Stone Grey',
            price: 159.99,
            stock: 20
          },
          {
            sku: 'SUMMIT-U-OS-BLACK',
            size: 'One Size',
            color: 'Black',
            price: 159.99,
            stock: 30
          }
        ]
      }
    }
  })

  // Insulated Water Bottle
  const waterBottle = await prisma.product.create({
    data: {
      name: 'Insulated Water Bottle',
      slug: 'insulated-water-bottle',
      description: 'Double-wall stainless steel water bottle. Keeps drinks cold for 24h, hot for 12h. Perfect for all-season adventures.',
      basePrice: 34.99,
      images: [
        '/images/water-bottle-steel.jpg',
        '/images/water-bottle-lifestyle.jpg'
      ],
      categoryId: gear.id,
      variants: {
        create: [
          {
            sku: 'BOTTLE-U-500-STEEL',
            size: '500ml',
            color: 'Stainless Steel',
            price: 34.99,
            stock: 40
          },
          {
            sku: 'BOTTLE-U-750-STEEL',
            size: '750ml',
            color: 'Stainless Steel',
            price: 39.99,
            stock: 35
          },
          {
            sku: 'BOTTLE-U-500-BLACK',
            size: '500ml',
            color: 'Black',
            price: 34.99,
            stock: 38
          },
          {
            sku: 'BOTTLE-U-750-BLACK',
            size: '750ml',
            color: 'Black',
            price: 39.99,
            stock: 32
          }
        ]
      }
    }
  })

  console.log('complete')
}

main()
  .catch((e) => {
    console.error('seed error', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })