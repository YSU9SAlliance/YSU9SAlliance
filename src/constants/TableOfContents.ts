export interface NavGroup {
  title: string
  links: {
    title: string
    href: string
    tag?: string
  }[]
}

/**
 * @description TOC, 目录表
 */
export const navigation: NavGroup[] = [
  {
    title: '目录',
    links: [
      { title: '简介', href: '/' },
      { title: '软件开发通用', href: '/common' },
      { title: '前端开发', href: '/fe' },
    ],
  },
  {
    title: '笔记整理',
    links: [
      { title:'第一次笔记',href:'/arrangement/page'},
      { title:'第二次笔记',href:'/arrangement/fengzhiadd'},
      { title:'第三次笔记',href:'/arrangement/3.15arrangement'},
    ],
  },
  {
    title: 'AI 使用',
    links: [{ title: 'GPT-4 代理', href: '/common/ai/gpt4' }],
  },
  {
    title: 'JS / TS',
    links: [
      { title: '初识 JS 与 TS', href: '/fe/js/start' },
      { title: 'JS 基础语法', href: '/fe/js/basic' },
      { title: 'JS 类型系统', href: '/fe/js/type' },
      { title: 'JS 数据结构', href: '/fe/js/structure' },
    ],
  },
  {
    title: '前端框架',
    links: [
      { title: '前端框架介绍', href: '/fe/framework/start' },
      {
        title: '组件 Component',
        href: '/fe/framework/component',
        tag: 'API',
      },
      { title: '样式 Style', href: '/fe/framework/style' },
      { title: '钩子 Hook', href: '/fe/framework/hook' },
      { title: '上下文 Context', href: '/fe/framework/context' },
      { title: '状态管理 State', href: '/fe/framework/state' },
      { title: '路由 Route', href: '/fe/framework/route' },
      { title: '服务端渲染 SSR', href: '/fe/framework/ssr' },
    ],
  },
  {
    title: '职业发展',
    links: [{ title: '到底要不要考研?', href: '/conversations/post' }],
  },
]
