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

/**
 * @desc 获取订阅卡订单详情
 * @returns {Promise}
 * @param params
 */
export function getUserServiceCardDetail(params: OrderAPI.SubscribeDetailParams) {
  return fetch('/order/bms/bag_order/list', {
    params: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 手动生成下一个书袋
 * @param {*} serviceCardId
 */
export function manualCatchNextBag(serviceCardId: number) {
  return fetch('/order/bms/bag_order/bagOrder/manual_catch_next_bag', {
    params: { serviceCardId },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 恢复用户优惠券
 * @param userCouponId
 * @returns {*}
 */
export function recoverUserCoupon(userCouponId: number) {
  return fetch(`/order/bms/user_coupon/recover_coupon/${userCouponId}`, {
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 更新用户优惠券过期时间
 * @param userCouponId
 * @param expireTime
 * @returns {*}
 */
export function updateUserCouponExtendExpired(userCouponId: number, expireTime: string) {
  return fetch(`/order/bms/user_coupon/extend_expired/${userCouponId}`, {
    params: { expireTime },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 工单记录列表
 * @param params
 * @returns {*}
 */
export function getTicketList(params: OrderAPI.TicketListParams) {
  return fetch(`/order/bms/ticket/get_ticket_by_type`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 工单记录详情
 * @returns {*}
 * @param ticketId
 */
export function getTicketRecordList(ticketId: number) {
  return fetch(`/order/bms/ticket/get_ticket_record_list`, {
    params: { ticketId },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 添加工单跟进记录
 * @param params
 * @returns {*}
 */
export function addTicketRecord(params: OrderAPI.AddTicketRecordParams) {
  return fetch(`/order/bms/ticket/add_ticket_record`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 丢件记录查询
 * @param params
 * @returns {*}
 */
export function getLostTicketList(params: OrderAPI.AddLostTicketRecordParams) {
  return fetch(`/order/bms/ticket/get_lost_ticket`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 记录丢件
 * @param params
 * @returns {*}
 */
export function changeLostOrderRecord(params: OrderAPI.SubmitLostTicketParams) {
  return fetch(`/order/bms/ticket/lost_order_record`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 批量处理丢件订单
 * @param params
 * @returns {*}
 */
export function overTicketList(params: any) {
  return fetch(`/order/bms/ticket/over_ticket`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 获取购买单列表
 * @param params
 * @returns {*}
 */
export function getPurchaseList(params: OrderAPI.PurchaseOrderListParams) {
  return fetch(`/order/bms/purchase_order/list`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 获取购买订单
 * @param {string} [purchaseOrderId=""]
 * @returns {Promise}
 */
export function getPurchaseDetail(purchaseOrderId: number) {
  return fetch('/order/bms/purchase_order/detail', {
    params: { purchaseOrderId },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 书袋已购买子订单退款(可批量)
 * @param params
 * @returns {*}
 */
export function refundPurchaseSubOrder(params: OrderAPI.RefundPurchaseSubOrderParams) {
  return fetch(`/order/bms/purchase_order/refund_purchase_sub_order`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description  报损列表接口v3
 * @param params
 * @returns {*}
 */
export function getDamageReportList(params: OrderAPI.ReportDamageOrderListParams) {
  return fetch(`/order/bms/damage_report/damage_report_list`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 完成积分补偿
 * @returns {*}
 * @param bagOrderCodeList
 */
export function completePointsCompensation(bagOrderCodeList: string) {
  return fetch(`/order/bms/damage_report/complete_points_compensation`, {
    method: 'POST',
    data: { bagOrderCodeList },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 导出积分申请
 * @param params
 * @returns {*}
 */
export function exportPointsApply(params: OrderAPI.ReportDamageOrderListParams) {
  return fetch(`/order/bms/damage_report/points_apply_export`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 导出自订单
 * @param params
 * @returns {*}
 */
export function exportSubReport(params: OrderAPI.ReportDamageOrderListParams) {
  return fetch(`/order/bms/damage_report/sub_report_export`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 异常工单获取徽标数
 * @returns {*}
 */
export function getTicketTimeoutCount() {
  return fetch(`/order/bms/ticket/get_ticket_timeout_count`, {
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 获取报损详情列表
 * @param damageReportId
 * @returns {Promise}
 */
export function getReportDetail(damageReportId: number) {
  return fetch('/order/bms/damage_report/detail', {
    params: { damageReportId },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 报损自订单回复
 * @param params
 * @returns {*}
 */
export function subReportReply(params: { reply: string, subReportId: number }) {
  return fetch(`/order/bms/damage_report/sub_report/reply`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 标记积分补偿
 * @param params
 * @returns {*}
 */
export function subReportPointCompensation(params: OrderAPI.PointCompensationParams) {
  return fetch(`/order/bms/damage_report/sub_report/mark_point_compensation`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 报损原因分类
 * @param params
 * @returns {*}
 */
export function subReportDamageClassify(params: OrderAPI.DamageTypeParams) {
  return fetch(`/order/bms/damage_report/sub_report/mark_damage_classify`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 整单回复
 * @param params
 * @returns {*}
 */
export function damageReportV2(params: OrderAPI.StaffReportParams) {
  return fetch(`/order/bms/damage_report/updateV2`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 获取追损列表
 * @returns {Promise}
 * @param params
 */
export function getDamageList(params: OrderAPI.ChaseDamageParams) {
  return fetch('/order/bms/damage_order/list', {
    params: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 导出追损单
 * @param params
 * @returns {*}
 */
export function exportDamageOrder(params: OrderAPI.ChaseDamageParams) {
  return fetch(`/order/bms/damage_order/export`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 获取追损详情
 * @param damageOrderId
 * @returns {Promise}
 */
export function getDamageInfo(damageOrderId: number) {
  return fetch('/order/bms/damage_order/detail', {
    params: { damageOrderId },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 取消单独的绘本追损
 * @param {string} [damageSubOrderId=""]
 * @returns
 */
export function cancelDamageSubOrder(damageSubOrderId: number) {
  return fetch(`/order/bms/damage_order/cancel_damage_sub_order/${damageSubOrderId}`, {
      method: 'PUT',
      headers: {
        'v2': true,
      },
    },
  );
}

/**
 * @desc 更新追损单subOrder
 * @returns {Promise}
 * @param params
 */
export function updateDamageInfo(params: OrderAPI.UpdateDamageInfoParams) {
  return fetch('/order/bms/damage_order/update', {
    method: 'PUT',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 追损单子订单退款（可批量）
 * @param params
 * @returns {*}
 */
export function refundDamageSubOrder(params: OrderAPI.RefundDamageParams) {
  return fetch(`/order/bms/damage_order/refund_damage_sub_order`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 获取入库单列表
 * @returns {undefined}
 * @param params
 */
export function getGoodsInOrderList(params: OrderAPI.GoodsInOrderListParams) {
  return fetch('/order/bms/goods_in_order/goods_in_list', {
    params: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 获取入库单详情
 * @param goodsInOrderId
 * @returns {Promise}
 */
export function getGoodsInOrderDetail(goodsInOrderId: number) {
  return fetch('/order/bms/goods_in_order/detail', {
    params: { goodsInOrderId },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 获取回收订单列表
 * @returns {Promise}
 * @param params
 */
export function getReturnOrderList(params: OrderAPI.ReturnOrderListParams) {
  return fetch('/order/bms/return_order/return_list', {
    params: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 获取回收单详情
 * @param returnOrderId
 * @returns {Promise}
 */
export function getReturnOrderDetail(returnOrderId: number) {
  return fetch('/order/bms/return_order/detail', {
    params: { returnOrderId },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 手动更新
 * @returns
 * @param params
 */
export function manualSignIn(params: OrderAPI.ManualSignInParams) {
  return fetch('/order/bms/return_order/manual_sign_in', {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 验收入库
 * @returns {Promise}
 * @param params
 */
export function addGoodsIn(params: OrderAPI.AddGoodsInParams) {
  return fetch('/order/bms/goods_in_order/inspect', {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 获取审核发单列表
 * @returns
 * @param params
 */
export function getAuditBagList(params: any) {
  return fetch('/order/bms/bag_order/audit_bag_List', {
    params: { ...params },
    headers: {
      'v2': true,
    },
  });
}


/**
 * @desc 取消预约
 * @param {string} [orderCode=""]
 * @returns
 */
export function cancelAppointment(orderCode: string) {
  return fetch(`/order/bms/return_order/cancel_appointment_v2/${orderCode}`, {
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 强制取消快递预约
 * @param params
 * @returns {*}
 */
export function cancelReturnOrderForce(params = {}) {
  return fetch(`/order/bms/return_order/force_cancel_return_order`, {
    params: { ...params },
  });
}

/**
 * @desc 获取自寄单列表
 * @param {*} [params={}]
 * @returns
 */
export function getSelfReturnOrderList(params: OrderAPI.ShelfReturnOrderParams) {
  return fetch('/order/bms/selfReturnOrder/return_list', {
    params: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 批量完成自寄订单
 * @param {*} [params={}]
 * @returns
 */
export function completeSelfOrder(params: any) {
  return fetch('/order/bms/selfReturnOrder/complete_self_order', {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}


/**
 * @desc 导出自寄订单
 * @param {*} [params={}]
 * @returns
 */
export function exportShelfReturnExl(params = {}) {
  return fetch('/order/bms/selfReturnOrder/export_return_list', {
    params: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 复核列表V2
 * @returns
 * @param params
 */
export function reCheckListV2(params = {}) {
  return fetch('/order/bms/goods_in_order/re_check_listV2', {
    method: 'POST',
    data: { ...params },
  });
}


/**
 * @description 获取质检复核详情
 * @param params
 * @returns {*}
 */
export function getReCheckDetail(params: OrderAPI.ReCheckOrderDetailParams) {
  return fetch(`/order/bms/goods_in_order/re_check_detail`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 提交复核
 * @returns
 * @param params
 */
export function submitReCheck(params: OrderAPI.SubmitReCheckParams) {
  return fetch('/order/bms/goods_in_order/submit_re_check', {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 审单标记异常
 * @param {*} [params={}]
 * @returns
 */
export function markUnusual(params = {}) {
  return fetch('/order/bms/bag_order/audit_bag_unusual', {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 审单详情
 * @param {string} [bagOrderId='']
 * @returns
 */
export function getAuditBagDetail(bagOrderId: number) {
  return fetch(`/order/bms/bag_order/audit_bag_info/${bagOrderId}`, {
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 审单详情单独保存用户地址
 *
 * @param {*} [params={}]
 * @returns
 */
export function saveUserAddressInCheckDeliver(params: OrderAPI.SaveUserAddressInCheckDeliverParams) {
  return fetch('/order/bms/bag_order/save_user_address', {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 确认审单
 * @param {*} [params={}]
 * @returns
 */
export function confirmAudit(params: OrderAPI.SaveUserAddressInCheckDeliverParams) {
  return fetch('/order/bms/bag_order/audit_bag_confirm', {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 获取积分订单审单列表
 * @param params
 * @returns {*}
 */
export function getAuditPointsOrderList(params = {}) {
  return fetch('/order/bms/point_order/audit_points_order_List', {
    params: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 积分订单审单
 * @param params
 * @returns {*}
 */
export function auditPointsOrderConfirm(params = {}) {
  return fetch('/order/bms/point_order/audit_points_order_confirm', {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 修改积分订单审单信息
 * @param params
 * @returns {*}
 */
export function editPointsInfo(params = {}) {
  return fetch(`/order/bms/point_order/audit_points_order_info_update`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 积分订单审单标记异常
 * @param params
 * @returns {*}
 */
export function auditPointsOrderUnusual(params = {}) {
  return fetch('/order/bms/point_order/audit_points_order_unusual', {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @desc 获取积分订单
 * @param params
 * @returns {undefined}
 */
export function getPointsOrderList(params = {}) {
  return fetch(`/order/bms/point_order/list`, {
    params: { ...params },
    headers: {
      'v2': true,
    },
  });
}

/**
 * @description 获取积分订单详情
 * @param orderId
 * @returns {*}
 */
export function getPointOrderDetail(orderId: number) {
  return fetch(`/order/bms/point_order/detail/${orderId}`, {
    headers: {
      'v2': true,
    },
  });
}


/**
 * @description 积分商城退款
 * @param params
 * @returns {*}
 */
export function refundPointOrder(params = {}) {
  return fetch(`/order/bms/point_order/refund`, {
    method: 'POST',
    data: { ...params },
    headers: {
      'v2': true
    }
  })
}

/**
 * @description 实体卡订单列表
 * @param params
 * @returns {*}
 */
export function physicalCardList(params = {}) {
  return fetch(`/order/bms/physical_card_order/physical_card_list`, {
    params: { ...params },
    headers: {
      'v2': true
    }
  })
}

/**
 * @description 批量更新订单状态
 * @param params
 * @returns {*}
 */
export function updateOrderExpressCode(params = {}) {
  return fetch(`/order/bms/physical_card_order/batch_update_order_express_code`, {
    params: { ...params },
    headers: {
      'v2': true
    }
  })
}








