// * Auto add token to the request

import { STORAGE_KEYS } from '@/config';
import axios, { isAxiosError, type InternalAxiosRequestConfig } from 'axios';
import { refreshTokenApi } from './vitalz/token';

// Extend the AxiosRequestConfig to include retry count
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

// 默认 API 地址
const apiClient = axios.create({
  baseURL: '', // 可以留空
});

// 处理 Token 过期
const logOutUser = async () => {
    await localStorage.removeItem(STORAGE_KEYS.accessToken)
};

// 请求拦截器：自动携带 Authorization 头
apiClient.interceptors.request.use(async (config) => {
  try {
    const accessToken = await localStorage.getItem(STORAGE_KEYS.accessToken);
    if (accessToken && config?.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    // 如果 `url` 是完整路径，取消 `baseURL`
    if (config.url?.startsWith('http')) {
        config.baseURL = ''; // 覆盖 `baseURL`
    }
    console.log("Using Wrapped API with Auth -", config.url)
  } catch {
    throw new Error('Cannot get token from storage');
  }
  return config;
});

// 响应拦截器：处理 401 错误并尝试刷新 Token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      const originalRequest = error.config as ExtendedAxiosRequestConfig;
      if (!originalRequest) throw error;

      // 失败 2 次后登出
      if (originalRequest._retryCount) {
        originalRequest._retryCount++;
      } else {
        originalRequest._retryCount = 1;
      }

      if (originalRequest._retryCount > 2) {
        await logOutUser();
        throw new Error('Request failed after two retries with 401 status');
      }

      try {
        const accessToken = await localStorage.getItem(STORAGE_KEYS.accessToken)

        if(!accessToken){
            throw error;
        }
        
        const newToken = await refreshTokenApi(accessToken);
        if (!newToken) {
          throw error;
        }

        // 更新请求头，重试原请求
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (error_) {
        await logOutUser();
        throw error_;
      }
    }

    throw error;
  }
);export default apiClient;
