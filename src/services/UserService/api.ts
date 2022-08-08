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
    headers: {
      v2: true,
    },
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

/**
 * @description 用户列表
 * @param params
 */
export function getUserList(params: UserAPI.UserListParams) {
  return fetch('/user/user/user_list', {
    params: { ...params },
    headers: {
      v2: true,
    },
  });
}

/**
 * @description 用户列表详情信息
 * @param userId
 */
export function getUserDetail(userId: number) {
  return fetch('/user/user/get_user_info_detail', {
    params: { userId },
    headers: {
      v2: true,
    },
  });
}

/**
 * @description 获取订阅列表
 */
export function getUserServiceList(params: UserAPI.SubscribeParams) {
  return fetch(`/user/bms/user_service/list`, {
    params: { ...params },
    headers: {
      v2: true,
    },
  });
}

/**
 * @description 获取抽奖次数列表
 * @param params
 */
export function userLotteryCountList(params: UserAPI.LotteryCountParams) {
  return fetch('/user/bms/activity/user_lottery_count', {
    params: { ...params },
  });
}

/**
 * @description 获取关系记录列表
 * @param userId
 */
export function getUserReferRecord(userId: number) {
  return fetch('/user/user/get_user_refer_record', {
    params: { userId },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 冻结订阅卡
 * @returns {Promise}
 * @param params
 */
export function freezeOrder(params: UserAPI.FreezeOrderParams) {
  return fetch('/user/user/service/suspend', {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * @desc 解除冻结订阅卡
 * @returns {Promise}
 * @param userServiceCardId
 */
export function notFreezeOrder(userServiceCardId: number) {
  return fetch('/user/user/service/recover', {
    method: 'POST',
    data: { userServiceCardId },
  });
}

/**
 * @desc 增加暂停次数
 * @param {string} [userServiceCardId='']
 * @returns
 */
export function addStopCount(userServiceCardId: number) {
  return fetch('/user/user/incr_stop_count', {
    params: { userServiceCardId },
  });
}

/**
 * @description 延长服务周期
 * @param params
 * @returns {*}
 */
export function extendExpiredTime(params: UserAPI.ExpiresTimeParams) {
  return fetch('/user/bms/user_service/extend_expired_time', {
      method: 'POST',
      data: { ...params },
      headers: {
        'v2': true,
      },
    },
  );
}

/**
 * @description 延期记录
 * @param userServiceCardId
 * @returns {*}
 */
export function getExtendRecordList(userServiceCardId: number) {
  return fetch(`/user/bms/user_service/extend_record/${userServiceCardId}`);
}



