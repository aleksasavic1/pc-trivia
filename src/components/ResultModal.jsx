import Button from "./Button.jsx";

function ResultModal({corrAnsw, onRestart}) {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 text-center">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-700/60 p-6 rounded-lg shadow-lg z-60 max-w-lg w-full">
                <h1 className="text-2xl">Result:</h1>
                <p className="text-7xl my-4">{corrAnsw}</p>
                <Button onClick={onRestart}>Restart</Button>
            </div>
        </div>
    );
}

export default ResultModal;