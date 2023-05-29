// pages/api/users.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const domains = await prisma.domain.findMany();
    res.json(domains);
}
