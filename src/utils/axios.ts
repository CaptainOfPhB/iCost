import { showNotify } from 'vant'
import { RequestSchema, ResponseSchema } from '@/types/http';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

type AxiosRequest<D = any> = RequestSchema & AxiosRequestConfig<D>;

const timeout = 3000;
const baseURL = 'http://localhost:8000/api/v1';
const headers = { 'Content-Type': 'application/json' };

const axios = Axios.create({ baseURL, headers, timeout });

axios.interceptors.response.use(
  (axiosResponse: AxiosResponse) => axiosResponse.data,
  (axiosError: AxiosError<ResponseSchema>) => {
    const response = handleResponse(axiosError);
    const config = axiosError.config as AxiosRequest;
    if (config.notify !== false) {
      const messages = Object.values(response.error!);
      messages.length === 1
        ? showNotify(messages[0])
        : showNotify({
          message: messages.map((msg: string, idx: number) => `${idx + 1}. ${msg}`).join('\n')
        });
    }
    return response;
  },
);

function handleResponse(axiosError: AxiosError<ResponseSchema>): ResponseSchema {
  switch (typeof axiosError.response?.data) {
    // 1. request error such as 404 will return rails html string response
    // 2. network error will cause axiosError.response.data to be undefined
    case 'string':
    case 'undefined': return {
      data: null,
      status: 'error',
      error: { UnhandledExceptionOrNetworkError: axiosError.message }
    };
    default: return axiosError.response!.data;
  }
}

const http = (params: AxiosRequest) => axios(params);

export default http;
export const read = (params: AxiosRequest) => http({ ...params, method: 'GET' });
export const create = (params: AxiosRequest) => http({ ...params, method: 'POST' });
export const update = (params: AxiosRequest) => http({ ...params, method: 'UPDATE' });
export const remove = (params: AxiosRequest) => http({ ...params, method: 'DELETE' });
