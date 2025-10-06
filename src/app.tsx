import "./app.css";
import { useState, useEffect } from "preact/hooks";
import { BeatLoader } from "react-spinners";
import ChatWindow from "./components/ChatWindow.tsx";
import ChatInput from "./components/ChatInput.tsx";
import RandomWord from "./components/RandomWord.tsx";
import WordLabel from "./components/WordLabel.tsx";
import { sendPrompt } from "./utils/sendPrompt.ts";
import { TIMEOUT_TIME } from "./constants/constants.ts";
import { getRandomWord } from "./utils/randomWord";

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

  const [judgeWord, setJudgeWord] = useState<string>("");
  const [oldJudgeWord, setOldJudgeWord] = useState<string>(judgeWord);
  const [userWord, setUserWord] = useState<string>("");

  const [loadingWord, setLoadingWord] = useState(true);

  useEffect(() => {
    const loadWord = async () => {
      setLoadingWord(true);
      const newWord = await getRandomWord();
      setJudgeWord(newWord);
      setLoadingWord(false);
    };
    loadWord();
    console.log(judgeWord);
  }, []);

  const wait = (timeout = TIMEOUT_TIME) => {
    setTimeout(() => {
      setBotState((prev) => ({
        ...prev,
        disabled: false,
      }));
    }, timeout);
  };

  const handleSend = async (userWord: string) => {
    if (!userWord.trim()) return;

    setBotState({ message: "", loading: true, disabled: true });
    setUserWord(userWord);
    setOldJudgeWord(judgeWord);

    const { response, timeout } = await sendPrompt(judgeWord, userWord);

    setBotState((prev) => ({
      ...prev,
      loading: false,
    }));
    wait();

    if (response) {
      setBotState((prev) => ({
        ...prev,
        message: response,
      }));
    } else if (timeout) wait(timeout * 1000);
  };

  return (
    <div className="flex flex-col items-center justify-start gap-23 sm:gap-25 md:gap-40 lg:gap-40 w-full h-screen p-4 overflow-hidden">
      {/* Agrupamos RandomWord y Label sin gap extra */}
      <div className="flex flex-col items-center w-full gap-10">
        <RandomWord
          word={loadingWord ? <BeatLoader color="white" /> : judgeWord}
          onNewWord={() => {
            getRandomWord().then((newWord) => setJudgeWord(newWord));
          }}
        />
        <WordLabel judgeWord={oldJudgeWord} userWord={userWord} />
      </div>

      <ChatWindow loading={botState.loading} message={botState.message} />
      <ChatInput onSend={handleSend} disabled={botState.disabled} />
    </div>
  );
}

export default App;
