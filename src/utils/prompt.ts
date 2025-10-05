// import llmRules from "../constants/llmRules";

export default function getFullPrompt(message: string){
    return `\n\n***MENSAJE DEL USUARIO:***\n${message}`;
}