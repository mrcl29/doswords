let cache: string[] | null = null;

/**
 * Carga el diccionario desde /public/diccionario.json solo una vez.
 */
async function loadDictionary(): Promise<string[]> {
  if (cache) return cache;

  try {
    const response = await fetch('/words-es.json');
    if (!response.ok) throw new Error(`Error ${response.status} al cargar el diccionario`);

    cache = await response.json();
    return cache ?? [];
  } catch (err) {
    console.error('No se pudo cargar el diccionario:', err);
    return [];
  }
}

/**
 * Devuelve una palabra aleatoria del diccionario.
 */
export async function getRandomWord(): Promise<string> {
  const dictionary = await loadDictionary();
  console.log(dictionary)
  return getRandomElement(dictionary) ?? '';
}

/**
 * Selecciona un elemento aleatorio de un array.
 */
function getRandomElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
