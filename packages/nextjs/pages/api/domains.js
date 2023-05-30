import { PrismaClient } from "@prisma/client";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { PineconeClient } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

dotenv.config();



const prisma = new PrismaClient();

const loader = new CSVLoader("../../l.csv");

export default async function handle(req, res) {
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });



const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

const docs = await loader.load();


  const qaPairsWithConcatenatedText = await prisma.$queryRaw`
    SELECT 
      q.id, 
      q.question || ' ' || q.answer || ' ' || s."subdomainName" || ' ' || d."domainName" as concatenated_text
    FROM 
      "QAPairs" as q
    JOIN 
      "Subdomain" as s ON q."subdomainId" = s.id
    JOIN 
      "Domain" as d ON s."domainId" = d.id
  ;`;
  await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
    pineconeIndex,
  });

  res.json(docs);
}
