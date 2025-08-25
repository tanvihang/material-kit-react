# store/

## 作用

存放全局状态（使用 Zustand）。

## 内容规范

- 每个领域一个文件：`authStore.ts`, `themeStore.ts`。
- store 只保存状态，不包含复杂业务逻辑。
- facade 提供调用接口，供页面/组建使用。

## 使用方式

```ts
import { useAuthStore } from "@/store/authStore";

const user = useAuthStore((state) => state.user);
```

## 注意事项

避免滥用 store，能用 props/context 就用 props/context。
