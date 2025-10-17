import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const furniture = [
  { name: "Sofa Comfort", category: "Sofa", price: 1200, inStock: true },
  { name: "Oak Dining Table", category: "Table", price: 800, inStock: true },
  { name: "Modern Chair", category: "Chair", price: 250, inStock: false },
  { name: "King Bed Frame", category: "Bed", price: 1500, inStock: true },
  { name: "Nightstand Classic", category: "Nightstand", price: 200, inStock: true },
  { name: "Bookshelf Minimalist", category: "Shelf", price: 450, inStock: false },
  { name: "Coffee Table Round", category: "Table", price: 300, inStock: true },
  { name: "Recliner Chair", category: "Chair", price: 700, inStock: true },
  { name: "Wardrobe Sliding Doors", category: "Wardrobe", price: 1800, inStock: false },
  { name: "TV Stand Modern", category: "TV Stand", price: 550, inStock: true },
  { name: "Corner Sofa", category: "Sofa", price: 2200, inStock: true },
  { name: "Dining Chair Set", category: "Chair", price: 600, inStock: false },
  { name: "Console Table Elegant", category: "Table", price: 400, inStock: true },
];

async function main() {
  for (const item of furniture) {
    await prisma.furniture.create({ data: item });
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
