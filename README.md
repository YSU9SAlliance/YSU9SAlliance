# 简介

燕山大学 9 秒高校俱乐部官网兼 Wiki

改自（广亮的技术群的群博客）

## 本地开发

请确保你已经安装了 node 16 以上版本，然后以项目目录打开控制台，输入下列命令

- 安装 yarn

```bash
npm i yarn -g
```

- 使用 yarn 安装依赖

```bash
yarn
```

本地开发命令如下

```bash
yarn dev
```

然后你可以在 [http://localhost:3000](http://localhost:3000) 访问本地开发服务器，来更改网站内容.

## 文件结构

整体项目使用 Next.js 搭建，样式使用 TailwindCSS，源文件集中于 `./src` 中，该目录外的多为配置文件

- `./src/app` 为文档列表，以 .mdx 格式为主
- `./src/components` 为自定义组件，使用 React
- `./src/mdx` mdx 渲染工具函数，包括全局搜索配置等

## 证书与许可

- 站内残留文章均为原创，版权为作者所有，引用需注明出处 (https://gl-blog.vercel.app)
- 关于文档站模版，博主仅够买个人许可证，请勿扩散网站模板 [Tailwind UI license](https://tailwindui.com/license).
