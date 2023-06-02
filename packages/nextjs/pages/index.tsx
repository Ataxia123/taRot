import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
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
  const [responseLanguage, setResponseLanguage] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [queryResult, setQueryResult] = useState<any>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: formQuestion, language: responseLanguage }),
    })
      .then(response => response.json())
      .then(data => {
        setQueryResult(data);
        setTrigger(true);
      });
  };
  console.log(queryResult);

  return (
    <>
      <Head>
        <title>Scaffold-ETH 2 App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
      </Head>
      <Image
        src="/assets/frame.png"
        alt="8ball"
        width={2400}
        height={1500}
        style={{
          marginLeft: "-0%",
          marginTop: "-10%",
          width: "110%",
          position: "absolute",
          height: "150%",
          overflow: "hidden",
        }}
      />
      <div
        style={{
          width: "60%",
          marginLeft: "20%",
          zIndex: 1,
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            marginLeft: "23%",
            marginTop: "61%",
            position: "absolute",
          }}
        >
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
          <br />
          <label htmlFor="query">Language:</label>
          <input
            type="text"
            id="language"
            name="language"
            style={{
              width: "60%",
              border: "10px solid black",
              color: "black",
            }}
            value={responseLanguage}
            onChange={event => setResponseLanguage(event.target.value)}
          />
          <br />
          <button
            type="submit"
            style={{
              width: "60%",
              backdropFilter: "blur(10px)",
              border: "10px solid black",
              color: "black",
              marginLeft: "22%",
            }}
          >
            Submit
          </button>
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
          <Eightballjs response={queryResult ? queryResult.text : "Thinking"} trigger={trigger} />
        </div>
      </div>
    </>
  );
};
export default Home;
