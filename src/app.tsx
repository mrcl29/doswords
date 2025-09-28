import "./app.css";
import { useState } from "preact/hooks";
import ChatWindow from "./components/ChatWindow.tsx";
import ChatInput from "./components/ChatInput.tsx";
// import { getSessionId } from "./utils/session.ts";
import callApiFreeLLM from "./api/callApiFreeLLM.ts";
import { timeoutTime } from "./constants/constants.ts";

interface BotState {
  message: string;
  loading: boolean;
  disabled: boolean;
}

export function App() {
  const [botState, setBotState] = useState<BotState>({
    message: "",
    loading: false,
    disabled: false,
  });

  // const [sessionId, setSessionId] = useState<string>("");

  // useEffect(() => {
  //   const id = getSessionId();
  //   setSessionId(id);
  // }, []);

  const wait = (timeout = timeoutTime) => {
    setTimeout(() => {
      setBotState((prev) => ({
        ...prev,
        disabled: false,
      }));
    }, timeout);
  };

  const handleSend = async (msg: string) => {
    if (!msg.trim()) return;

    setBotState({ message: "", loading: true, disabled: true });

    const { response, timeout } = await callApiFreeLLM(msg);
    setBotState((prev) => ({
      ...prev,
      loading: false,
    }));
    wait();

    if (response)
      setBotState((prev) => ({
        ...prev, // conserva los demás campos
        message: response, // actualiza solo 'message'
      }));
    else if (timeout) wait(timeout * 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-screen p-4 overflow-hidden">
      <ChatWindow loading={botState.loading} message={botState.message} />
      <ChatInput onSend={handleSend} disabled={botState.disabled} />
    </div>
  );
}

export default App;
