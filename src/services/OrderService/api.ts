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
