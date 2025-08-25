# Architecture

## Project Skeleton

```code
├── public
    ├── assets # 静态资源（资源集合）
└── src
    ├── components # 可复用的组建
    ├── contexts # React Context 仅限全局级别
    ├── hooks # 自定义钩子
    ├── lib # 工具函数或第三方库疯长
    ├── styles # 全局样式
    ├── types # Typescript 类型定义
    ├── store #* 跨页面共享状态
    ├── utils #* 工具函数
    ├── localization #* 多语言
    ├── api #* 多个服务接口（axios, tokens）
    ├── constants #* 常量（enum，顏色配置， API baseURL）
    └── app # Next.js App Router 入口
        ├── layout.tsx # 全局布局
        ├── page.tsx # 首页
        ├── auth/ # 登陆/注册页面
        └── dashboard/ # 登陆后的后台页面
```

## Code Specification

- ESLint → 代码规范检查
- Prettier → 统一代码风格

命名规范

- 文件夹：kebab-case (user-profile)
- 组件：PascalCase (UserCard.tsx)
- hooks：useXxx (useAuth.ts)
- 变量：camelCase (userName)
- 常量：UPPER_CASE (DEFAULT_LIMIT)

注释规范

- 公共方法必须写 JSDoc
- 特殊逻辑必须写清楚 “为什么这样做”

```ts
/**
 * 获取用户的全名
 *
 * @param {string} firstName - 用户的名
 * @param {string} lastName - 用户的姓
 * @returns {string} - 拼接后的全名
 */
function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

```

## Git Specification

Type: `feat | fix | chore`

示例：

```bash
feat(auth): add login API integration
fix(dashboard): correct pagination bug
chore: update eslint rules

```

## Environment

- `.env.development`, `.env.staging`, `.env.production`

**原则：**

- API 地址、密钥等必须通过环境变量管理
- 不能硬编码在代码中

## Error Handling

- 全局 ErrorBoundary → 捕获运行时错误，显示用户友好的 fallback UI
- API Interceptor → axios 拦截器，统一处理：
  - Token 过期 → 自动跳转登录页
  - 服务器错误 → Toast/Error UI

## Optimization

- 避免不必要的 re-render（React.memo, useMemo, useCallback）
- 懒加载模块
- 状态管理最小化（store vs local state）

## Analytic

- **GA4**
- **Hotjar**

## Testing

- 工具：**Jest** + React Testing Library
- 层级：
  - Unit Test → utils, hooks
  - Integration Test → 组件交互、API 调用
  - E2E Test → Cypress / Playwright 测用户完整流程
- 规范：测试文件放在 __tests__/ 或者和模块同级：UserCard.test.tsx

## CI/CD
