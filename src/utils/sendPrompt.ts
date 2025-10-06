import { GENERAL_RULES, DOSWORDS_DESCRIPTION, BOT_GAME_RULES } from "../constants/constants.ts";
import callApiFreeLLM from "../api/callApiFreeLLM.ts"

const INITIAL_PROMPT = GENERAL_RULES + DOSWORDS_DESCRIPTION + BOT_GAME_RULES;
const PREVIOUS_JUDGE_WORD = "La palabra del juez es: ";
const PREVIOUS_USER_WORD = "La palabra del usuario es: ";

function createPrompt(judgeWord: string, userWord: string): string{
    return INITIAL_PROMPT + PREVIOUS_JUDGE_WORD + judgeWord + "\n" + PREVIOUS_USER_WORD + userWord;
}

export async function sendPrompt(judgeWord: string, userWord: string): Promise<{ response: string; timeout: number | undefined }> {
    const prompt = createPrompt(judgeWord, userWord);
    const { response, timeout } = await callApiFreeLLM(prompt);
    return {response, timeout}
}