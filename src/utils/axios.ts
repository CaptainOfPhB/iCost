import { showNotify } from 'vant'
import { RequestSchema, ResponseSchema } from '../types/http';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

type AxiosRequest<D = any> = RequestSchema & AxiosRequestConfig<D>;

const timeout = 3000;
const baseURL = 'http://localhost:8000/api/v1';
const headers = { 'Content-Type': 'application/json' };

const axios = Axios.create({ baseURL, headers, timeout });

axios.interceptors.response.use(
  (axiosResponse: AxiosResponse) => axiosResponse.data,
  (axiosError: AxiosError<ResponseSchema>) => {
    const { response } = axiosError;
    const config = axiosError.config as AxiosRequest;
    const isUnhandledException = typeof response?.data === 'string';
    const error = isUnhandledException
      ? { UnhandledException: axiosError.message }
      : response?.data.error!;
    if (config.notify !== false) {
      const messages = Object.values(error);
      messages.length === 1
        ? showNotify(messages[0])
        : showNotify({
          message: messages.map((msg: string, idx: number) => `${idx + 1}. ${msg}`).join('\n')
        });
    }
    // request error such as 404 will return rails html string response
    return isUnhandledException
      ? { status: 'error', data: null, error }
      : response?.data;
  },
);

const http = (params: AxiosRequest) => axios(params);

export default http;
export const read = (params: AxiosRequest) => http({ ...params, method: 'GET' });
export const create = (params: AxiosRequest) => http({ ...params, method: 'POST' });
export const update = (params: AxiosRequest) => http({ ...params, method: 'UPDATE' });
export const remove = (params: AxiosRequest) => http({ ...params, method: 'DELETE' });
