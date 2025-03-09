# 九球追分记分板

一个简单易用的九球台球追分记分板应用，使用Remix框架和React构建。

## 功能特点

- 支持两名玩家的比赛记分
- 直接显示记分面板，无需初始设置
- 实时记录每一轮的得分情况
- 支持九球特有的得分规则
- 支持撤销上一步操作
- 游戏结束时显示胜利者信息
- 响应式设计，适配各种设备

## 九球记分规则

- 犯规: +1分
- 普胜: +4分
- 小金: +7分
- 大金: +10分
- 黄金9: +4分

## 技术栈

- [Remix](https://remix.run/) - React框架
- [React](https://reactjs.org/) - 用户界面库
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的JavaScript超集
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架

## 开始使用

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 使用说明

1. 应用启动后直接显示记分面板
2. 使用不同按钮为当前玩家加分:
   - 犯规: +1分
   - 普胜: +4分
   - 小金: +7分
   - 大金: +10分
   - 黄金9: +4分
3. 点击"换人"按钮切换当前玩家
4. 点击"撤销"按钮撤销上一步操作
5. 点击"重置"按钮重新开始游戏

## 部署到Vercel

这个项目可以直接部署到Vercel平台。

### 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fbilliards-board)

### 手动部署

1. 将代码推送到GitHub仓库
2. 在Vercel上创建新项目
3. 导入GitHub仓库
4. 使用默认设置，Vercel会自动检测Remix项目
5. 点击"Deploy"按钮

### 注意事项

- 项目需要Node.js 20或更高版本
- 已配置vercel.json文件以确保正确的Node.js版本和构建设置

## 许可证

MIT
