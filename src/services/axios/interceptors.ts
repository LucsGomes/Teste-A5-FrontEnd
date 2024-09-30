import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { manageAuth } from "../manageAuth";

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = manageAuth.getAuth()?.Token;
  if (token) {
    config.headers["Authorization"] = token;
  }

  return config;
};

const responseSuccessInterceptor = (response: AxiosResponse) => response;

const responseErrorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

export {
  requestInterceptor,
  responseErrorInterceptor,
  responseSuccessInterceptor,
};
