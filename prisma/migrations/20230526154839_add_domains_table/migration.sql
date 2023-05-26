/*
  Warnings:

  - You are about to drop the `Domains` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Domains";

-- CreateTable
CREATE TABLE "domains" (
    "id" SERIAL NOT NULL,
    "Dominio" TEXT,
    "Descripcion" TEXT,
    "Ambito" TEXT,
    "Pregunta" TEXT,
    "Respuesta" TEXT,

    CONSTRAINT "domains_pkey" PRIMARY KEY ("id")
);
