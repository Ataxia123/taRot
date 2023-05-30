/*
  Warnings:

  - You are about to drop the `domains` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "domains";

-- CreateTable
CREATE TABLE "Domain" (
    "id" SERIAL NOT NULL,
    "domainName" VARCHAR(255) NOT NULL,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subdomain" (
    "id" SERIAL NOT NULL,
    "subdomainName" VARCHAR(255) NOT NULL,
    "domainId" INTEGER NOT NULL,

    CONSTRAINT "Subdomain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QAPairs" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR(255) NOT NULL,
    "answer" VARCHAR(255) NOT NULL,
    "subdomainId" INTEGER NOT NULL,

    CONSTRAINT "QAPairs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subdomain" ADD CONSTRAINT "Subdomain_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QAPairs" ADD CONSTRAINT "QAPairs_subdomainId_fkey" FOREIGN KEY ("subdomainId") REFERENCES "Subdomain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
