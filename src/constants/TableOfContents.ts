interface NavGroup {
  title: string
  links: {
    title: string
    href: string
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
    title: 'JS / TS',
    links: [
      { title: 'JS 与 TS', href: '/fe/js/start' },
      { title: 'Conversations', href: '/conversations' },
      { title: 'Messages', href: '/messages' },
      { title: 'Groups', href: '/groups' },
      { title: 'Attachments', href: '/attachments' },
    ],
  },
]
