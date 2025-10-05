import { BeatLoader } from "react-spinners";
import BotResponse from "./BotResponse";

interface ChatWindowProps {
  loading: boolean;
  message: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ loading, message }) => {
  if (loading) return <BeatLoader />;
  if (!message) return <p className="text-3xl font-semibold text-black">Escríbe una palabra relacionada para empezar el juego</p>;

  return <BotResponse message={message} />;
};

export default ChatWindow;
