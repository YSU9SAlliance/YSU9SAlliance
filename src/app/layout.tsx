import glob from 'fast-glob'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import { type Metadata } from 'next'
import { type Section } from '@/components/SectionProvider'
import { GptProvider } from '@/components/hooks/gpt'
import Gpt, { GptUiProvider } from '@/components/hooks/gpt/gpt-component'
import { ServerProviders } from './server-providers'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let pages = await glob('**/*.mdx', { cwd: 'src/app' })
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ]),
  )) as Array<[string, Array<Section>]>
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <ServerProviders>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
          <Providers>
            <GptUiProvider>
              <Gpt />
              <div className="w-full">
                <Layout allSections={allSections}>{children}</Layout>
              </div>
            </GptUiProvider>
          </Providers>
        </body>
      </html>
    </ServerProviders>
  )
}
