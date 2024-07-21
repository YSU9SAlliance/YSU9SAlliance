import React from "react";
import Draggable from "react-draggable";
import { AI } from "./actions";
import { Chat } from "./components/chat";
import { nanoid } from "ai";
import { auth } from "./auth";
import { Session } from "./interface";
import { getAiContext } from "./gpt";
import { IconOpenAI } from "./components/icons";

class GptWindow extends React.Component {
  render() {
    const { id } = getAiContext();
    const session = {
      user: {
        id: id,
        email: "",
      },
    };

    const disableWindowScroll = () => {
      window.scrollTo(0, 0);
    };
    return (
      <Draggable
        onDrag={(e) => {
          e.preventDefault();
          e.stopPropagation();
          window.removeEventListener("scroll", disableWindowScroll);
          window.addEventListener("scroll", disableWindowScroll);
        }}
        onStop={() => {
          window.removeEventListener("scroll", disableWindowScroll);
        }}
        handle="strong"
      >
        <div
          style={{ height: "calc(100vh - 80px)" }}
          className="w-[600px] shadow-xl border absolute right-[16px] bottom-[16px]  overflow-hidden rounded-lg bg-background/80 backdrop-blur z-[100] dark:bg-background/60"
        >
          <strong className="cursor-move">
            <div className="text-lg font-bold p-4 flex flex-row items-center gap-2">
              <IconOpenAI />
              <div>GPT 助手</div>
            </div>
          </strong>
          <div>
            <Chat id={id} session={session} missingKeys={[]} />
          </div>
        </div>
      </Draggable>
    );
  }
}

export default GptWindow;
