# hooks/

## 作用

存放自定义 React Hooks。

## 内容规范

- 每个 hook 一个文件，例如：
  - `useFetch.ts`
  - `useDebounce.ts`
  - `useLocalStorage.ts`
- 命名统一以 `use` 开头。

## 使用方式

```tsx
import { useDebounce } from "@/hooks/useDebounce";
```

## 注意事项

Hook 尽量只做一件事，保持纯粹。

避免在 hook 中直接操作 DOM，除非是专门的 useDOM。
