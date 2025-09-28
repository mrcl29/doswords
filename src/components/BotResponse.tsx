interface BotResponseProps {
  message?: string;
}

const BotResponse: React.FC<BotResponseProps> = ({ message = "" }) => {
  if (!message.trim()) return null; // No renderiza nada si está vacío

  return (
    <div className="flex flex-col gap-2 w-full max-w-3xl">
      <div className="flex justify-start p-2 bg-gray-100 rounded-lg">
        {message}
      </div>
    </div>
  );
};

export default BotResponse;
