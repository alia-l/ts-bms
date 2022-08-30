// @ts-ignore
import md5 from 'js-md5';
import { staff_info } from '@/conf/conf';

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getDeviceId = (): string => {
  let agent = navigator.userAgent;
  agent = agent.substr(2, 12);
  return `${agent}${(Math.random() * 10000).toFixed(0)}`;
};

export const setMD5 = (str: string): string => {
  return md5(str);
};

const base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export const base64encode = (str: string) => {
  let out = '';
  let i = 0;
  let c1;
  let c2;
  let c3;
  const len = str.length;
  while (i < len) {
    // eslint-disable-next-line no-bitwise,no-plusplus
    c1 = str.charCodeAt(i++) & 0xff;
    if (i === len) {
      // eslint-disable-next-line no-bitwise
      out += base64EncodeChars.charAt(c1 >> 2);
      // eslint-disable-next-line no-bitwise
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += '==';
      break;
    }
    // eslint-disable-next-line no-plusplus
    c2 = str.charCodeAt(i++);
    if (i === len) {
      // eslint-disable-next-line no-bitwise
      out += base64EncodeChars.charAt(c1 >> 2);
      // eslint-disable-next-line no-bitwise
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
      // eslint-disable-next-line no-bitwise
      out += base64EncodeChars.charAt((c2 & 0xf) << 2);
      out += '=';
      break;
    }
    // eslint-disable-next-line no-plusplus
    c3 = str.charCodeAt(i++);
    // eslint-disable-next-line no-bitwise
    out += base64EncodeChars.charAt(c1 >> 2);
    // eslint-disable-next-line no-bitwise
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
    // eslint-disable-next-line no-bitwise
    out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
    // eslint-disable-next-line no-bitwise
    out += base64EncodeChars.charAt(c3 & 0x3f);
  }
  return out;
};

/**
 * @description 获取本地缓存
 * @param k
 */
export const getLocalStorage = (k: string) => {
  return window.localStorage.getItem(k) || '';
};

/**
 * @description 获取本地缓存（session）
 * @param k
 */
export const getSessionStorage = (k: string) => {
  return window.sessionStorage.getItem(k) || '';
};

/**
 * @description 设置本地缓存
 * @param k
 * @param value
 */
export const setLocalStorage = (k: string, value: any) => {
  window.localStorage.setItem(k, value);
};

/**
 * @description 设置本地缓存（session）
 * @param k
 * @param value
 */
export const setSessionStorage = (k: string, value: any) => {
  window.sessionStorage.setItem(k, value);
};

/**
 * @description 移除本地缓存
 * @param k
 */
export const removeLocalStorage = (k: string) => {
  window.localStorage.removeItem(k);
};

/**
 * @description 移除本地缓存（session）
 * @param k
 */
export const removeSessionStorage = (k: string) => {
  window.sessionStorage.removeItem(k);
};

export const checkBtnAuth = (key: any) => {
  if (!key) return false;
  let list = [];
  let staffInfo = getLocalStorage(staff_info);
  staffInfo = staffInfo ? JSON.parse(staffInfo) : {};
  // @ts-ignore
  const { function: btnAuth } = staffInfo;
  if (btnAuth) {
    list = btnAuth.split(',');
  }
  if (list.length < 1) return false;
  return list.includes(key);
};

/**
 * 浮点数计算； 规避浮点数的精度丢失；
 * eg: 32.80*100 // 3279.9999999999995;
 */
export const numberCal = {
  add: (a: number, b: number) => {
    let c;
    let d;
    try {
      c = a.toString().split('.')[1].length;
    } catch (f) {
      c = 0;
    } // eslint-disable-line
    try {
      d = b.toString().split('.')[1].length;
    } catch (f) {
      d = 0;
    } // eslint-disable-line
    const e = 10 ** Math.max(c, d);
    return (numberCal.mul(a, e) + numberCal.mul(b, e)) / e;
  },
  sub: (a: number, b: number) => {
    let c;
    let d;
    try {
      c = a.toString().split('.')[1].length;
    } catch (f) {
      c = 0;
    } // eslint-disable-line
    try {
      d = b.toString().split('.')[1].length;
    } catch (f) {
      d = 0;
    } // eslint-disable-line
    const e = 10 ** Math.max(c, d);
    return (numberCal.mul(a, e) - numberCal.mul(b, e)) / e;
  },
  mul: (a: number, b: number) => {
    let c = 0;
    const d = a.toString();
    const e = b.toString();
    try {
      c += d.split('.')[1].length;
    } catch (f) {
    } // eslint-disable-line
    try {
      c += e.split('.')[1].length;
    } catch (f) {
    } // eslint-disable-line
    return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / 10 ** c;
  },
  div: (a: number, b: number) => {
    let e = 0;
    let f = 0;
    try {
      e = a.toString().split('.')[1].length;
    } catch (d) {
    } // eslint-disable-line
    try {
      f = b.toString().split('.')[1].length;
    } catch (d) {
    } // eslint-disable-line
    const c = Number(a.toString().replace('.', ''));
    const d = Number(b.toString().replace('.', ''));
    return numberCal.mul(c / d, 10 ** (f - e));
  },
};
// 截取url上面的字段
// @ts-ignore
export const getParams = (str: string) => {
  if (!str) return {};
  try {
    const paramsStr = str.split('?')[1];
    const list = paramsStr.split('&');
    const params = {};
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        const key = list[i].split('=')[0];
        const value = list[i].split('=')[1];
        params[key] = value;
      }
      return params;
    }
    return {};
  } catch (err) {
    console.log(err);
  }
};


/**
 * @desc 设置回显图片数据
 * @param {*}  pic
 * @returns
 */
export function setImg(pic: any) {
  if (pic.length === 0) {
    return [];
  }
  let imgArr: any[] = [];
  if (Array.isArray(pic)) {
    if (pic.length) {
      imgArr = imgArr.concat(
        pic.map((el, idx) => {
          return {
            uid: idx,
            name: `file_${idx}`,
            url: el,
            status: 'done',
          };
        }),
      );
    }
  }
  return imgArr;
}



