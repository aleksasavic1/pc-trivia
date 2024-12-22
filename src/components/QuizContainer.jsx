import { useState, useMemo, useRef } from "react";

import ResultModal from "./ResultModal.jsx";
import Button from "./Button.jsx";

function QuizContainer({ data, questions }) {
    const [index, setIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [error, setError] = useState("");

    const modal = useRef();



    function handleNextQuestion() {
        if(!selectedOption) {
            setError("Please select an option before proceeding.");
            return;
        }
        setError("");

        if(data[index].correct_answer === selectedOption) {
            setCorrectAnswers(correctAnswers + 1);
        }

        if(index < data.length - 1) {
            setIndex(index + 1);
            setSelectedOption("");
        }
    }

    function handleOptionChange(e) {
        setSelectedOption(e.target.value);
    }


    const answers = useMemo(() => {
        return [
            ...data[index].incorrect_answers,
            data[index].correct_answer
        ].sort(() => Math.random() - 0.5);
    }, [index, data]);


    function decodeHTML(input) {
        let doc = new DOMParser().parseFromString(input, 'text/html');
        return doc.documentElement.textContent;
    }


    function handleShowResultClick() {
        if(!selectedOption) {
            setError("Please select an option before proceeding.");
            return;
        }
        setError("");

        if(data[index].correct_answer === selectedOption) {
            setCorrectAnswers(correctAnswers + 1);
        }

        if(index < data.length - 1) {
            setIndex(index + 1);
            setSelectedOption("");
        }

        modal.current.open();
    }


    function handleRestart() {
        setIndex(0);
        setSelectedOption("");
        setCorrectAnswers(0);
        setError("");
        modal.current.close();
        questions();
    }

    return (
        <div className="w-6/12 p-4 bg-slate-900/80 rounded-md my-2 max-sm:w-screen">
            <h1 className="text-center text-xl mb-3 font-semibold">{index+1}. {decodeHTML(data[index].question)}</h1>
            {data[index].type === "multiple" ? <div className="flex justify-center">
                <div className="flex flex-col">
                    <label className="text-lg">
                        <input type="radio" 
                            name="question" 
                            value={answers[0]}
                            checked={selectedOption === answers[0]}
                            onChange={handleOptionChange} 
                            className="mr-2 my-2" />
                        {decodeHTML(answers[0])}
                    </label>
                    <label className="text-lg">
                        <input type="radio" 
                            name="question" 
                            value={answers[1]}
                            checked={selectedOption === answers[1]}
                            onChange={handleOptionChange} 
                            className="mr-2 my-2" />
                        {decodeHTML(answers[1])}
                    </label>
                    <label className="text-lg">
                        <input type="radio" 
                            name="question" 
                            value={answers[2]}
                            checked={selectedOption === answers[2]}
                            onChange={handleOptionChange} 
                            className="mr-2 my-2" />
                        {decodeHTML(answers[2])}
                    </label>
                    <label className="text-lg">
                        <input type="radio" 
                            name="question" 
                            value={answers[3]} 
                            checked={selectedOption === answers[3]}
                            onChange={handleOptionChange} 
                            className="mr-2 my-2" />
                        {decodeHTML(answers[3])}
                    </label>
                </div>
            </div> : <div className="flex justify-center">
                <div className="flex flex-col">
                    <label className="text-lg">
                        <input type="radio" 
                            name="question" 
                            value={answers[0]}
                            checked={selectedOption === answers[0]}
                            onChange={handleOptionChange} 
                            className="mr-2 my-2" />
                        {answers[0]}
                    </label>
                    <label className="text-lg">
                        <input type="radio" 
                            name="question" 
                            value={answers[1]}
                            checked={selectedOption === answers[1]}
                            onChange={handleOptionChange} 
                            className="mr-2 my-2" />
                        {answers[1]}
                    </label>
                </div>
            </div>}
            
            <div className="text-right">
                {index < 9 ? <button onClick={handleNextQuestion} className="bg-slate-400 py-2 px-4 rounded text-cyan-100 hover:bg-slate-400/80">Next</button> : 
                <Button onClick={handleShowResultClick}>Show Result</Button>}
            </div>
            
            {error && <p className="text-red-500 text-center my-2">{error}</p>}

            <ResultModal corrAnsw={correctAnswers} onRestart={handleRestart} ref={modal} />
        </div>
    );
}

export default QuizContainer;