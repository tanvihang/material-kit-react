# components/

## 作用

存放可复用的 UI 组件。

## 内容规范

- `common/` → 基础组件（Button, Modal）
- `layout/` → 布局相关（Sidebar, Navbar）
- `feature/` → 业务组件（UserCard, ProductTable）

## 使用方式

```tsx
import { Button } from "@/components/common/Button";
```

## 注意事项

业务组件尽量放在各自模块 app/dashboard/.../components 下。

公共组件必须无业务逻辑。
