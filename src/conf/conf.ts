const { location } = window;
const { href } = location;
const envOptions = {
  PROD: 'https://api.kangarooread.com/',
  CDNTEST: 'https://cdn-test.kangarooread.com/',
  CDNPROD: 'https://cdn.kangarooread.com/',
  NODE_STAGING: 'https://node-test.kangarooread.com/',
  NODE_PROD: 'https://node.kangarooread.com/',
};

const prodReg = /^((http|https):\/\/(bms|bmsll)\.kangarooread\.com)/;
const isProd = prodReg.test(href);

const cdnServer = isProd ? envOptions.CDNPROD : envOptions.CDNTEST;

export const env = {
  CDN: cdnServer,
};

export const OSS_UPLOAD_HOST = {
  host: `https://kangaroo-read-cdn${
    isProd ? '' : '-test'
  }.oss-cn-hangzhou.aliyuncs.com/`,
  hostShanghai: 'https://kangaroo-read-page.oss-cn-shanghai.aliyuncs.com/',
  cdn: `https://cdn${isProd ? '' : '-test'}.kangarooread.com/`,
  page: 'https://page.kangarooread.com/',
};

export const staff_info = 'staff_info';
export const TIME_FORMAT = { FULL: 'YYYY-MM-DD HH:mm:ss' };
export const OSS_DIR = {
  camp: 'resource/bms/camp/',
  qrcode: 'resource/bms/qrcode/',
  weekCourse: 'resource/bms/weekCourse/',
  video: 'resource/bms/video/',
  rich: 'resource/bms/richTextImg/',
  IDcard: 'resource/authentication/',
  manualAudio: 'resource/bms/manualAudio/',
  avatar: 'resource/avatar/',
  banner: 'resource/banner/',
  channel: 'resource/Channel/',
  courseActivity: 'resource/courseActivity/',
  bookVideo: 'resource/audio/book/',
  createWrite: 'resource/createWrite/',
  book: 'resource/book/',
  campSubCourse: 'resource/campSubCourse/',
  // checkVideo: `resource/checkVideo/${videoDate}/${videoDay}/`,
  damageFile: 'resource/damageFile/',
  orderCheck: 'resource/orderCheck/',
  entityAudio: 'resource/entityAudio/',
  bookPage: 'resource/bookPage/',
  bookVoice: 'resource/bookVoice/',
  orgImg: 'resource/organization/',
  authorImg: 'resource/author/',
  bookList: 'resource/bookList/',
  damageImg: 'resource/damage/',
};

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

//优惠券来源
export const COUPON_SOURCE: any[] = [
  { value: 1, label: '首页优惠券弹窗列表' },
  { value: 2, label: '后台发放' },
  { value: 3, label: '积分商城兑换' },
  { value: 6, label: '他人转赠' },
  { value: 7, label: '活动领取' },
  { value: 101, label: '2019年双十一活动' },
];

//优惠券状态
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

//关系
export const REFER_STATUS: any[] = [
  { value: 0, label: '小程序注册绑定' },
  { value: 1, label: 'APP注册绑定' },
  { value: 2, label: '加库存未激活' },
  { value: 3, label: '激活' },
  { value: 4, label: '兑换码兑换绑定' },
  { value: 5, label: '引流付费' },
  { value: 6, label: '正价课程' },
  { value: 7, label: '长期绑定' },
  { value: 8, label: '过期' },
  { value: 9, label: '预签约' },
  { value: 10, label: '签约' },
  { value: 11, label: '签约扣费' },
  { value: 12, label: '关系变更' },
];

