import axios from 'axios';
import { NETWORK } from '../Constants/Api';
import setAuthorization from './interceptors';

// header 있는 버전, 없는 버전 인스턴스 2개 만들기..

const axiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_END_POINT,
  timeout: NETWORK.TIMEOUT,
};

export const axiosCommonInstance = axios.create(axiosRequestConfig);

export const axiosAuthInstance = axios.create(axiosRequestConfig);

axiosAuthInstance.interceptors.request.use(setAuthorization, (error) => {
  console.error(error);
  return Promise.reject(error);
});
