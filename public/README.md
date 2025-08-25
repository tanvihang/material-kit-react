# assets/

## 作用

存放静态资源，例如图片、SVG、字体、Lottie 文件等。

## 内容规范

- `images/` → PNG/JPG
- `svgs/` → 图标矢量
- `icons/` → 单独的 icon 资源
- `fonts/` → 字体文件
- `lottie/` → 动画 JSON

## 使用方式

在代码中使用相对路径：

```tsx
<img src="/assets/images/logo.png" alt="Logo" />
```

## 注意事项

所有静态资源必须放在 public/assets/ 下。

避免存放过大的文件（>5MB）。
