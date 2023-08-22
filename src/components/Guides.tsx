import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

const guides = [
  {
    href: '/authentication',
    name: '讲给大学生',
    description: '解答一些很多大学生毕业了也回答不了的问题。',
  },
  {
    href: '/pagination',
    name: 'IT 技能库',
    description: '工程，设计，管理等，各种互联网办公能用得上的技能',
  },
  {
    href: '/errors',
    name: 'IT 哲学',
    description: '群友们的一些感触，一些高度抽象的方法论',
  },
  {
    href: '/webhooks',
    name: '广亮的闲谈',
    description: '群主闲来无事随便说说，也许勉强值得一听',
  },
]

export function Guides() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="guides">
        博客导航
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4">
        {guides.map((guide) => (
          <div key={guide.href}>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              {guide.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {guide.description}
            </p>
            <p className="mt-4">
              <Button href={guide.href} variant="text" arrow="right">
                查看更多
              </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
