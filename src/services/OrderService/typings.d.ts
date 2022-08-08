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

  /**
   * @description 【积分列表】请求参数
   */
  type PointListParams = {
    reason?: string
    points?: string
    startTime?: string
    endTime?: string
    pageNum?: number;
    size?: number;
  }

  /**
   * @description 【书袋列表-详情-更改逾期时间】请求参数
   */
  type OverdueTimeParams = {
    bagOrderId?: number
    overdueDate?: string
  }

  /**
   * @description 【书袋列表-详情-子订单书袋-更改备注】请求参数
   */
  type SubBagAddRemarkParams = {
    subOrderId?: number
    remark?: string
  }

  /**
   * @description 【书袋列表-详情-更新地址】请求参数
   */
  type UpdateAddressParams = {
    province?: string
    city?: string
    county?: string
    contactName?: string
    contactPhone?: string
    address?: string
    bagOrderId: number
  }

  /**
   * @description 【书袋列表-详情-订阅管理详情】请求参数
   */
  type SubscribeDetailParams = {
    userServiceCardId?: number
  }

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //------------------------------------------------------------------
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //------------------------------------------------------------------
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /**
   * @description 【关联订单】响应数据
   */
  type LinkRelationData = {
    createTime?: number
    orderCode?: string
    orderId?: number
    orderType?: number
    status?: number
    statusDes?: string
  }

  /**
   * @description 【订阅详情】响应数据
   */
  type SubscribeDetailData = {
    activateTime?: number
    amount?: number
    amountValue?: string
    bagOrderList?: SubScribeDetail_BagOrderList
    bigGiftList?: SubScribeDetail_BigGiftList
    cardId?: any
    cardName?: any
    continuousSub?: boolean
    createTime?: number
    deviceList?: SubScribeDetail_DeviceList
    expireTime?: number
    guaranteeInfos?: any
    leftCount?: number
    pauseEndTime?: any
    pauseTime?: any
    phone?: string
    serviceCount?: number
    serviceId?: number
    serviceName?: string
    status?: number
    usedCount?: number
    userId?: number
    userServiceCardNo?: string
    username?: string
  }

  /**
   * @description 【订阅详情-BagOrderList】响应数据
   */
  type SubScribeDetail_BagOrderList = {
    contactName?: any
    contactPhone?: any
    createTime?: number
    damageOrderId?: any
    damageOrderStatus?: any
    expressTime?: any
    id?: number
    orderCode?: string
    preExpressTime?: any
    sequence?: number
    status?: number
    statusStr?: string
    userId?: string
    userServiceCardId?: string
  }

  /**
   * @description 【订阅详情-BigGiftList】响应数据
   */
  type SubScribeDetail_BigGiftList = {
    deliverTime?: number
    expressCode?: string
    expressCompany?: string
    gddCode?: string
    orderCode?: string
    orderInclude?: string
    pushTime?: number
    signTime?: number
    status?: number
  }

  /**
   * @description 【订阅详情-DeviceList】响应数据
   */
  type SubScribeDetail_DeviceList = {
    bindingTime?: number
    deviceId?: string
    gddStatusValue?: string
    id?: number
    status?: number
  }

  /**
   * @description 【书袋详情】响应数据
   */
  type BagOrderDetailData = {
    address: any
    city: any
    completeTimeMill: any
    confirmTimeMill: any
    contactName: any
    contactPhone: any
    country: any
    county: any
    createTimeMill: number
    deliverTimeMill: any
    freight: number
    id: number
    nextStepFlag: boolean
    nickname: string
    orderCode: string
    overdueTimeMill: any
    phone: string
    pickUpTimeMill: any
    preExpressTimeMill: any
    province: any
    receiveTimeMill: any
    sequence: string
    shippingConfirmTimeMill: any
    shippingCreateTimeMill: any
    status: number
    statusStr: string
    subOrderList: any
    totalPrice: number
    trackingName: any
    trackingNo: any
    userCardNo: string
    weight: any
  }

  /**
   * @description 【书袋详情- 子订单列表】响应数据
   */
  type BagSubOrderList = {
    bagOrderId: number
    bought: number
    costPrice: number
    damageReported: any
    damaged: any
    id: number
    marketPrice: number
    productId: number
    productName: string
    productSequenceNo: string
    salePrice: number
    sellerRemark: any
    type: number
  }

  /**
   * @description 【积分列表】响应数据
   */
  type PointListData = {
    availablePoints?: number
    id?: number
    pointsRecordList?: PointsRecordList
    totalPoints?: number
    userId?: number
  }

  /**
   * @description 【积分列表】响应数据 - pointsRecordList
   */
  type PointsRecordList = {
    createTime?: number
    exchangeId?: number
    exchangeOrderCode?: string
    exchangeTypeStr?: any
    id?: number
    points?: number
    reason?: string
    status?: number
  }

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
    status: number
    transferTime?: any
    transferable?: number
    usedTime?: any
    userId?: number
  }

}
