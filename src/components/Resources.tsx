'use client'

import Link from 'next/link'
import {
  type MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion'

import { GridPattern } from '@/components/GridPattern'
import { Heading } from '@/components/Heading'
import { ChatBubbleIcon } from '@/components/icons/ChatBubbleIcon'
import { EnvelopeIcon } from '@/components/icons/EnvelopeIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import { UsersIcon } from '@/components/icons/UsersIcon'
import { TagIcon } from './icons/TagIcon'
import { BookIcon } from './icons/BookIcon'
import { CartIcon } from './icons/CartIcon'
import { CogIcon } from './icons/CogIcon'
import { ChevronRightLeftIcon } from './icons/ChevronRightLeftIcon'
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon'
import { MapPinIcon } from './icons/MapPinIcon'
import { PackageIcon } from './icons/PackageIcon'
import { ShapesIcon } from './icons/ShapesIcon'
import { SquaresPlusIcon } from './icons/SquaresPlusIcon'
import { BoltIcon } from './icons/BoltIcon'
import { DocumentIcon } from './icons/DocumentIcon'
import { CheckIcon } from './icons/CheckIcon'
import { ListIcon } from './icons/ListIcon'
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon'
import { ClipboardIcon } from './icons/ClipboardIcon'
import { LinkIcon } from './icons/LinkIcon'
import { FolderIcon } from './icons/FolderIcon'
import { BellIcon } from './icons/BellIcon'

interface Resource {
  href: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  pattern: Omit<
    React.ComponentPropsWithoutRef<typeof GridPattern>,
    'width' | 'height' | 'x'
  >
}

const resourcesFe: Array<Resource> = [
  {
    href: '/fe-index',
    name: '初识前端',
    description:
      '一言蔽之就是写界面的，凡是用户看得到的部分，皆是前端的工作。就比如这个文档站。',
    icon: ChatBubbleIcon,
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  {
    href: '/js-index',
    name: 'JS / TS',
    description:
      'JavaScript 与 TypeScript 是前端的核心语言，几近所有的前端知识都围绕其展开。',
    icon: BookIcon,
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  {
    href: '/mv*-index',
    name: 'MV* 框架',
    description:
      'MV* 指诸如 Vue2/3、React 这样的框架，它们是当前前端生态的主流框架。',
    icon: ChevronRightLeftIcon,
    pattern: {
      y: -6,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  },
  {
    href: '/node-index',
    name: 'Node.js',
    description: '前端开发者最易上手的 Server 语言，初窥架构的不二之选。',
    icon: ListIcon,
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  {
    href: '/fe-build-index',
    name: '前端构建工具',
    description: '将一切前端工程内的文件，编译为 HTML、CSS 与 JS 的工具。',
    icon: PackageIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    href: '/fe-plus-index',
    name: '大前端',
    description: 'iOS、Android、Windows、MacOS、乃至小程序，都能算作前端',
    icon: PaperAirplaneIcon,
    pattern: {
      y: -6,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  },
  {
    href: '/fe-infra-index',
    name: '前端架构与基建',
    description: '企业中常见的前端架构与基础设施建设方案。',
    icon: CogIcon,
    pattern: {
      y: 32,
      squares: [
        [0, 2],
        [1, 4],
      ],
    },
  },
]

const resourcesCommon: Array<Resource> = [
  {
    href: '/start-index',
    name: '开发者之路',
    description:
      '一片森林里分出两条路，而我却选择了人迹更少的一条，从此决定了我一生的道路。',
    icon: MapPinIcon,
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  {
    href: '/algorithm-index',
    name: '数据结构与算法',
    description: '算法能力是计算机业内对于逻辑思维能力的衡量标准',
    icon: BoltIcon,
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  {
    href: '/network-index',
    name: '网络与协议',
    description: '软件之间传输数据的准则',
    icon: LinkIcon,
    pattern: {
      y: -6,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  },
  {
    href: '/os-index',
    name: '操作系统',
    description: '软件最常见的运行环境之一，其本身也是一个软件。',
    icon: FolderIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]],
    },
  },
  {
    href: '/design-patten-index',
    name: '设计模式',
    description: '不论写什么业务，都不会动摇的编程哲学。',
    icon: ShapesIcon,
    pattern: {
      y: 32,
      squares: [
        [0, 2],
        [1, 4],
      ],
    },
  },
  {
    href: '/software-engineer-index',
    name: '工程与架构',
    description: '研究工程的人，最后大都被叫做「架构师」',
    icon: UsersIcon,
    pattern: {
      y: -6,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  },
  {
    href: '/keep-alive-index',
    name: '如何养生',
    description: '看到这你可能需要提肛了',
    icon: BellIcon,
    pattern: {
      y: 32,
      squares: [
        [0, 2],
        [1, 4],
      ],
    },
  },
]

function ResourceIcon({ icon: Icon }: { icon: Resource['icon'] }) {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-indigo-300/10 dark:group-hover:ring-indigo-400">
      <Icon className="h-5 w-5 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-indigo-300/10 dark:group-hover:stroke-indigo-400" />
    </div>
  )
}

function ResourcePattern({
  mouseX,
  mouseY,
  ...gridProps
}: Resource['pattern'] & {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
          {...gridProps}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5b41ff]/20 to-[#49d8ff]/20 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#5b41ff]/10 dark:to-[#49d8ff]/10"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
          {...gridProps}
        />
      </motion.div>
    </div>
  )
}

function Resource({ resource }: { resource: Resource }) {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      key={resource.href}
      onMouseMove={onMouseMove}
      className="group relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
    >
      <ResourcePattern {...resource.pattern} mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
      <div className="relative rounded-2xl px-4 pb-4 pt-16">
        <ResourceIcon icon={resource.icon} />
        <h3 className="mt-4 text-sm font-semibold leading-7 text-zinc-900 dark:text-white">
          <Link href={resource.href}>
            <span className="absolute inset-0 rounded-2xl" />
            {resource.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {resource.description}
        </p>
      </div>
    </div>
  )
}

function ResourcesFactory(resources: Resource[], title: string, id: string) {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id={`${id}-resource`}>
        {title}
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4">
        {resources.map((resource) => (
          <Resource key={resource.href} resource={resource} />
        ))}
      </div>
    </div>
  )
}

export const ResourcesFe = () =>
  ResourcesFactory(resourcesFe, '前端学习资源', 'fe')
export const ResourcesCommon = () =>
  ResourcesFactory(resourcesCommon, '软件开发通用', 'common')
