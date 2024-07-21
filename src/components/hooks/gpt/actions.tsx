import 'server-only'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue,
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai'

import {
  spinner,
  BotCard,
  BotMessage,
  SystemMessage,
  Stock,
  Purchase,
} from './components/stocks'

import { z } from 'zod'
import { formatNumber, runAsyncFnWithoutBlocking, sleep, nanoid } from './utils'
import { SpinnerMessage, UserMessage } from './components/message'
import { Chat, Message } from './interface'
import ChangeThemeTempComponent from './components/actions/change-theme'
import FeedbackTempComponent from './components/actions/feedback'
import Lct from '@/components/lct'

async function confirmPurchase(symbol: string, price: number, amount: number) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  const purchasing = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
      <p className="mb-2">
        Purchasing {amount} ${symbol}...
      </p>
    </div>,
  )

  const systemMessage = createStreamableUI(null)

  runAsyncFnWithoutBlocking(async () => {
    await sleep(1000)

    purchasing.update(
      <div className="inline-flex items-start gap-1 md:items-center">
        {spinner}
        <p className="mb-2">
          Purchasing {amount} ${symbol}... working on it...
        </p>
      </div>,
    )

    await sleep(1000)

    purchasing.done(
      <div>
        <p className="mb-2">
          You have successfully purchased {amount} ${symbol}. Total cost:{' '}
          {formatNumber(amount * price)}
        </p>
      </div>,
    )

    systemMessage.done(
      <SystemMessage>
        You have purchased {amount} shares of {symbol} at ${price}. Total cost ={' '}
        {formatNumber(amount * price)}.
      </SystemMessage>,
    )

    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: 'system',
          content: `[User has purchased ${amount} shares of ${symbol} at ${price}. Total cost = ${
            amount * price
          }]`,
        },
      ],
    })
  })

  return {
    purchasingUI: purchasing.value,
    newMessage: {
      id: nanoid(),
      display: systemMessage.value,
    },
  }
}

process.env.OPENAI_API_KEY =
  'sk-proj-OqB4yHBkbbILIYXzfcm4T3BlbkFJF3r5vaTBFGBIKcYprABv'
process.env.AUTH_SECRET = '8b979ad69be4cd456621dc01a5a235ca'

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content,
      },
    ],
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const result = await streamUI({
    model: openai('gpt-3.5-turbo'),
    initial: <SpinnerMessage />,

    system: `\
    你有一定的代码能力，包括编写代码，对比代码，和寻找代码可能的问题

    你倾向于使用中文回答问题，遇到纯英文的问题，你默认会先将其翻译为中文再回答，并且你倾向于用计算机相关的专业词汇回答问题。

    如果用户要求你切换网站主题, call \`changeTheme\` 来切换当前站点的主题

    如果用户要求你反馈问题或使用体验，或者你遇到了你不能处理的问题，call \`feedback\` 来向作者反馈

    如果用户要求你使用 LCT 创新思考法解决问题，call \`lct\` 来回答用户
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
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content,
            },
          ],
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
    tools: {
      changeTheme: {
        description: '改变网站的主题',
        parameters: z.object({
          theme: z.string().describe('主题的名称'),
        }),
        generate: async function* ({ theme }) {
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: id,
                role: 'assistant',
                content: 'done',
              },
            ],
          })
          return <ChangeThemeTempComponent />
        },
      },
      lct: {
        description: `使用 LCT 创新思考法，将提供的事物拆分成「必要条件」「运营惯例」和「典型特征」，然后选择性将其变更乃至反转，最后组合起来形成创新方案
        `,
        parameters: z.object({
          title: z.string().describe('需要被创新思考的事物'),
          description: z.string().describe('需要被创新思考的事物的详细描述'),
          necessaryConditions: z
            .array(z.object({ title: z.string(), description: z.string() }))
            .describe('需要被创新思考的事物运作的必要条件'),
          operationalPractices: z
            .array(z.object({ title: z.string(), description: z.string() }))
            .describe('需要被创新思考的事物的运营惯例'),
          typicalFeatures: z
            .array(z.object({ title: z.string(), description: z.string() }))
            .describe('需要被创新思考的事物的典型特征'),
          innovativePlan: z
            .array(
              z.object({
                title: z.string(),
                description: z.string(),
                keypoint: z
                  .array(z.string())
                  .describe('创新方案的关键点，主要解释改变了前面的哪些要点'),
              }),
            )
            .describe('创新方案的列表'),
        }),
        generate: async function* (LCTData) {
          aiState.update({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: id,
                role: 'assistant',
                content: 'done',
              },
            ],
          })
          console.log(LCTData)
          return <Lct {...LCTData} />
        },
      },
      feedback: {
        description: '向作者反馈',
        parameters: z.object({
          content: z.string().describe('反馈内容'),
        }),
        generate: async function* ({ content }) {
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: id,
                role: 'assistant',
                content: 'done',
              },
            ],
          })
          return <FeedbackTempComponent msg={content} />
        },
      },
    },
  })

  return {
    id: nanoid(),
    display: result.value,
  }
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

const id = nanoid()
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
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter((message) => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'user' ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === 'assistant' &&
          typeof message.content === 'string' ? (
          <BotMessage content={message.content} />
        ) : null,
    }))
}
