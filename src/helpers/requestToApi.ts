/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AxiosRequestConfig, Method } from 'axios';

interface IRequestToApi {
  method?: Method;
  config?: AxiosRequestConfig;
  url: string;
  data?: any;
  abortController?: AbortController;
}

const instance = axios.create();

export const requestToApi = ({
  method = 'GET',
  config,
  url = '',
  data,
  abortController,
}: IRequestToApi) => {
  const requestConfig: AxiosRequestConfig = {
    method,
    url,
    data,
    signal: abortController && abortController.signal,
  };

  requestConfig.baseURL = import.meta.env.VITE_API_URL || window.location.origin;

  if (config) {
    Object.assign(requestConfig, config);
  }

  // instance
  return instance(requestConfig);
};
