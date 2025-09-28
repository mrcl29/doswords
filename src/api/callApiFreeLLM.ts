import callApi from "./callApi";
import getFullPrompt from "../utils/prompt";

interface Result {
  response: string;
  timeout?: number;
}

const URL = "https://apifreellm.com/api/chat";

export default async function callApiFreeLLM(message: string): Promise<Result> {
  if (!message.trim()) return { response: "" };

  const fullPrompt: string = getFullPrompt(message)

  const res = await callApi(URL, { body: { message: fullPrompt } });

  if (!res.success || !res.data || !res.data.status) {
    return { response: "" };
  }

  const { status, response: apiResponse, retry_after } = res.data;

  switch (status) {
    case "success":
      return { response: apiResponse || "" };
    case "rate_limited":
      return { response: "", timeout: typeof retry_after === "number" ? retry_after : 5 };
    default:
      return { response: "" };
  }
}
