import { useImperativeHandle, useRef, forwardRef } from "react";
import { createPortal } from "react-dom";

import Button from "./Button.jsx";

const ResultModal = forwardRef(function ResultModal({corrAnsw, onRestart}, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                dialog.current.showModal();
            },

            close: () => {
                dialog.current.close();
            },
        }
    });

    return createPortal(
        <dialog className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 text-center" ref={dialog}>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-700/60 p-6 rounded-lg shadow-lg z-60 max-w-lg w-full text-white">
                <h1 className="text-2xl">Result:</h1>
                <p className="text-7xl mt-4 font-semibold text-teal-200">{((corrAnsw/10)*100)}%</p>
                <p className="text-lg mb-4 text-teal-300/90">{corrAnsw}/10</p>
                <Button onClick={onRestart}>Restart</Button>
            </div>
        </dialog>,

        document.querySelector("#modal")
    );
});

export default ResultModal;