// 关联订单
export const ROUTER_MAP = {
  DAMAGE_ORDER: {
    type: 10,
    name: '追损单',
    router: '/damage/list',
  },
  DAMAGE_REPORT: {
    type: 11,
    name: '报损单',
    router: '/reportDamage/list',
  },
  GOODS_IN_ORDER: {
    type: 6,
    name: '入库单',
    router: '/goodsIn/list',
  },
  OVERDUE_ORDER: {
    type: 4,
    name: '逾期单',
    router: '/overdue/list',
  },
  PURCHASE_ORDER: {
    type: 5,
    name: '购买单',
    router: '/purchase/detail',
  },
  RETURN_ORDER: {
    type: 3,
    name: '回收单',
    router: '/return/list',
  },
};

// 大礼包状态
export const BIG_GIFT_STATUS: any[] = [
  { value: -99, label: '无记录' },
  { value: -30, label: '退款' },
  { value: -20, label: '系统取消' },
  { value: -10, label: '用户取消' },
  { value: 0, label: '待支付' },
  { value: 5, label: '积分已支付' },
  { value: 10, label: '全部支付' },
  { value: 11, label: '发货审单异常' },
  { value: 12, label: '发货审单' },
  { value: 13, label: '待确认发货' },
  { value: 15, label: '待发货' },
  { value: 20, label: '已发货' },
  { value: 30, label: '已收获' },
  { value: 50, label: ' 已完成' },
];

//谷兜兜状态
export const GDD_STATUS: any[] = [
  { value: -10, label: '无效' },
  { value: 5, label: '待激活' },
  { value: 10, label: '已激活' },
  { value: 15, label: '待归还' },
  { value: 20, label: '已过期' },
  { value: 45, label: '挂失' },
  { value: 50, label: '已归还' },
];

//老服务延期时间
export const MONTH_LIST = [
  { label: '10天', value: 10 },
  { label: '15天', value: 15 },
  { label: '20天', value: 20 },
  { label: '1个月', value: 30 },
  { label: '2个月', value: 60 },
  { label: '3个月', value: 90 },
  { label: '4个月', value: 120 },
  { label: '5个月', value: 150 },
  { label: '6个月', value: 180 },
  { label: '7个月', value: 210 },
  { label: '8个月', value: 240 },
  { label: '9个月', value: 270 },
  { label: '10个月', value: 300 },
];

//购买单自订单状态
export const PURCHASE_SUB_STATUS: any[] = [
  { value: -30, label: '已退款' },
  { value: -10, label: '运行取消订单' },
  { value: -5, label: '用户取消订单' },
  { value: 0, label: '待支付' },
  { value: 10, label: '已支付' },
  { value: 20, label: '全部付款' },
  { value: 50, label: '订单完成' },
];

// 报损的类型
export const DAMAGE_TYPE: any[] = [
  { name: '缺失', value: 1 },
  { name: '损坏', value: 2 },
  { name: '其他', value: 3 },
  { name: '其他', value: 99 },
];

//追损类型map
export const CHASE_DAMAGE_STATUS = {
  '-20': { text: '客服追损复核驳回', status: 'Error' },
  '-10': { text: '运营取消', status: 'Error' },
  0: { text: '待支付', status: 'Default' },
  10: { text: '已支付', status: 'Success' },
  20: { text: '已发货', status: 'Success' },
  25: { text: '押金待扣款', status: 'Default' },
  45: { text: '押金已扣款', status: 'Success' },
  50: { text: '已完成', status: 'Success' },
};

//验收类型
export const PROCESS_DAMAGE_STATUS: any[] = [
  { name: '无报损', value: -1 },
  { name: '追损未处理', value: 0 },
  { name: '追损已处理', value: 10 },
];

// 入库单状态
export const goodsInStatus = {
  '-30': { text: '系统取消', status: 'Error' },
  '-10': { text: '运营取消', status: 'Error' },
  0: { text: '未验收', status: 'Default' },
  5: { text: '部分验收，待追损', status: 'Processing' },
  10: { text: '全部验收，待入库', status: 'Processing' },
  40: { text: '部分入库', status: 'Processing' },
  50: { text: '入库完成', status: 'Success' },
  1: { text: '上门取件', status: 'Default' },
  2: { text: '用户自寄', status: 'Default' },
};



