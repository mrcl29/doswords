interface WordLabelProps {
  judgeWord: string;
  userWord: string;
}

const WordLabel = ({ judgeWord, userWord }: WordLabelProps) => {
  if (!userWord) return null; // No mostrar nada si no hay palabra del usuario

  return (
    <div className="text-lg font-semibold text-center text-gray-700 bg-gray-100 rounded-xl px-4 py-2 shadow-md">
      <span className="text-green-700">Juez:</span> {judgeWord} &nbsp; | &nbsp;
      <span className="text-blue-700">Usuario:</span> {userWord}
    </div>
  );
};

export default WordLabel;
