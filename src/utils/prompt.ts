import llmRules from "../constants/llmRules";

export default function getFullPrompt(message: string){
    return `${llmRules}\n\n***MENSAJE DEL USUARIO:***\n${message}`;
}