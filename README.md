# vtools

个人工具集合

## 项目结构

```
vtools/
├── record/
│   └── inspiration.html   # 每日灵感记录工具
├── momentFlow/            # 日常图文记录前端（React + Tailwind）
├── server/                # 笔记 / 图片链接 / 文字内容 接口服务
├── package.json           # 根目录 Node 项目配置（统一依赖）
└── .prettierrc            # 代码格式化配置
```

## 工具列表

### 每日灵感 (inspiration.html)

一个简洁的灵感记录工具，使用浏览器 localStorage 存储数据。

**功能：**
- 记录日常灵感
- 历史记录查看
- 删除记录
- 快捷键支持 (Cmd/Ctrl + Enter 提交)

**使用方式：**
直接在浏览器中打开 `record/inspiration.html` 文件即可使用。

### 日常图文记录页面 (momentFlow)

一款简约温暖风的日常图文记录前端页面，采用 React 函数组件 + Hooks 与 Tailwind CSS，适配移动端与 PC 端多列布局。

**特性：**
- 极简治愈风 UI，暖橙 + 奶油色配色
- 卡片式大圆角布局，柔和阴影
- 记录列表 / 新增记录 / 记录详情三种视图
- 支持文字编辑与图片展示
- 后续可对接 `server` 提供的 RESTful 接口

**本地启动：**

```bash
cd momentFlow
npm install
npm run dev
```

或在项目根目录使用：

```bash
npm run dev:moment-flow
```

当前数据使用前端内存模拟，`src/api/client.js` 中已预留与 Node.js + SQLite 后端对接的位置，后续可按 `/notes` 等接口替换为真实请求。

### 笔记接口服务 (server)

一个基于 Node.js + Express + SQLite 的简单 RESTful 接口服务，用于存储：
- 用户
- 笔记（标题）
- 文本内容
- 图片链接

后端位于 `server/` 目录，依赖和脚本在项目根目录管理。

**技术栈：**
- 后端：Node.js + Express
- 数据库：SQLite（单文件，位于 `server/data/notes.db`）
- 接口风格：RESTful API

**本地启动：**

```bash
npm install
npm run start:server
```

启动后默认监听 `http://localhost:3000`，提供以下基础接口：
- `GET /health` 健康检查
- `POST /users` 创建用户
- `GET /users` 用户列表
- `POST /notes` 创建笔记（含图片链接/文字内容）
- `GET /notes` 笔记列表
- `GET /notes/:id` 获取单条笔记
- `PUT /notes/:id` 更新笔记
- `DELETE /notes/:id` 删除笔记

该后端可供多个前端页面/项目共用（例如放在不同子目录的前端应用）。

## 开发

本项目使用 Prettier 进行代码格式化。

## License

MIT
