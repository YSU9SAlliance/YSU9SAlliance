import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

const guides = [
  {
    href: '/before',
    name: '序言',
    description:
      '为什么做这个站点？谁适合学习这些知识？读完这一部分，可以保证你问不出「新手学哪门语言好？」这种问题',
  },
  {
    href: '/common',
    name: '软件开发通用',
    description:
      '所有软件开发从业者都可以学习的知识，也是所谓「科班出身」与「非科班」的主要区别',
  },
  {
    href: '/fe',
    name: '前端开发',
    description:
      '软件开发中「编写 GUI 终端」的岗位的统称，如 Web、iOS、Android 研发等等...',
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
