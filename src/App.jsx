import { useEffect, useState } from "react";
import axios from "axios";

import QuizContainer from "./components/QuizContainer.jsx";

function App() {
  const API_URL = "https://opentdb.com/api.php?amount=50&category=18";
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function fetch() {
      let success = false;

      while (!success) {
        try {
          const response = await axios.get(API_URL);
          setData(response.data);
          success = true;
        } catch (err) {
          console.error("Fetching Error:", err);

          if(err.response && err.response.status === 429) {
            console.log("Too many requests. Waiting...");
            await delay(5000);
          } else {
            break;
          }
        }
      }
      setLoading(false);
    }

    fetch();
  }, []);



  function getQuestions() {
    const questions = Object.values(data.results);

    for(let i = questions.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[randomIndex]] = [questions[randomIndex], questions[i]];
    }

    setQuestions(questions.slice(0, 10));

  }


  return (
    <>
      {loading ? <p className="h-screen flex justify-center items-center text-6xl font-semibold">Loading...</p> : 
      <div className="flex flex-col items-center">
        <h1 className="text-3xl">PC Trivia Quiz</h1>
        {!questions.length && <button onClick={getQuestions} className="bg-slate-400 py-2 px-4 m-4 rounded text-cyan-100 hover:bg-slate-400/80">
            Get Questions
        </button>}
        {questions.length > 0 && <QuizContainer data={questions} />}
      </div>}
    </>
  );
}

export default App;