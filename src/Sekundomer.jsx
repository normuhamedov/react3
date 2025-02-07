import { useState, useEffect } from "react";

function Sekundomer() {
  const [num, setNum] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {

    let id;
    if (isRunning) {
      id = setInterval(() => {
        setNum((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(id);
    };
  }, [isRunning]);

  const startSekundomer = () => {
    setIsRunning(true);
  };

  const stopSekundomer = () => {
    setIsRunning(false);
  };

  const resetSekundomer = () => {
    setIsRunning(false);
    setNum(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-4xl font-bold mb-6 text-gray-700">
        Sekundomer: {num}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={startSekundomer}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Boshlash
        </button>
        <button
          onClick={stopSekundomer}
          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          To'xtatish
        </button>
        <button
          onClick={resetSekundomer}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Tozalash
        </button>
      </div>
    </div>
  );
}

export default Sekundomer;
