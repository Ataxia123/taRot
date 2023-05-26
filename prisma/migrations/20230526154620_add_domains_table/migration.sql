-- CreateTable
CREATE TABLE "Domains" (
    "id" SERIAL NOT NULL,
    "Dominio" TEXT,
    "Descripcion" TEXT,
    "Ambito" TEXT,
    "Pregunta" TEXT,
    "Respuesta" TEXT,

    CONSTRAINT "Domains_pkey" PRIMARY KEY ("id")
);
