import { BeatLoader } from "react-spinners";
import BotResponse from "./BotResponse";

interface ChatWindowProps {
  loading: boolean;
  message: string;
  initialMessage?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  loading,
  message,
  initialMessage = "Escríbe una palabra relacionada para empezar el juego...",
}) => {
  if (loading) return <BeatLoader />;
  if (!message)
    return (
      <p className="text-base sm:text-base md:text-2xl lg:text-3xl font-semibold text-black">
        {initialMessage}
      </p>
    );

  return <BotResponse message={message} />;
};

export default ChatWindow;
