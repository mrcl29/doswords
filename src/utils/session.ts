export function getSessionId(): string {
  const key = "sessionId";
  let sessionId = localStorage.getItem(key);
  if (!sessionId) {
    // Genera un UUID simple (v4)
    sessionId = getUUID();
    localStorage.setItem(key, sessionId);
  }
  return sessionId;
}

function getUUID() {
  if ("randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // fallback
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
