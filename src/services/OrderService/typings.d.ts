// @ts-ignore
/* eslint-disable */

declare namespace OrderAPI {
  /**
   * @description 【书袋列表】请求参数
   */
  type BagListParams = {
    confirmTimeEnd?: string;
    confirmTimeStart?: string;
    createTimeEnd?: string;
    createTimeStart?: string;
    endTime?: string;
    orderCode?: string;
    phone?: string;
    startTime?: string;
    trackingCode?: string;
    pageNum?: number;
    size?: number;
  };

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //------------------------------------------------------------------
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /**
   * @description 【书袋列表】响应数据
   */
  type BagListData = {
    confirmTimeMill?: number,
    createTimeMill?: number,
    id?: number,
    nickname?: string,
    orderCode?: string,
    phone?: string,
    sequence?: number,
    statusStr?: string,
    trackingCode?: string,
    key?: any
  };

  /**
   * @description 【优惠券列表】响应数据
   */
  type CouponListData = {
    cancelTime?: any
    collectSource?: number
    couponId?: number
    couponName?: string
    createTime?: number
    expireTime?: number
    id?: number
    orderId?: any
    remark?: any
    status?: number
    transferTime?: any
    transferable?: number
    usedTime?: any
    userId?: number
  }

}
