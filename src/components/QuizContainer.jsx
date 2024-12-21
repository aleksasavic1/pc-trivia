import { useState, useMemo } from "react";

function QuizContainer({ data }) {
    const [index, setIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [error, setError] = useState("");



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


    return (
        <div className="w-6/12 p-4 bg-slate-900/80 rounded-md">
            <h1 className="text-center text-xl">{decodeHTML(data[index].question)}</h1>
            {data[index].type === "multiple" ? <div className="flex justify-center">
                <div className="flex flex-col">
                    <label className="text-lg">
                        <input type="radio" 
                            name="question" 
                            value={answers[0]}
                            checked={selectedOption === answers[0]}
                            onChange={handleOptionChange} />
                        {decodeHTML(answers[0])}
                    </label>
                    <label className="text-lg">
                        <input type="radio" 
                            name="question" 
                            value={answers[1]}
                            checked={selectedOption === answers[1]}
                            onChange={handleOptionChange} />
                        {decodeHTML(answers[1])}
                    </label>
                    <label className="text-lg">
                        <input type="radio" 
                            name="question" 
                            value={answers[2]}
                            checked={selectedOption === answers[2]}
                            onChange={handleOptionChange} />
                        {decodeHTML(answers[2])}
                    </label>
                    <label className="text-lg">
                        <input type="radio" 
                            name="question" 
                            value={answers[3]} 
                            checked={selectedOption === answers[3]}
                            onChange={handleOptionChange} />
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
                            onChange={handleOptionChange} />
                        {answers[0]}
                    </label>
                    <label className="text-lg">
                        <input type="radio" 
                            name="question" 
                            value={answers[1]}
                            checked={selectedOption === answers[1]}
                            onChange={handleOptionChange} />
                        {answers[1]}
                    </label>
                </div>
            </div>}
            
            <div className="text-right">
                {index < 9 ? <button onClick={handleNextQuestion} className="bg-slate-400 py-2 px-4 rounded text-cyan-100 hover:bg-slate-400/80">Next</button> : 
                <button className="bg-slate-400 py-2 px-4 rounded text-cyan-100 hover:bg-slate-400/80">Show Result</button>}
            </div>
            
            {error && <p className="text-red-500 text-center">{error}</p>}
            {/* <p>Result: {correctAnswers}</p> */}
        </div>
    );
}

export default QuizContainer;