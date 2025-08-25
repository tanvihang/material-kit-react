# contexts/

## 作用

管理全局 Context，例如认证、主题。

## 内容规范

- 每个 Context 一个文件：`AuthContext.tsx`, `ThemeContext.tsx`。
- 必须提供对应的 Provider 组件。

## 使用方式

```tsx
import { useAuth } from "@/contexts/AuthContext";
```

## 注意事项

Context 仅限全局场景使用。

避免滥用 Context → 会触发大量 re-render。
