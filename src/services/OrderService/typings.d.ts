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

  /**
   * @description 【工单管理】请求参数
   */
  type TicketListParams = {
    dueDaysModel?: boolean,
    endTime?: string,
    pageNum?: number,
    serviceCardStatus: number,
    size: number,
    startTime?: string,
    telephone?: string,
    ticketType: number,
    ticketUpdateModel: boolean,
    workStatus?: number
  }

  /**
   * @description 【工单详情-添加跟进记录】请求参数
   */
  type AddTicketRecordParams = {
    content: string,
    ticketId?: number
    overCode: boolean,
    operationType: number
  }

  /**
   * @description 【工单详情-丢件记录】请求参数
   */
  type AddLostTicketRecordParams = {
    orderCode?: string,
    telephone?: string,
    ticketType?: string,
    workStatus?: number
    trackingName?: string
    beginTime?: string
    endTime?: string
  }

  /**
   * @description 【工单详情-添加丢件记录】请求参数
   */
  type SubmitLostTicketParams = {
    amount: number,
    bagOrderId: number,
    orderCode: string
    remark: string
    returnOrderId: number
    sequence: number
    ticketId: number
    ticketType: number
    trackingName: string
    trackingNo: string
  }

  /**
   * @description 【购买单列表】请求参数
   */
  type PurchaseOrderListParams = {
    phone?: string,
    nickname?: string,
    userId?: string,
    paidEndTime?: string,
    paidStartTime?: string,
    keyword?: string
    pageNum: number;
    size: number;
  }

  /**
   * @description 【购买单-退款】请求参数
   */
  type RefundPurchaseSubOrderParams = {
    purchaseSubOrderIds: number[]
    staffRemark: string
  }

  /**
   * @description 【报损订单-列表】请求参数
   */
  type ReportDamageOrderListParams = {
    phone?: string,
    status?: number,
    orderCode?: string,
    bagOrderCode?: string,
    startTime?: string,
    endTime?: string,
    isPackageBroken?: boolean,
    pointsCompensationStatus?: number
    pageNum: number;
    size: number;
  }
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //------------------------------------------------------------------
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //------------------------------------------------------------------
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


  /**
   * @description 【报损订单-列表】响应数据
   */
  type ReportDamageOrderListData = {
    bagOrderCode: string
    bagOrderId: number
    count: any
    createTime: number
    id: number
    nickname: string
    packageBroken: boolean
    phone: string
    pointsCompensationStatus: number
    reportCode: string
    sequence: number
    status: number
    userId: number
    key: number
  }

  /**
   * @description 【购买单-详情】响应数据
   */
  type PurchaseOrderDetailData = {
    amount: number
    bagOrderCode: string
    bagOrderId: number
    contactName: string
    contactPhone: string
    couponId: any
    couponName: any
    createTime: number
    discountAmount: number
    goodsQuantity: number
    id: number
    nickname: string
    orderCode: string
    outTradeNo: any
    paidTime: any
    payAmount: number
    phone: string
    sellerRemark: any
    sequence: number
    status: number
    subOrderList: PurchaseOrderDetail_subOrderList[]
    userCouponId: any
    userId: number
  }

  /**
   * @description 【购买单-详情-subOrderList】
   */
  type PurchaseOrderDetail_subOrderList = {
    createTime: number
    dealPrice: any
    id: number
    isbn: string
    isbn10: string
    marketPrice: number
    productId: number
    productName: string
    productNo: string
    salePrice: number
    status: number
  }

  /**
   * @description 【购买单列表】响应数据
   */
  type PurchaseOrderListData = {
    amount: number
    bagOrderId: number
    bagOrderSequence: number
    createTime: number
    id: number
    nickname: string
    orderCode: string
    phone: string
    productNames: string[]
    status: number
    userId: number
    key: number
  }

  /**
   * @description 【工单详情-丢件记录】响应数据
   */
  type AddLostTicketRecordData = {
    amount: number
    bagOrderId: number
    createTime: string
    handleTime: any
    id: number
    mainNo: any
    orderCode: string
    returnOrderId: any
    sequence: number
    trackingName: string
    trackingNo: string
    userName: string
    userTelephone: string
  }

  /**
   * @description 【工单详情】响应数据
   */
  type TicketDetailData = {
    ticketRecordList: TicketDetail_ticketRecordList
    tip: any
    tipDays: any
    tipSequence: any
    tipTicketType: any
  }

  /**
   * @description 【工单详情-ticketRecordList】响应数据
   */
  type TicketDetail_ticketRecordList = {
    content: string
    createTime: string
    id: number
    staffId: any
    ticketId: number
    type: number
    updateTime: string
  }

  /**
   * @description 【工单管理】响应数据
   */
  type TicketListData = {
    amount: number,
    appointmentSequence: number,
    bagOrderCode: string,
    bagOrderId: number,
    confirmedSequence: number,
    dueDays: number,
    exceptionBeginTime: string,
    expireTime: string,
    id: number,
    logisticsCancelTime: string,
    mainNo: string,
    orderCode: string,
    logisticsCancelTimepickupTime: string,
    returnId: number,
    sequence: number,
    ticketRecordContent: string,
    ticketRecordUpdateTime: string,
    trackingName: string,
    trackingNo: string,
    userName: string,
    userTelephone: string
  }

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
