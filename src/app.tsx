import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { message, notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import { getDeviceId, getLocalStorage, setMD5 } from './utils/utils';
import { staff_info } from './conf/conf';
import routes from '../config/routes';
import { BlockOutlined, ProfileOutlined, SettingOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';

const iconMapping = [
  { icon: <UserOutlined /> },
  { icon: <ProfileOutlined /> },
  { icon: <SolutionOutlined /> },
  { icon: <BlockOutlined /> },
  { icon: <SettingOutlined /> },
];

const loginPath = '/login';
export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: any;
  fetchUserInfo?: () => Promise<any | null>;
  clientWidth?: any;
}> {
  const fetchUserInfo = () => {
    return new Promise((resolve, reject) => {
      let userInfo: string = getLocalStorage(staff_info);
      userInfo = userInfo ? JSON.parse(userInfo) : null;
      if (userInfo) {
        resolve(userInfo);
      } else {
        reject();
      }
    });
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
      clientWidth: document.body.clientWidth || document.body.offsetWidth || 0,
    };
  }
  return {
    fetchUserInfo,
    settings: {},
    clientWidth: document.body.clientWidth || document.body.offsetWidth || 0,
  };
}

const platform: number = 7;
const appVersion: string = '1.0.0';
const protocolVersion: number = 2;
const deviceId: string = getDeviceId();
const bigSmarter: string = setMD5(`${deviceId}_${platform}_${appVersion}`);
const userStr: string = getLocalStorage(staff_info);
const user: any = userStr ? JSON.parse(userStr) : null;
const token: string = user?.token;
const authHeaderInterceptor = (url: string, options?: Record<string, any>) => {
  const authHeader: any = {
    platform,
    appVersion,
    protocolVersion,
    deviceId,
    bigSmarter,
    token,
    ContentType: 'application/x-www-form-urlencoded',
  };

  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

const responseInterceptors = (response: Response) => {
  return response;
};

const filterMenuPermission = (per = [], list = routes) => {
  if (per.length <= 0) return [];
  const iPer = per.join(',');
  const iList = JSON.parse(JSON.stringify(list));
  return iList.filter((i: any) => {
    const flag = iPer.indexOf(i.key) > -1;
    if (flag && (i.routes || []).length > 0) {
      i.routes = filterMenuPermission(per, i.routes);
    }
    return flag;
  });
};

export const request: RequestConfig = {
  timeout: 60000,
  errorHandler: (error: any) => {
    const { response } = error;
    if (!response) {
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
    }
    throw error;
  },
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [responseInterceptors],
  errorConfig: {
    adaptor: (res: any) => {
      const { resultStatus } = res;
      const { code, message: msg } = resultStatus;
      if (code !== 1000) {
        return message.error(msg);
      } else {
        return {
          ...res,
          data: res?.data,
          success: res?.resultStatus?.code === 1000,
          errorMessage: res?.resultStatus?.message,
        };
      }
    },
  },
};

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.staffVo?.name,
    },
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menu: {
      params: initialState,
      request: async () => {
        const menu = initialState?.currentUser?.menu.split(',');
        if (menu.length <= 0) {
          message.error(`该账号无菜单权限，请求超管设置权限后重新登录`);
        } else {
          const m = filterMenuPermission(menu);
          m.forEach((it: any, index: number) => {
            it.icon = iconMapping.find((_, i) => i === index)?.icon;
          });
          return m;
        }
      },
      menuHeaderRender: undefined,
      ...initialState?.settings,
    },
  };
};
