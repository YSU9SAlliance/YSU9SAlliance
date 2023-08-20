# 简介

广亮的技术群的群博客，分享一些软件应用开发的知识

## 本地开发

请确保你已经安装了 node，然后以项目目录打开控制台，输入下列命令安装依赖

```bash
npm install
```

本地开发命令如下

```bash
npm run dev
```

然后你可以在 [http://localhost:3000](http://localhost:3000) 访问本地开发服务器，来更改网站内容.

## 文件结构

整体项目使用 Next.js 搭建，样式使用 TailwindCSS，源文件集中于 `./src` 中，该目录外的多为配置文件

- `./src/app` 为文档列表，以 .mdx 格式为主
- `./src/components` 为自定义组件，使用 React
- `./src/mdx` mdx 渲染工具函数，以及全局搜索配置

## 证书与许可

- 站内文章均为原创，版权为作者所有，引用需注明出处
- 关于文档站模版，博主仅够买个人许可证，请勿扩散网站模板 [Tailwind UI license](https://tailwindui.com/license).
