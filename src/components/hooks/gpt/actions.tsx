import "server-only";

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue,
} from "ai/rsc";
import { openai } from "@ai-sdk/openai";

import {
  spinner,
  BotCard,
  BotMessage,
  SystemMessage,
  Stock,
  Purchase,
} from "./components/stocks";

import { z } from "zod";
import {
  formatNumber,
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid,
} from "./utils";
import { SpinnerMessage, UserMessage } from "./components/message";
import { Chat, Message } from "./interface";
import ChangeThemeTempComponent from "./components/actions/change-theme";
import FeedbackTempComponent from "./components/actions/feedback";

async function confirmPurchase(symbol: string, price: number, amount: number) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  const purchasing = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
      <p className="mb-2">
        Purchasing {amount} ${symbol}...
      </p>
    </div>
  );

  const systemMessage = createStreamableUI(null);

  runAsyncFnWithoutBlocking(async () => {
    await sleep(1000);

    purchasing.update(
      <div className="inline-flex items-start gap-1 md:items-center">
        {spinner}
        <p className="mb-2">
          Purchasing {amount} ${symbol}... working on it...
        </p>
      </div>
    );

    await sleep(1000);

    purchasing.done(
      <div>
        <p className="mb-2">
          You have successfully purchased {amount} ${symbol}. Total cost:{" "}
          {formatNumber(amount * price)}
        </p>
      </div>
    );

    systemMessage.done(
      <SystemMessage>
        You have purchased {amount} shares of {symbol} at ${price}. Total cost ={" "}
        {formatNumber(amount * price)}.
      </SystemMessage>
    );

    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: "system",
          content: `[User has purchased ${amount} shares of ${symbol} at ${price}. Total cost = ${
            amount * price
          }]`,
        },
      ],
    });
  });

  return {
    purchasingUI: purchasing.value,
    newMessage: {
      id: nanoid(),
      display: systemMessage.value,
    },
  };
}

process.env.OPENAI_API_KEY =
  "sk-proj-OqB4yHBkbbILIYXzfcm4T3BlbkFJF3r5vaTBFGBIKcYprABv";
process.env.AUTH_SECRET = "8b979ad69be4cd456621dc01a5a235ca";

