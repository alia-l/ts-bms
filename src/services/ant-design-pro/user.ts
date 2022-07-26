import { fetch } from '@/services/fetch';

/**
 * @description 登录
 * @param params
 */

export function processLoginStaff(params: UserAPI.LoginParams) {
  return fetch('/user/staff_login', {
    method: 'POST',
    data: { ...params },
  });
}

export function getRoleList(params = {}) {
  return fetch('/user/staff_role/list', {
    params: { ...params },
  });
}
