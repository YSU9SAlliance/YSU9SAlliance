"use client";
import * as React from "react";
import { PromptForm } from "./prompt-form";

export interface ChatPanelProps {
  id?: string;
  title?: string;
  input: string;
  setInput: (value: string) => void;
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
}: ChatPanelProps) {
  return (
    <div className="">
      <div className="">
        <div className="m-4 mb-0 mt-5">
          <PromptForm input={input} setInput={setInput} />
        </div>
      </div>
    </div>
  );
}
