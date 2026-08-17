# 智慧信息融合实验室网站 · Smart Sensor Fusion Lab Website

一个文件夹、零依赖、无需安装任何东西。改内容 = 改一个小文件。
One folder, zero dependencies, nothing to install. Editing content = editing one small file.

---

## 🚀 一分钟上手 · Run it in one minute

| 方式 Way | 怎么做 How |
|---|---|
| **直接打开** Just open | 双击 `index.html` Double-click `index.html` |
| **VS Code**（推荐 recommended） | 打开本文件夹 → 右键 `index.html` → **Open with Live Server**（保存自动刷新 auto-reloads on save） |
| **命令行** Terminal | 在本文件夹运行 `python -m http.server 8000` → 打开 open `http://localhost:8000` |

---

## 🗺️ 我要改 ___，去哪个文件？· I want to change ___ — which file?

| 想改什么 What | 文件 File |
|---|---|
| 📰 新闻 / 事件 News & events | `assets/js/content/news.js` |
| 📄 论文 Publications | `assets/js/content/pubs.js` |
| 👥 团队成员 Team members | `assets/js/content/team.js` |
| ⚙️ 视频 / 魔方大小 / 标识 Video, cube size, logos | `assets/js/config.js` |
| 🖼️ 图片、PDF、视频文件 Media files | 放进 put into `media/` |
| ✍️ 页面固定文字 Static page texts | `index.html`（中文在标签里，英文在 `data-en="…"` 属性 Chinese in the tag, English in its `data-en` attribute） |
| 🎨 颜色 / 字号 Colors & sizes | `assets/css/style.css` 顶部 `:root` 变量 top `:root` tokens |
| 🧠 交互逻辑 Interaction engine | `assets/js/app.js` — **一般不要动 don't touch** |

> 💡 每个内容文件顶部都写着字段说明 — 打开就知道怎么改。
> Every content file starts with its own field guide — open it and you'll know what to do.

---

## 📋 三个最常见任务 · The three most common tasks

### 1️⃣ 加一条新闻 · Add a news item
打开 open `assets/js/content/news.js`，在列表 `window.SITE.news = [` 里加一块 add one block to the list:
```js
{
  "img": "media/news/my-photo.jpg",   // 图片放进 media/news/ · put the photo there first
  "d": "2025/04",                     // 年/月 year/month
  "cat": "e",                         // 'n' 新闻 news · 'e' 事件 event
  "hi": 1,                            // 首页精选加这行，否则删掉 · homepage highlight (or delete this line)
  "t": "中文标题", "s": "中文摘要。",
  "tEn": "English title", "sEn": "English summary.",
  "u": null                           // 外部链接或 null · external link or null
},
```
保存 → 刷新，完成。Save → refresh. Done — highlights, timeline and both languages update themselves.

### 2️⃣ 加一篇论文 · Add a paper
PDF 放进 put the PDF into `media/papers/`，打开 open `assets/js/content/pubs.js`:
```js
{
  "y": 2025, "type": "期刊",           // 期刊 | 会议 | 专著
  "venue": "IEEE TAES",
  "title": "Paper title",
  "authors": "A, B, C",
  "link": "https://…",                 // 可省 optional
  "pdf": "media/papers/my-paper.pdf"   // 可省 optional
},
```
自动排序、可搜索、魔方研究面自动过滤。Auto-sorted, searchable, cube filters included.

### 3️⃣ 加一位成员 · Add a team member
照片放进 photo into `media/`，打开 open `assets/js/content/team.js`，
在对应分类里加 add inside the right group（`pe-prof` 教授 / `pe-collab` 合作学者 / `pe-stud` 学生 / `pe-alum` 校友）:
```js
{
  "img": "media/zhang-san.jpg",
  "n": "Zhang San",                    // 姓名保持原文 name stays as-is
  "t": "博士生", "tEn": "Ph.D. Student",
  "e": "zhangsan@sjtu.edu.cn"
},
```

---

## 🎛️ 常用设置 · Common settings（`assets/js/config.js`）

```js
cubeScale: 0.82,                          // 魔方大小 cube size (0.7–1.1)
heroVideo: 'media/Background_viz.mp4',    // 首屏视频 hero video（'' = 不用视频 no video）
heroImage: '',                            // 用图片代替视频 image instead of video
bgImage: '',                              // 整站底图 whole-site background image
logos: ['media/logo-sjtu.png',
        'media/logo-lab.png'],            // 页眉页脚标识 header/footer logos
```

## 🌓 主题与语言 · Themes & languages
右上角两个按钮 two buttons top-right：**◑** 深/浅色切换 dark/light（自动记住 remembered per browser）· **EN/中** 语言切换 language toggle。
内容的双语写在同一条目里（`t`/`tEn`），页面固定文字的英文写在 `index.html` 的 `data-en` 属性里。
Bilingual content lives in the same item (`t`/`tEn`); static-text English lives in `data-en` attributes in `index.html`.

## 📦 部署 · Deploy
把整个文件夹（含 `media/`、`upload/`、`people/`）上传到服务器根目录即可，无需任何后端。
Upload the whole folder (with `media/`, `upload/`, `people/`) to the server root. No backend needed.

**发布修改后 after publishing edits：** 把 `index.html` 里所有 `?v=9` 改成 `?v=10`（数字加一）。
这会强制所有访客的浏览器加载新文件。Bump every `?v=` number by one — it forces every visitor's browser to load the fresh files.

---

## 🆕 首页新模块 · New home-page modules

