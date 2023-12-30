/* eslint-disable no-param-reassign */
import { InternalAxiosRequestConfig } from 'axios';
import { AUTH_TOKEN_KEY } from '@/Constants/Api';

// 로그인 하면 토큰 발급
const setAuthorization = (config: InternalAxiosRequestConfig) => {
  const accessToken = sessionStorage.getItem(AUTH_TOKEN_KEY);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

export default setAuthorization;
