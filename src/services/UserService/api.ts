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
 * @description 更新角色菜单权限
 * @param params
 */
export function updateRole(params: UserAPI.RoleData) {
  return fetch('/user/staff_role/update', {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * @description 添加角色菜单权限
 * @param params
 */
export function addRole(params: UserAPI.RoleData) {
  return fetch('/user/staff_role/add', {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * @description 删除角色
 * @param id
 */
export function deleteRole(id: number) {
  return fetch('/user/staff_role/delete', {
    params: { id },
  });
}

/**
 * @description 获取账号列表
 * @param params
 */
export function getAccountList(params: API.PageParams) {
  return fetch('/user/staff/staff_list', {
    params: { ...params },
  });
}

/**
 * @description 新增账号
 * @param params
 */
export function addAccount(params: UserAPI.AccountParams) {
  return fetch('/user/staff/add', {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * @description 更新账号
 * @param params
 */
export function updateAccount(params: UserAPI.AccountParams) {
  return fetch('/user/staff/update', {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * @description 删除角色
 * @param staffId
 */
export function deleteAccount(staffId: number) {
  return fetch('/user/staff/delete', {
    params: { staffId },
  });
}

/**
 * @description 重置密码
 * @param staffId
 */
export function resetPwd(staffId: number) {
  return fetch('/user/staff/re_set_password', {
    params: { staffId },
  });
}
