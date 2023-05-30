import { useEffect, useState } from "react";
import Head from "next/head";
import Eightballjs from "../components/Eightballjs";
import type { NextPage } from "next";

type Domain = {
  id: number;
  concatenated_text: string;
};

const Home: NextPage = () => {
  const [data, setData] = useState<Domain[] | null>(null);
  useEffect(() => {
    fetch("/api/domains")
      .then(response => response.json())
      .then(setData);
  }, []);
  console.log(data);

  const [formQuestion, setFormQuestion] = useState("");

  const [queryResult, setQueryResult] = useState<any>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: formQuestion }),
    })
      .then(response => response.json())
      .then(data => {
        setQueryResult(data);
      });
  };
  console.log(queryResult);
  return (
    <>
      <Head>
        <title>Scaffold-ETH 2 App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
      </Head>
      <div
        style={{
          width: "60%",
          marginLeft: "20%",
        }}
      >
        <form onSubmit={handleSubmit}>
          <label htmlFor="query">Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            style={{
              width: "60%",
              border: "10px solid black",
              color: "black",
            }}
            value={formQuestion}
            onChange={event => setFormQuestion(event.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div
          className="flex items-center flex-col flex-grow pt-10"
          style={{
            width: "60%",
            border: "10px solid black",
          }}
        >
          {queryResult && <div>{queryResult.text}</div>}
          <br />
          <>{queryResult?.sourceDocuments[0].pageContent}</>
        </div>
      </div>
      <Eightballjs />
    </>
  );
};
export default Home;
