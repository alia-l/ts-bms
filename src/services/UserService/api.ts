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

/**
 * @description 获取角色权限列表
 * @param params
 */
export function getRoleList(params: API.PageParams) {
  return fetch('/user/staff_role/list', {
    params: { ...params },
  });
}

/**
 * @description 获取角色权限列表
 * @param params
 */
export function updateRole(params: UserAPI.RoleData) {
  return fetch('/user/staff_role/update', {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * @description 获取角色权限列表
 * @param params
 */
export function addRole(params: UserAPI.RoleData) {
  return fetch('/user/staff_role/add', {
    method: 'POST',
    data: { ...params },
  });
}
