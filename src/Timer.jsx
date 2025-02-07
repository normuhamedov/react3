import { useState, useEffect } from "react";

function Timer() {
    const [inputValue, setInputValue] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let id;
        if (isRunning && timeLeft > 0) {
            id = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft <= 0) {
            setIsRunning(false);
        }

        return () => clearInterval(id);
    }, [isRunning, timeLeft]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const num = parseInt(inputValue);
        if (!isNaN(num) && num > 0) {
            setTimeLeft(num);
            setIsRunning(true);
        }
        setInputValue("");
    };

    const toggleTimer = () => {
        setIsRunning((prev) => !prev);
    };


    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(0);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Son kiriting (sekund)"
                />
                <button
                    type="submit"
                    className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Boshlash
                </button>
            </form>
            <div className="text-4xl font-bold mb-6 text-gray-700">
                Qolgan vaqt: {timeLeft} sekund
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={toggleTimer}
                    className={`p-2 text-white rounded-lg ${isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                >
                    {isRunning ? "To'xtatish" : "Davom etish"}
                </button>
                <button
                    onClick={resetTimer}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Tozalash
                </button>
            </div>
        </div>
    );
}

export default Timer;
