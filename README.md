# vtools

个人工具集合

## 项目结构

```
vtools/
├── pnpm-workspace.yaml    # pnpm workspace 配置
├── package.json           # 根目录配置（workspace 脚本 + 共享 devDependencies）
├── server/                # 后端服务（Express + SQLite）
│   ├── package.json
│   ├── src/
│   │   ├── server.js
│   │   └── db-sqlite-record.js
│   └── data/
│       └── record.db
├── momentFlow/            # 前端应用（React + Vite + Tailwind）
│   └── package.json
├── record/                # 静态页面（通过 server 静态服务访问）
│   ├── inspiration.html
│   └── style.css
└── .prettierrc            # 代码格式化配置
```

## 快速开始

本项目使用 **pnpm workspace** 管理多个子项目，在根目录统一安装依赖。

### 安装依赖

```bash
pnpm install
```

### 启动服务

```bash
# 启动后端服务（开发模式，支持热重载）
pnpm dev:server

# 启动后端服务（生产模式）
pnpm start:server

# 启动前端开发服务
pnpm dev:moment-flow

# 构建前端
pnpm build:moment-flow
```

### 访问地址

- API 接口：`http://localhost:3000/api/inspirations`
- 静态页面：`http://localhost:3000/record/inspiration.html`
- 前端开发：`http://localhost:5173`（momentFlow）

## 工具列表

### 每日灵感 (record/inspiration.html)

一个简洁的灵感记录工具，数据存储在 SQLite 数据库中。

**功能：**
- 记录日常灵感
- 历史记录查看
- 删除记录
- 快捷键支持 (Cmd/Ctrl + Enter 提交)

**访问方式：**
启动后端服务后，访问 `http://localhost:3000/record/inspiration.html`

### 日常图文记录页面 (momentFlow)

一款简约温暖风的日常图文记录前端页面，采用 React 函数组件 + Hooks 与 Tailwind CSS，适配移动端与 PC 端多列布局。

**特性：**
- 极简治愈风 UI，暖橙 + 奶油色配色
- 卡片式大圆角布局，柔和阴影
- 记录列表 / 新增记录 / 记录详情三种视图
- 支持文字编辑与图片展示
- 可对接 `server` 提供的 RESTful 接口

**启动方式：**

```bash
pnpm dev:moment-flow
```

### 笔记接口服务 (server)

基于 Node.js + Express + SQLite 的 RESTful 接口服务。

**技术栈：**
- 后端：Node.js + Express
- 数据库：SQLite（`server/data/record.db`）
- 接口风格：RESTful API

**API 接口：**

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/inspirations` | 获取所有灵感记录 |
| POST | `/api/inspirations` | 添加灵感记录 |
| DELETE | `/api/inspirations/:id` | 删除指定记录 |

**静态文件服务：**

`/record/*` 路径下的请求会映射到 `record/` 目录的静态文件。

## Workspace 结构

| 子项目 | 路径 | 说明 |
|--------|------|------|
| server | `server/` | Express 后端服务 |
| moment-flow | `momentFlow/` | React 前端应用 |

### 常用命令

```bash
# 在根目录执行，会同时安装所有子项目的依赖
pnpm install

# 只安装某个子项目的依赖
pnpm --filter server install
pnpm --filter moment-flow install

# 运行子项目的脚本
pnpm --filter server start
pnpm --filter moment-flow dev
```

## 部署

### 前端 (momentFlow)

使用 GitHub Pages 部署，通过 `.github/workflows/momentflow-pages.yml` 自动构建并发布。

### 后端 (server)

可选方案：
- **Render**：部署 `server` 目录，前端通过 `VITE_API_BASE_URL` 指向 Render 域名
- **Fly.io**：已配置 `fly.toml`
- **Docker**：可自行编写 Dockerfile

## 开发

本项目使用 Prettier 进行代码格式化。

## License

MIT
