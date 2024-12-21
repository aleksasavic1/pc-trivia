import { useEffect, useState } from "react";
import axios from "axios";

import QuizContainer from "./components/QuizContainer.jsx";
import Button from "./components/Button.jsx";


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


  function handleRestart() {
    setQuestions([]);
    getQuestions();
  }


  return (
    <>
      {loading ? <p className="h-screen flex justify-center items-center text-6xl font-semibold">Loading...</p> : 
      <div className="flex flex-col items-center mt-6">
        <h1 className="text-3xl my-6 font-semibold">PC Trivia Quiz</h1>
        {!questions.length && <Button onClick={getQuestions}>
            Start Quiz
        </Button>}
        {questions.length > 0 && <QuizContainer data={questions} questions={handleRestart} />}
      </div>}
    </>
  );
}

export default App;