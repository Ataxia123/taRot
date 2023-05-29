import { PrismaClient } from '@prisma/client';
import xlsx from 'xlsx';

const prisma = new PrismaClient();

const workbook = xlsx.readFile('path_to_your_file.xls');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(worksheet, { raw: false });

data.forEach(async (row) => {
  await prisma.domain.create({
    data: {
      Dominio: row.Dominio,
      Descripcion: row.Descripcion,
      Ambito: row.Ambito,
      Pregunta: row.Pregunta,
      Respuesta: row.Respuesta,
    },
  });
});
