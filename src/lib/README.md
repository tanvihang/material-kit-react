# lib/

## 作用

对第三方库进行二次封装，方便全局统一使用。

## 内容规范

- `axios.ts` → axios 实例，含拦截器。
- `dayjs.ts` → 日期处理扩展。
- `chart.ts` → 图表库封装。

## 使用方式

```ts
import axios from "@/lib/axios";
```

## 注意事项

lib/ 只存放库的封装，不写业务逻辑。
