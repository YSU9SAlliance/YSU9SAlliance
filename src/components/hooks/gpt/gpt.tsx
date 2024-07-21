"use server";
// 这是个 SSR 钩子，在不了解 Next.js 的 SSR 机制前请不要 Copy 这段代码
import React from "react";
import { AI } from "./actions";
import { nanoid } from "ai";

interface GptContextType {
  id: string;
}
const id = nanoid();

const context: GptContextType = {
  id,
};

export const GptProvider = ({ children }: { children: React.ReactNode }) => {
  return <AI initialAIState={{ chatId: id, messages: [] }}>{children}</AI>;
};

export const getAiContext = () => {
  return context;
};
