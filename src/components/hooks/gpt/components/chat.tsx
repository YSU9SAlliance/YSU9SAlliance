'use client'

import { cn } from '@/lib/utils'
import { ChatList } from './chat-list'
import { ChatPanel } from './chat-panel'
import { EmptyScreen } from './empty-screen'
import { useEffect, useState } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { Message, Session } from '../interface'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useScrollAnchor } from '../../use-scroll-anchor'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: Session
  missingKeys: string[]
}

export function Chat({ id, className, session, missingKeys }: ChatProps) {
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  return (
    <div className="group w-full" ref={scrollRef}>
      <ScrollArea style={{ height: 'calc(100vh - 240px)' }} ref={messagesRef}>
        {messages.length ? (
          <ChatList messages={messages} isShared={false} session={session} />
        ) : (
          <EmptyScreen />
        )}
        <div className="h-8 w-full" ref={visibilityRef} />
      </ScrollArea>
      <ChatPanel
        id={id}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  )
}
