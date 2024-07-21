"use client";

import * as React from "react";

import { useActions, useUIState } from "ai/rsc";

import { UserMessage } from "./stocks/message";
import { type AI } from "../actions";
import { nanoid } from "nanoid";
import { Textarea } from "@/components/ui/textarea";
import { useEnterSubmit } from "../../use-enter-submit";

export function PromptForm({
  input,
  setInput,
}: {
  input: string;
  setInput: (value: string) => void;
}) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const { submitUserMessage } = useActions();
  const [_, setMessages] = useUIState<typeof AI>();

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault();

        const value = input.trim();
        setInput("");
        if (!value) return;

        // Optimistically add user message UI
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <UserMessage>{value}</UserMessage>,
          },
        ]);

        // Submit and get response message
        const responseMessage = await submitUserMessage(value);
        setMessages((currentMessages) => [...currentMessages, responseMessage]);
      }}
    >
      <Textarea
        ref={inputRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        placeholder="给 GPT 发消息...当超出它能力范围时，他会给广亮发消息"
        className="w-full resize-none bg-transparent px-4 focus-within:outline-none sm:text-sm"
        autoFocus
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        name="message"
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
}