async function submitUserMessage(content: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: "user",
        content,
      },
    ],
  });

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const result = await streamUI({
    
    model: openai("gpt-4-turbo",),
    initial: <SpinnerMessage />,
    system: `\
    你是一个客户端问题排查工具中内嵌的 GPT 机器人，你可以解释一些字段的含义，辅助问题排查工作。

    当前站点是一个问题排查工具，作者叫做广亮，如果使用者有添加功能的需要，你可以将这个名字介绍给对方

    你在回答问题的时候不会说「请」，不需要那么客气，并且你回答相当简洁

    你有一定的代码能力，包括编写代码，对比代码，和寻找代码可能的问题

    你倾向于使用中文回答问题，遇到纯英文的问题，你默认会先将其翻译为中文再回答，并且你倾向于用计算机相关的专业词汇回答问题。

    如果用户要求你切换网站主题, call \`changeTheme\` 来切换当前站点的主题

    如果用户要求你反馈问题或使用体验，或者你遇到了你不能处理的问题，call \`feedback\` 来向作者反馈
    `,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
      })),
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <BotMessage content={textStream.value} />;
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: "assistant",
              content,
            },
          ],
        });
      } else {
        textStream.update(delta);
      }

      return textNode;
    },
    tools: {
      changeTheme: {
        description: "改变网站的主题",
        parameters: z.object({
          theme: z.string().describe("主题的名称"),
        }),
        generate: async function* ({ theme }) {
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: id,
                role: "assistant",
                content: "done",
              },
            ],
          });
          return <ChangeThemeTempComponent />;
        },
      },
      feedback: {
        description: "向作者反馈",
        parameters: z.object({
          content: z.string().describe("反馈内容"),
        }),
        generate: async function* ({ content }) {
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: id,
                role: "assistant",
                content: "done",
              },
            ],
          });
          return <FeedbackTempComponent msg={content} />;
        },
      },
    },
    // tools: {
    //   listStocks: {
    //     description: "List three imaginary stocks that are trending.",
    //     parameters: z.object({
    //       stocks: z.array(
    //         z.object({
    //           symbol: z.string().describe("The symbol of the stock"),
    //           price: z.number().describe("The price of the stock"),
    //           delta: z.number().describe("The change in price of the stock"),
    //         })
    //       ),
    //     }),
    //     generate: async function* ({ stocks }) {
    //       yield (
    //         <BotCard>
    //           <StocksSkeleton />
    //         </BotCard>
    //       );

    //       await sleep(1000);

    //       const toolCallId = nanoid();

    //       aiState.done({
    //         ...aiState.get(),
    //         messages: [
    //           ...aiState.get().messages,
    //           {
    //             id: nanoid(),
    //             role: "assistant",
    //             content: [
    //               {
    //                 type: "tool-call",
    //                 toolName: "listStocks",
    //                 toolCallId,
    //                 args: { stocks },
    //               },
    //             ],
    //           },
    //           {
    //             id: nanoid(),
    //             role: "tool",
    //             content: [
    //               {
    //                 type: "tool-result",
    //                 toolName: "listStocks",
    //                 toolCallId,
    //                 result: stocks,
    //               },
    //             ],
    //           },
    //         ],
    //       });

    //       return (
    //         <BotCard>
    //           <Stocks props={stocks} />
    //         </BotCard>
    //       );
    //     },
    //   },
    //   showStockPrice: {
    //     description:
    //       "Get the current stock price of a given stock or currency. Use this to show the price to the user.",
    //     parameters: z.object({
    //       symbol: z
    //         .string()
    //         .describe(
    //           "The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD."
    //         ),
    //       price: z.number().describe("The price of the stock."),
    //       delta: z.number().describe("The change in price of the stock"),
    //     }),
    //     generate: async function* ({ symbol, price, delta }) {
    //       yield (
    //         <BotCard>
    //           <StockSkeleton />
    //         </BotCard>
    //       );

    //       await sleep(1000);

    //       const toolCallId = nanoid();

    //       aiState.done({
    //         ...aiState.get(),
    //         messages: [
    //           ...aiState.get().messages,
    //           {
    //             id: nanoid(),
    //             role: "assistant",
    //             content: [
    //               {
    //                 type: "tool-call",
    //                 toolName: "showStockPrice",
    //                 toolCallId,
    //                 args: { symbol, price, delta },
    //               },
    //             ],
    //           },
    //           {
    //             id: nanoid(),
    //             role: "tool",
    //             content: [
    //               {
    //                 type: "tool-result",
    //                 toolName: "showStockPrice",
    //                 toolCallId,
    //                 result: { symbol, price, delta },
    //               },
    //             ],
    //           },
    //         ],
    //       });

    //       return (
    //         <BotCard>
    //           <Stock props={{ symbol, price, delta }} />
    //         </BotCard>
    //       );
    //     },
    //   },
    //   showStockPurchase: {
    //     description:
    //       "Show price and the UI to purchase a stock or currency. Use this if the user wants to purchase a stock or currency.",
    //     parameters: z.object({
    //       symbol: z
    //         .string()
    //         .describe(
    //           "The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD."
    //         ),
    //       price: z.number().describe("The price of the stock."),
    //       numberOfShares: z
    //         .number()
    //         .describe(
    //           "The **number of shares** for a stock or currency to purchase. Can be optional if the user did not specify it."
    //         ),
    //     }),
    //     generate: async function* ({ symbol, price, numberOfShares = 100 }) {
    //       const toolCallId = nanoid();

    //       if (numberOfShares <= 0 || numberOfShares > 1000) {
    //         aiState.done({
    //           ...aiState.get(),
    //           messages: [
    //             ...aiState.get().messages,
    //             {
    //               id: nanoid(),
    //               role: "assistant",
    //               content: [
    //                 {
    //                   type: "tool-call",
    //                   toolName: "showStockPurchase",
    //                   toolCallId,
    //                   args: { symbol, price, numberOfShares },
    //                 },
    //               ],
    //             },
    //             {
    //               id: nanoid(),
    //               role: "tool",
    //               content: [
    //                 {
    //                   type: "tool-result",
    //                   toolName: "showStockPurchase",
    //                   toolCallId,
    //                   result: {
    //                     symbol,
    //                     price,
    //                     numberOfShares,
    //                     status: "expired",
    //                   },
    //                 },
    //               ],
    //             },
    //             {
    //               id: nanoid(),
    //               role: "system",
    //               content: `[User has selected an invalid amount]`,
    //             },
    //           ],
    //         });

    //         return <BotMessage content={"Invalid amount"} />;
    //       } else {
    //         aiState.done({
    //           ...aiState.get(),
    //           messages: [
    //             ...aiState.get().messages,
    //             {
    //               id: nanoid(),
    //               role: "assistant",
    //               content: [
    //                 {
    //                   type: "tool-call",
    //                   toolName: "showStockPurchase",
    //                   toolCallId,
    //                   args: { symbol, price, numberOfShares },
    //                 },
    //               ],
    //             },
    //             {
    //               id: nanoid(),
    //               role: "tool",
    //               content: [
    //                 {
    //                   type: "tool-result",
    //                   toolName: "showStockPurchase",
    //                   toolCallId,
    //                   result: {
    //                     symbol,
    //                     price,
    //                     numberOfShares,
    //                   },
    //                 },
    //               ],
    //             },
    //           ],
    //         });

    //         return (
    //           <BotCard>
    //             <Purchase
    //               props={{
    //                 numberOfShares,
    //                 symbol,
    //                 price: +price,
    //                 status: "requires_action",
    //               }}
    //             />
    //           </BotCard>
    //         );
    //       }
    //     },
    //   },
    //   getEvents: {
    //     description:
    //       "List funny imaginary events between user highlighted dates that describe stock activity.",
    //     parameters: z.object({
    //       events: z.array(
    //         z.object({
    //           date: z
    //             .string()
    //             .describe("The date of the event, in ISO-8601 format"),
    //           headline: z.string().describe("The headline of the event"),
    //           description: z.string().describe("The description of the event"),
    //         })
    //       ),
    //     }),
    //     generate: async function* ({ events }) {
    //       yield (
    //         <BotCard>
    //           <EventsSkeleton />
    //         </BotCard>
    //       );

    //       await sleep(1000);

    //       const toolCallId = nanoid();

    //       aiState.done({
    //         ...aiState.get(),
    //         messages: [
    //           ...aiState.get().messages,
    //           {
    //             id: nanoid(),
    //             role: "assistant",
    //             content: [
    //               {
    //                 type: "tool-call",
    //                 toolName: "getEvents",
    //                 toolCallId,
    //                 args: { events },
    //               },
    //             ],
    //           },
    //           {
    //             id: nanoid(),
    //             role: "tool",
    //             content: [
    //               {
    //                 type: "tool-result",
    //                 toolName: "getEvents",
    //                 toolCallId,
    //                 result: events,
    //               },
    //             ],
    //           },
    //         ],
    //       });

    //       return (
    //         <BotCard>
    //           <Events props={events} />
    //         </BotCard>
    //       );
    //     },
    //   },
    // },
  });

  return {
    id: nanoid(),
    display: result.value,
  };
}

