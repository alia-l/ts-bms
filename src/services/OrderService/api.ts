import { fetch } from '@/services/fetch';

/**
 * @description 获取书袋列表
 */
export function getBagOrderList(params: OrderAPI.BagListParams) {
  return fetch('/order/bms/bag_order/bag_list', {
    params: { ...params },
    headers: {
      v2: true,
    },
  });
}

/**
 * @description 获取优惠券
 */
export function getUserCouponList(params: API.PageParams, userId: number) {
  return fetch(`/order/bms/user_coupon/list/${userId}`, {
    params: { ...params },
    headers: {
      v2: true,
    },
  });
}

/**
 * @description 获取积分列表
 * @param params
 */
export function getUserPointList(params: OrderAPI.PointListParams) {
  return fetch(`/order/bms/point/v1/user/points/detail`, {
    params: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 获取书袋详情信息
 * @param bagOrderId
 */
export function getBagOrderDetail(bagOrderId: number) {
  return fetch(`/order/bms/bag_order/bag_detail/${bagOrderId}`, {
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 获取书袋详情中所有子订单的列表
 * @param bagOrderId
 */
export function getBagSubOrderList(bagOrderId: number) {
  return fetch(`/order/bms/bag_order/sub_bag_detail/${bagOrderId}`, {
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 更新书袋逾期单
 * @returns {Promise}
 * @param params
 */
export function updateOverdueTime(params: OrderAPI.OverdueTimeParams) {
  return fetch('/order/bms/bag_order/update_overdue_date', {
    method: 'PUT',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 书袋添加备注
 * @param params
 * @returns {*}
 */
export function subBagAddRemark(params: OrderAPI.SubBagAddRemarkParams) {
  return fetch(`/order/bms/bag_order/sub_bag_add_remark`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 允许用户重新报损
 * @param {*} bagOrderId
 */
export function anewReport(bagOrderId: number) {
  return fetch(`/order/bms/bag_order/anew_report/${bagOrderId}`, {
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 回归待确认
 * @param bagOrderId
 * @returns {*}
 */
export function cancelConfirm(bagOrderId: number) {
  return fetch(`/order/bms/bag_order/cancel_confirm`, {
    params: { bagOrderId },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 更新收货地址
 * @param params
 * @returns {*}
 */
export function updateBagOrderAddress(params: OrderAPI.UpdateAddressParams) {
  return fetch(`/order/bms/bag_order/update_bag_order_address`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 获取所有的关联订单
 * @param bagOrderId
 * @returns {Promise}
 */
export function getLinkedOrder(bagOrderId: number) {
  return fetch('/order/bms/bag_order/get_all_linked_order', {
    params: { bagOrderId },
    headers: {
      'v2': true,
    },
  });
}