**当前项目 · Ongoing projects** — 编辑 `assets/js/content/projects.js`，
每个项目一个块（`t/tEn` 标题、`s/sEn` 简介）。列表为空时自动显示"筹备中"。
Edit `assets/js/content/projects.js`; one block per project. Empty list shows
a "coming soon" placeholder automatically.

**合作 · Collaborations** — 首页"合作"分为 产业合作（卡片在 index.html 的
`#partners` 内）与 学术合作（`#acadMap` 为地图预留位，之后接入地图时替换该
占位块即可）。Industrial cards live in `#partners` in index.html; `#acadMap`
reserves the spot for the future academic-collaboration map.

**文章阅读 · Article reader** — 点击任意新闻/事件卡片会打开全文弹窗
（✕ / Esc / 点击空白处关闭）。全文内容在 `content/news.js` 里给条目加
`body` / `bodyEn` 字段；没有 body 时显示摘要。Click any news/event card to
open the reader (close with ✕ / Esc / backdrop). Add `body` / `bodyEn`
fields to an item in `content/news.js` for full text; falls back to the
summary.

---

## 🧊 魔方上的应用 · Apps on the cube

首页魔方共有三组入口 the landing cube carries three groups of apps:
**正面 front** = LAB / SDC / FOOD · **顶面 top**（上下拖动翻转 drag to flip）= 学术期刊 academia (TAES / CJIF / JAIF) · **底面 bottom** = 公司平台 company (GitLab / UniverSee / TCB)。

**加一个应用 add an app** → `assets/js/content/portals.js` 加一块：
`key`（魔方格坐标 cubie coordinate）、`face`（`'f'`正面 / `'u'`顶面 / `'d'`底面）、
`label`（格子上的字）、`ext: true`（外部跳转）、`url`、`tag/tagEn`、`title`、`desc/descEn`、
`hex`（发光色）、`hexText`（正文配色 {dark, light}）。

---

## 🔄 更新到新版本 · Updating to a new package

拿到新的 `fusion-site.zip` 时 when you receive a new `fusion-site.zip`:

1. 解压后**合并**到现有文件夹（覆盖同名文件）。Extract and **merge** into your existing folder (overwrite files with the same names).
2. 你自己的 `media/`、`upload/`、`people/` 里的文件不会被删 — 新包里没有的文件会原样保留。Your own files in `media/`, `upload/`, `people/` survive — merging never deletes what the new package doesn't contain.
3. 刷新即可：新包的 `?v=` 版本号已经更新，浏览器会自动加载新文件。Just refresh — the new package already carries a higher `?v=`, so browsers fetch fresh files automatically.

> ⚠️ 常见错误 common mistake：解压出嵌套的 `fusion-site/fusion-site/` extract creating a nested folder — `index.html` 必须和 `assets/` 直接同级 `index.html` must sit directly beside `assets/`.

---

## 🧰 素材脚本 · Asset scripts（一次性 one-time helpers）

| 脚本 Script | 作用 What it does |
|---|---|
| `fetch-remaining-assets.sh` | 趁旧服务器还在线，下载全部旧站图片/PDF downloads all legacy photos & PDFs while the old server is still online |
| `fix-missing.sh` | 重试 10 张路径不同的照片 retries the 10 photos stored under a different path |
| `rename-spaced-files.sh` | 修复文件名带空格的 5 个文件 fixes the 5 files whose names contain spaces |
| `ASSETS-NEEDED.txt` | 网站引用的全部素材清单 full manifest of every asset the site expects |

运行方式 how to run（在本文件夹 in this folder）：`bash 脚本名.sh` — Windows 用 Git Bash。

---

## 🧯 排错 · Troubleshooting

| 症状 Symptom | 原因与解决 Cause & fix |
|---|---|
| 改了没变化 Edits don't show | 浏览器缓存 browser cache → `Ctrl+Shift+R`；发布后记得加 `?v=` bump the `?v=` after publishing |
| 页面底部红条 red banner at bottom | `assets/` 文件夹没和 `index.html` 放一起 keep `assets/` next to `index.html` |
| 图片不显示 image missing | 路径拼写/文件不存在 → 卡片会显示 FUSION 占位图，不会破版 path typo or file absent → the FUSION placeholder shows, layout never breaks；文件名**不要带空格** no spaces in filenames |
| 视频黑屏 video black | 检查 check `config.js` 里 `heroVideo` 的路径 path；按 F12 看控制台的 `[hero video]` 提示 the console names the exact file it tried |
| 页面全白/坏了 page broken after an edit | 多半是逗号/引号写错 usually a missing comma or quote → 撤销上一步 undo the last edit（建议改前先复制备份 copy the file before editing） |

## 📁 完整结构 · Full structure
```
fusion-site/
├── index.html                  页面结构 + 固定文字 markup & static texts
├── README.md                   本指南 this guide
├── media/                      ★ 你的图片/PDF/视频 your media files
├── upload/  people/            旧站素材（照片等）migrated legacy assets
└── assets/
    ├── css/style.css           全部样式（顶部有目录）all styles (TOC inside)
    └── js/
        ├── config.js           ⚙️ 设置 settings
        ├── content/
        │   ├── news.js         📰 新闻/事件
        │   ├── pubs.js         📄 论文
        │   ├── team.js         👥 团队
        │   └── portals.js      🎛️ 首页入口（少动）landing portals (rarely)
        └── app.js              🧠 引擎（不要动）engine (do not edit)
```