export type AIState = {
  chatId: string;
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];

const id = nanoid();
export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    confirmPurchase,
  },
  initialUIState: [],
  initialAIState: { chatId: id, messages: [] },
  // onGetUIState: async () => {
  //   "use server";

  //   const session = await auth();

  //   if (session && session.user) {
  //     const aiState = getAIState();

  //     if (aiState) {
  //       const uiState = getUIStateFromAIState(aiState as Chat);
  //       return uiState;
  //     }
  //   } else {
  //     return;
  //   }
  // },
  // onSetAIState: async ({ state }) => {
  //   "use server";

  //   const session = await auth();

  //   if (session && session.user) {
  //     //const { chatId, messages } = state;

  //     // const createdAt = new Date();
  //     // const userId = session.user.id as string;
  //     // const path = `/chat/${chatId}`;

  //     // const firstMessageContent = messages[0].content as string;
  //     // const title = firstMessageContent.substring(0, 100);

  //     // const chat: Chat = {
  //     //   id: chatId,
  //     //   title,
  //     //   userId,
  //     //   createdAt,
  //     //   messages,
  //     //   path,
  //     // };

  //     // await saveChat(chat);
  //   } else {
  //     return;
  //   }
  // },
});

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter((message) => message.role !== "system")
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === "user" ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === "assistant" &&
          typeof message.content === "string" ? (
          <BotMessage content={message.content} />
        ) : null,
    }));
};
