import { VFile } from 'vfile'
import { evaluate } from '@mdx-js/mdx'
// @ts-expect-error: untyped.
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { useForceUpdate } from 'framer-motion'
import { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react'
import { create } from 'zustand'

const useAskAiContent = create((set) => ({
  content: ``,
  addContent: (newContent: string) =>
    set((state: any) => ({ content: state.content + newContent })),
}))

// 用模块闭包做 store 使用
const gptProxyUrl = 'https://tjp5cmmucg.us.aircode.run/hello'
export default function useAskAi(
  onChatingChange: (isChating: boolean) => void,
) {
  //@ts-ignore
  let { content, addContent } = useAskAiContent()
  // 创建虚拟文件，用于 MDX 编译
  const file = new VFile({ basename: 'example.mdx', value: content })
  const resultRef: MutableRefObject<null | ReactNode> = useRef(null)
  const [rerender] = useForceUpdate()

  // 因为需要客户端异步渲染，content 更改进行强制渲染
  useEffect(() => {
    setTimeout(async () => {
      // MDX 使用 React Runtime 编译为 JSX，获得 React 组件
      const { default: Result } = await evaluate(file, { Fragment, jsx, jsxs })
      resultRef.current = <Result />
      rerender()
    }, 0)
  }, [content])

  const fetchGpt = (question: string) => {
    addContent(`## ${question}\n`)
    onChatingChange(true)
    fetch(gptProxyUrl, {
      body: JSON.stringify({ question }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          onChatingChange(false)
          throw new Error('请求 GPT 时网络出现问题')
        }

        // 获取可读取的流
        const reader = response?.body?.getReader()

        // 创建一个函数来逐步读取数据
        // @ts-ignore
        function readStream() {
          return reader?.read().then(({ done, value }) => {
            if (done) {
              onChatingChange(false)
              addContent(`\n`)

              return
            }
            // 处理每次读取到的数据
            const newAnswer = new TextDecoder()
              .decode(value)
              .split('data: ')
              .filter(
                (item) => item && item.indexOf('[DONE]') !== 0 && item.trim(),
              )
              .map(
                // 没有对 OPEN AI API 的复杂返回进行过多解析
                (item) => {
                  if (JSON.parse(item)?.error) {
                    addContent(
                      '抱歉，GPT 内部故障，可以去看看 https://status.openai.com/ \n',
                    )
                    throw new Error(JSON.parse(item)?.error)
                  }
                  return JSON.parse(item)?.['choices']?.[0]?.['delta']?.[
                    'content'
                  ]
                },
              )
              .reduce((prev, curr) => {
                return curr !== undefined ? `${prev}${curr}` : prev
              }, '')
            addContent(newAnswer)
            // 继续读取下一块数据
            return readStream()
          })
        }

        return readStream()
      })
      .catch((error) => {
        onChatingChange(false)
        console.error('请求 GPT 时出现错误:', error)
      })
  }

  return {
    AskAi: () => resultRef.current,
    ask: fetchGpt,
  }
}
