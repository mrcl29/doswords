import { BeatLoader } from "react-spinners";
import BotResponse from "./BotResponse";

interface ChatWindowProps {
  loading: boolean;
  message: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ loading, message }) => {
  if (loading) return <BeatLoader />;
  if (!message) return null;

  return <BotResponse message={message} />;
};

export default ChatWindow;
