# types/

## 作用

集中存放 TypeScript 类型定义。

## 内容规范

- `api.ts` → 接口相关的类型
- `models.ts` → 数据模型类型
- `enums.ts` → 枚举类型

## 使用方式

```ts
import { User } from "@/types/models";
```

## 注意事项

保持类型与 api/ 和 constants/ 同步更新。
