# utils/

## 作用

存放通用工具函数（无副作用，输入输出确定）。

## 内容规范

- `formatDate.ts`, `calcPagination.ts` 等。
- 每个函数一个文件，index.ts 统一导出。

## 使用方式

```ts
import { formatDate } from "@/utils/formatDate";
```

## 注意事项

纯函数，不依赖 store/context。
