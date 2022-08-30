import { request } from 'umi';

const isDev = process.env.NODE_ENV === 'development';
const baseUrl = `https://api${isDev ? '-test' : ''}.kangarooread.com/`;
let domain = 'v1';
export const fetch = async (url: string, options?: Record<string, any>) => {
  if (options?.headers?.v2) {
    domain = 'v2';
  }else{
    domain = 'v1';
  }

  return await request(`${baseUrl}${domain}${url}`, {
    ...options,
  });
};
