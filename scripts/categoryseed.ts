import { prisma } from "../src/lib/prisma.js";

async function main() {
  await prisma.category.createMany({
    data: [
      {
        name: "Cycling",
        description: "Bicycles and cycling accessories.",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
      },
      {
        name: "Camping",
        description: "Camping tents and outdoor equipment.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      },
      {
        name: "Fitness",
        description: "Gym and fitness equipment.",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      },
      {
        name: "Water Sports",
        description: "Equipment for water activities.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      },
      {
        name: "Hiking",
        description: "Hiking and trekking gear.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      },
      {
        name: "Football",
        description: "Football equipment and accessories.",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974",
      },
      {
        name: "Cricket",
        description: "Cricket bats, balls and accessories.",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e",
      },
      {
        name: "Tennis",
        description: "Tennis rackets and accessories.",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8",
      },
      {
        name: "Other",
        description: "Miscellaneous sports equipment.",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Categories seeded successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
