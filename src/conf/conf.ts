export const staff_info = 'staff_info';
export const TIME_FORMAT = { FULL: 'YYYY-MM-DD HH:mm:ss' };

/**
 * @description 按钮权限
 */
export const BTN_ACCESS_GROUPS = [
  { value: 'create_bag', label: '生成书袋' },
  { value: 'frozen', label: '冻结' },
  { value: 'unfrozen', label: '解冻' },
  { value: 'add_pause_count', label: '新增1次暂停次数' },
  { value: 'extend_expired_time', label: '延长订阅卡服务期限' },

  // 书袋订单
  { value: 're_report_break', label: '重新报损' },
  { value: 'cancel_deliver_goods', label: '取消发货' },
  { value: 'cancel_wareHouse_deliver_goods', label: '仓库取消发货' },
  { value: 'change_confirm', label: '更改书袋为待确认' },

  // 用户列表
  { value: 'unbind_wechat', label: '解绑微信' },
  { value: 'change_phone', label: '换绑手机号' },
  { value: '20_cards_update', label: '20张卡升级' },
  { value: 'public_transfer_card', label: '对公转账发卡' },

  // 报损订单
  { value: 'process_report_break', label: '处理报损' },

  // 追损订单
  { value: 'change_break_amount', label: '修改折扣金额' },
  { value: 'cancel_break_book', label: '取消追损绘本' },
  { value: 'save_break', label: '修改追损信息' },
  { value: 'damage_batch_refund', label: '追损批量退款' },

  // 回收订单
  { value: 'confirm_arrive', label: '确认到仓' },
  { value: 'acceptance', label: '验收通过' },
  { value: 're_check', label: '复核' },
  { value: 'cancel_appointment', label: '取消预约' },

  // 自寄订单
  { value: 'complete_self_return', label: '完成自寄单' },
  { value: 'self_return_export', label: '导出自寄单' },

  // 复核列表
  { value: 're_check_submit', label: '复核追损提交' },
  { value: 're_check_confirm', label: '复核追损确认' },

  // 发货审单
  { value: 'batch_approve', label: '批量审批' },
  { value: 'edit_express', label: '修改快递' },
  { value: 'mark_error', label: '标记异常' },
  { value: 'confirm_approve', label: '确认审单' },

  // 购买订单退款
  { value: 'purchase_order_refund', label: '购买订单退款' },

  // 退卡管理
  { value: 'return_card', label: '退卡' },
  { value: 'cancel_active', label: '取消激活卡' },

  //商品相关
  { value: 'change_good_status', label: '商品上下架' },
  { value: 'show_goods_info', label: '展示商品信息' },
  { value: 'new_service_refund', label: '新服务订阅退款' },
];


//权限类型
export const STAFF_ROLE = [
  { value: 1, label: '超级管理员' },
  { value: 2, label: '仓库管理员' },
  { value: 3, label: '客服' },
  { value: 4, label: '仓库质检员' },
  { value: 5, label: '运营' },
  { value: 6, label: '管理员' },
  { value: 8, label: '口试审核人员' },
];

// 领读者等级
export const LEAD_LEVEL: any[] = [
  { value: 0, label: '普通会员/未迁移', color: '' },
  { value: 1, label: '一星领读者', color: 'green' },
  { value: 2, label: '二星领读者', color: 'blue' },
  { value: 3, label: '三星领读者', color: 'geekblue' },
  { value: 4, label: '四星领读者', color: 'purple' },
  { value: 5, label: '五星领读者', color: 'gold' },
  { value: 6, label: '领读者导师', color: 'red' },
];

export const COUPON_SOURCE: any[] = [
  { value: 1, label: '首页优惠券弹窗列表' },
  { value: 2, label: '后台发放' },
  { value: 3, label: '积分商城兑换' },
  { value: 6, label: '他人转赠' },
  { value: 7, label: '活动领取' },
  { value: 101, label: '2019年双十一活动' },
];

export const COUPON_USED_STATUS: any[] = [
  { value: -5, label: '已过期', status: 'default' },
  { value: -1, label: '已转赠', status: 'default' },
  { value: 0, label: '已使用', status: 'success' },
  { value: 8, label: '未激活', status: 'processing' },
  { value: 10, label: '未使用', status: 'processing' },
];

// 服务状态
export const cardServiceStatus: any[] = [
  { name: '未激活', value: 0 },
  { name: '服务暂停中', value: 2 },
  { name: '冻结已恢复', value: 5 },
  { name: '已激活', value: 10 },
  { name: '服务过期', value: 45 },
  { name: '押金完成', value: 47 },
  { name: '服务完成', value: 50 },
  { name: '已失效', value: 51 },
  { name: '已失效', value: 52 },
  { name: '已冻结', value: -5 },
  { name: '无效', value: -10 },
  { name: '内测用户退回', value: -66 },
];
