'use client'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import useAskAi from './hooks/askAi'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function Basic() {
  const [fetching, setFetching] = useState(false)
  const [question, setQuestion] = useState(``)
  const { AskAi, ask } = useAskAi((isChating) => setFetching(isChating))
  const themeName = useTheme().resolvedTheme === 'dark' ? 'dark' : 'light'
  const [isComposing, setIsComposing] = useState(false)
  const handleComposition = (event: React.CompositionEvent) => {
    if (event.type === 'compositionend') {
      // composition结束，更新状态
      setIsComposing(false)
    } else {
      // composition开始，更新状态
      setIsComposing(true)
    }
  }

  return (
    <div>
      <AskAi />
      <div className="flex gap-2">
        <TextField
          onCompositionStart={handleComposition}
          onCompositionEnd={handleComposition}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isComposing) {
              setQuestion('')
              ask(question)
            }
          }}
          value={question}
          className="w-full"
          size="small"
        ></TextField>
        <Button
          className="w-11 min-w-0 p-0"
          variant="contained"
          onClick={() => {
            setQuestion('')
            question.length > 5000 && ask(question)
          }}
          disabled={fetching || question.length > 5000 || !question}
        >
          ➤
        </Button>
      </div>
      {question.length > 5000 && (
        <>
          抱歉，单个问题最长 5000 字符，如有需求可以参考&nbsp;
          <a
            target="_blank"
            href="https://z57ak931n0.feishu.cn/docx/PxJld32t6oLfvkxEIUPcGcoznSb?from=from_copylink"
          >
            GPT 注册升级教程
          </a>
          ，花不上 200 块，自己搞一个无限问的 GPT-4
        </>
      )}
    </div>
  )
}
