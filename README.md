# JinLin Cattery 网站

阿联酋高端猫舍独立站（英短 · 缅因），面向阿联酋高净值客户，通过 WhatsApp 转化成交。

## 技术栈

- **Astro**（静态站点生成器）— 快、SEO 友好
- **Decap CMS**（内容后台）— 让你不用碰代码就能改内容、上下架猫
- **Cloudflare Pages**（部署）— 免费托管 + 全球 CDN

## 目录结构

```
cattery-website/
├── src/
│   ├── pages/           # 页面（Astro 组件）
│   │   ├── index.astro          # 首页
│   │   ├── available-cats.astro # 在售猫列表
│   │   ├── kittens/[slug].astro # 猫咪详情页（动态）
│   │   ├── breeds/[slug].astro  # 品种页（动态）
│   │   ├── about.astro          # 关于
│   │   ├── how-it-works.astro   # 购买流程
│   │   ├── faq.astro            # FAQ
│   │   ├── contact.astro        # 联系
│   │   └── blog.astro           # 博客
│   ├── layouts/Layout.astro     # 全局布局（导航/页脚）
│   ├── content/                 # ★ 内容数据（后台管理的就是这里）
│   │   ├── kittens/*.md         #   在售猫数据
│   │   ├── breeds/*.md          #   品种数据
│   │   ├── faq/*.md             #   FAQ 数据
│   │   ├── site/settings.md     #   站点设置
│   │   └── config.ts            #   内容集合 schema
│   └── style.css                # 设计系统
├── public/
│   ├── admin/           # Decap CMS 后台入口
│   │   ├── index.html
│   │   └── config.yml
│   ├── images/          # 猫片
│   ├── videos/          # 猫视频
│   └── js/lang.js       # 双语切换脚本
├── _legacy/             # 旧的纯 HTML 版本（已归档，可删）
├── 后台操作手册.md       # 给你看的后台使用说明
└── package.json
```

## 常用命令

```bash
npm install        # 安装依赖
npm run dev        # 本地开发（http://localhost:4321）
npm run build      # 构建生产版本（输出到 dist/）
npm run preview    # 预览生产版本
```

## 内容管理（重要）

网站内容（猫、品种、FAQ、文案）**不写在代码里**，而是存在 `src/content/*.md` 数据文件中。

你可以：
1. **直接改这些 .md 文件**（会一点 markdown 的话）
2. **用后台管理**（推荐）：部署后打开 `/admin`，可视化编辑

后台配置在 `public/admin/config.yml`，里面定义了能管理哪些内容。
