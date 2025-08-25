# api/

## 作用

统一封装后端 API 调用，基于 axios。

## 内容规范

- 每个微服务一个文件，例如：
  - microservice1.ts
  - microservice2.ts
- 不在组件中直接写 axios 请求。

## 使用方式（通过tanstack二次封装，包含各种处理）

## 注意事项

- 统一在 lib/axios.ts 封装拦截器（token、错误处理）。
- 不允许在组件里直接写 fetch/axios
