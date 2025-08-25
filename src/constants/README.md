# constants/

## 作用

集中管理项目常量，避免 magic number/string。

## 内容规范

- `endpoints.ts` → API baseURL, 各服务路径
- `roles.ts` → 用户角色枚举
- `colors.ts` → 配色常量
- `index.ts` → 统一导出

## 使用方式

```ts
import { API_BASE_URL } from "@/constants/endpoints";
```

## 注意事项

- 常量必须大写命名：API_BASE_URL
