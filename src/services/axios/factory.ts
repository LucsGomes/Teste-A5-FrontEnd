import axios from "axios";

import {
  requestInterceptor,
  responseErrorInterceptor,
  responseSuccessInterceptor,
} from "./interceptors";

function Factory(baseURL: string, headers?: Record<string, string>) {
  const instance = axios.create({
    baseURL,
    headers: {
      "content-type": "application/json",
      ...headers,
    },
  });

  instance.interceptors.request.use(requestInterceptor);

  instance.interceptors.response.use(
    responseSuccessInterceptor,
    responseErrorInterceptor
  );

  return instance;
}

export default Factory;
