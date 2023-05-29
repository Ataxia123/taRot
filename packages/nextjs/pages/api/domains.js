import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const domains = await prisma.Domain.findMany();
  res.json(domains);
}
