import { request } from 'umi';

const isDev = process.env.NODE_ENV === 'development';
const baseUrl = `https://api${isDev ? '-test' : ''}.kangarooread.com/v1`;

export const fetch = async (url: string, options?: Record<string, any>) => {
  return await request(`${baseUrl}${url}`, {
    ...options,
  });
};
