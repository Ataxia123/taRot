// prisma/seed.js

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'alice@example.com',
            // other fields...
        },
    });

    await prisma.user.create({
        data: {
            name: 'Bob',
            email: 'bob@example.com',
            // other fields...
        },
    });

    // Add more data here...
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
