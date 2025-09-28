import React from "react";
import { useState, useRef, useEffect } from "preact/hooks";
import { FiSend } from "react-icons/fi";
import { MAX_CHARS, MAX_LINES } from "../constants/constants.ts";

interface ChatInputProps {
  placeholder?: string;
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  placeholder = "Escribe un mensaje...",
  onSend,
  disabled = false,
}) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineCount, setLineCount] = useState(1);

  // Ajustar altura dinámicamente
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const lineHeight = parseInt(
        window.getComputedStyle(textareaRef.current).lineHeight || "20"
      );
      const newLineCount = Math.min(
        MAX_LINES,
        Math.floor(textareaRef.current.scrollHeight / lineHeight)
      );
      setLineCount(newLineCount);
      textareaRef.current.style.height = `${newLineCount * lineHeight}px`;
    }
  }, [message]);

  const sendMessage = () => {
    if (!disabled && message.trim().length > 0) {
      onSend(message);
      setMessage("");
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (disabled) return;
    const value = (e.target as HTMLTextAreaElement).value;
    setMessage(value.slice(0, MAX_CHARS));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [message, disabled]);

  useEffect(() => {
    if (!disabled && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  return (
    <div className="flex items-center justify-center w-full max-w-3xl p-2 border rounded-full bg-white gap-2 px-5">
      <div className="text-xs text-gray-500 text-right pr-3">
        {message.length}/{MAX_CHARS}
      </div>
      <textarea
        ref={textareaRef}
        value={message}
        onInput={handleInput}
        disabled={disabled}
        className="flex-[0.9] resize-none rounded-lg focus:outline-none focus:ring-0 focus:ring-white"
        placeholder={placeholder}
        rows={1}
        style={{
          overflowY: lineCount >= MAX_LINES ? "auto" : "hidden",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
        }}
      />
      <div className="flex-[0.1] flex items-center justify-end">
        <button
          className={
            `flex items-center justify-center rounded-full w-auto h-auto p-3 text-white cursor-pointer group
            ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-black"}`
          }
          disabled={disabled}
          onClick={sendMessage}
        >
          <FiSend
            className={
              disabled
                ? ""
                : "transition-transform duration-200 group-hover:scale-110"
            }
          />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
