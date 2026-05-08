import { prisma } from "./prisma.js";

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (err: any) {
    console.error(`Database connection error: ${err.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

export { connectDB, disconnectDB };
