import { useState } from "preact/hooks";
import { getRandomWord } from "../utils/randomWord";

const RandomWord = () => {
  const [word, setWord] = useState(getRandomWord());

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <button
        onClick={() => setWord(getRandomWord())}
        className="
          px-4 py-2 
          bg-green-600 text-white font-semibold 
          rounded-full shadow-md 
          hover:bg-green-700 
          active:scale-95
          transition
          cursor-pointer
          hover:scale-105
          duration-300
        "
      >
        Nueva Palabra
      </button>

      <div className="text-2xl w-full max-w-80 bg-black rounded-full p-2 text-white font-bold shadow-md select-none">{word}</div>
    </div>
  );
};

export default RandomWord;
