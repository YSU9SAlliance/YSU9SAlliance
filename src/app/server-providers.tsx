import { GptProvider } from '@/components/hooks/gpt'

export async function ServerProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return <GptProvider>{children}</GptProvider>
}
