// prismaClient.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;

// Optionally, close the Prisma Client connection when the application exits
if (process.env.NODE_ENV !== "production") {
  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}
