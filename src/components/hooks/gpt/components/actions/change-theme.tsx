'use client'

import { ThemeToggle } from '@/components/ThemeToggle'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { BotMessage } from '../message'

const ChangeThemeTempComponent = () => {
  const { resolvedTheme, setTheme } = useTheme()
  console.log('resolvedTheme', resolvedTheme)
  useEffect(() => {
    resolvedTheme === 'dark' ? setTheme('light') : setTheme('dark')
  }, [])

  return <BotMessage content={'已切换'} />
}

export default ChangeThemeTempComponent
