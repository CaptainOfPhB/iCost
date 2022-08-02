import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestSchema, ResponseSchema } from '../types/http';

const timeout = 3000;
const baseURL = 'http://localhost:8000/api/v1';
const headers = { 'Content-Type': 'application/json' };

const axios = Axios.create({ baseURL, headers, timeout });

axios.interceptors.response.use(
  (response: AxiosResponse<ResponseSchema>) => {
    console.log('response', response);
    return response.data;
  },
  (error: AxiosError<ResponseSchema>) => {
    console.log('axios error', error);
  },
);

export default (params: RequestSchema & AxiosRequestConfig) => axios(params);
