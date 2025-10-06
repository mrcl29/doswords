import type React from "preact/compat";

interface RandomWordProps {
  word: string | React.JSX.Element;
  onNewWord: () => void;
}

const RandomWord = ({ word, onNewWord }: RandomWordProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <button
        onClick={onNewWord}
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

      <div className="text-2xl w-full max-w-80 bg-black rounded-2xl py-4 text-white font-bold shadow-md select-none">
        {word}
      </div>
    </div>
  );
};

export default RandomWord;
