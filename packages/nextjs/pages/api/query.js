import { PineconeClient } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

dotenv.config();

const client = new PineconeClient();
export default async function handle(req, res) {

const question = req.body.question;
const language = req.body.language;

await client.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});
const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

const vectorStore = await PineconeStore.fromExistingIndex(
  new OpenAIEmbeddings(),
  { pineconeIndex }
);


/* Use as part of a chain (currently no metadata filters) */
const model = new OpenAI();
const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
  k: 1,
  returnSourceDocuments: true,
});
const response = await chain.call({ query: `"Eres un oraculo y revelas los misterios del universo. 
utiliza lenguaje misterioso para responder a las preguntas. Responde en ${language}. Tan solo puedes usar 7 palabras 
para tu respuesta. Divide tu respuesta en dos partes, Separalas con este caracter: "<('.')>" entre las opciones.
Pregunta: ${question}?"` });

console.log(response);
res.json(response);
/*
{
  text: ' A pinecone is the woody fruiting body of a pine tree.',
  sourceDocuments: [
    Document {
      pageContent: 'pinecones are the woody fruiting body and of a pine tree',
      metadata: [Object]
    }
  ]
}
*/
}