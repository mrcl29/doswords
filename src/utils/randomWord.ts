import { DICCIONARIO } from "../constants/diccionario";

export function getRandomWord(): string {
  const element = getRandomElement(DICCIONARIO);
  return element ? element : "";
}

function getRandomElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined; // evita error si el array está vacío
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
