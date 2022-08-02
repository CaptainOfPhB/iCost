import axios from '../../utils/axios';
import { AxiosRequestConfig } from 'axios';
import { RequestSchema } from '../../types/http';
import { UseAxiosOptions } from '@vueuse/integrations';
import { useAxios } from '@vueuse/integrations/useAxios';

export default (
  params: RequestSchema & AxiosRequestConfig,
  options?: UseAxiosOptions,
) => useAxios(params.url!, params, axios, options);
