import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding access control system...");

  try {
    // Create Admin
    await prisma.user.upsert({
      where: { email: "admin@prajaraksha.gov.in" },
      update: {},
      create: {
        email: "admin@prajaraksha.gov.in",
        password: "adminprajaraksha",
        name: "State Admin Central",
        role: "ADMIN",
      },
    });

    // Create Developer
    await prisma.user.upsert({
      where: { email: "dev@prajaraksha.gov.in" },
      update: {},
      create: {
        email: "dev@prajaraksha.gov.in",
        password: "devprajaraksha",
        name: "Core System Architect",
        role: "DEVELOPER",
      },
    });

    // Create Custom User (Admin)
    await prisma.user.upsert({
      where: { email: "charananumula12@gmail.com" },
      update: {},
      create: {
        email: "charananumula12@gmail.com",
        password: "123456",
        name: "Charan Anumula",
        role: "ADMIN",
      },
    });

    console.log("Seed completed: Portals initialized.");
  } catch (error) {
    console.error("Seed failed:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
