'use client'

import React from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import GptWindow from './drag-box'
import { IconOpenAI } from './components/icons'

const GptUiContext = React.createContext<
  { setIsOpen: (visable: boolean) => void; isOpen: boolean } | undefined
>(undefined)

export const GptUiProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <GptUiContext.Provider value={{ setIsOpen, isOpen }}>
      {children}
    </GptUiContext.Provider>
  )
}

export const useGptUiContext = () => {
  const context = React.useContext(GptUiContext)
  if (context === undefined) {
    throw new Error('useGptUiContext must be used within a GptProvider')
  }
  return context
}

const Gpt = () => {
  const ref = React.useRef(null)
  const { isOpen, setIsOpen } = useGptUiContext()
  useOnClickOutside(ref, () => {
    setIsOpen(false)
  })

  return (
    <div
      ref={ref}
      className={
        isOpen
          ? 'z-[100] fix bottom-0 right-0 h-[calc(100vh-80px)] w-[600px] transition-all duration-300 ease-in-out'
          : 'z-[100] absolute bottom-0 right-0 z-[100] flex h-8 w-8 cursor-pointer items-center justify-center rounded-tl-lg bg-primary text-primary-foreground transition-all duration-300 ease-in-out'
      }
      style={{
        position: 'fixed',
      }}
      onClick={() => setIsOpen(true)}
    >
      <div
        style={{
          visibility: isOpen ? 'visible' : 'hidden',
          opacity: isOpen ? 1 : 0,
        }}
        className="transition-all"
      >
        <GptWindow />
      </div>
      <div
        style={{
          visibility: isOpen ? 'hidden' : 'visible',
          opacity: isOpen ? 0 : 1,
        }}
      >
        <IconOpenAI className="h-4 w-4"></IconOpenAI>
      </div>
    </div>
  )
}

export default Gpt
