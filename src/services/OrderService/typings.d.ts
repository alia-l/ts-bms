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

  /**
   * @description 【报损订单-积分补偿】请求参数
   */
  type PointCompensationParams = {
    points: string
    remark?: string
    subReportId?: number
  }

  /**
   * @description 【报损订单-报损分类】请求参数
   */
  type DamageTypeParams = {
    damageClassify: number
    remark?: string
    subReportId?: number
  }

  /**
   * @description 【报损订单-仓库备注】请求参数
   */
  type StaffReportParams = {
    status?: number
    staffRemark?: string
    id?: number
  }

  /**
   * @description 【追损订单-列表】请求参数
   */
  type ChaseDamageParams = {
    phone?: string,
    status?: string,
    keyword?: string,
    startTime?: string,
    endTime?: string,
    paidTimeStart?: string,
    paidTimeEnd?: string,
    trackingNo?: string
  }

  /**
   * @description 【追损订单-更新信息】请求参数
   */
  type UpdateDamageInfoParams = {
    buyerRemark?: string,
    confirmTime?: string,
    id: number,
    sellerRemark?: string,
    status?: number,
    subOrderList:
      {
        buyerRemark?: string,
        id: number,
        imgList: any,
        sellerRemark?: string
      }[]
  }

  /**
   * @description 【追损订单-批量退款】请求参数
   */
  type RefundDamageParams = {
    damageSubOrderIds: number[]
    staffRemark?: string,
    orderCode: string
  }

  /**
   * @description 【入库订单-列表】请求参数
   */
  type GoodsInOrderListParams = {
    phone?: string
    status?: number
    goodsInOrderCode?: string
    bagOrderCode?: string
    staffName?: string
    startTime?: string
    endTime?: string
    pageNum: number;
    size: number;
  }

  /**
   * @description 【回收订单-列表】请求参数
   */
  type ReturnOrderListParams = {
    phone?: string,
    contactName?: string,
    contactPhone?: string,
    trackingNo?: string,
    bagOrderCode?: string,
    returnOrderCode?: string,
    pickupTimeStart?: string,
    pickupTimeEnd?: string,
    createTimeStart?: string,
    createTimeEnd?: string,
    productSequenceNo?: string
    pageNum: number;
    size: number;
  }

  /**
   * @description 【回收订单-详情-确认到仓】
   */
  type ManualSignInParams = {
    returnOrderId: number
    remark: string
  }

  /**
   * @description 【回收订单-详情-验收通过】
   */
  type AddGoodsInParams = {
    productIdList: number[]
    goodsInOrderId: number
    returnOrderId: number
  }

  /**
   * @description 【自寄订单-列表】
   */
  type ShelfReturnOrderParams = {
    logisticsNo: string
    phone: string
    contactName: string
    contactPhone: string
    bagOrderCode: string
    payStatus: string
    createTimeStart: string
    createTimeEnd: string
  }

  /**
   * @description 【质检复核-详情】
   */
  type ReCheckOrderDetailParams = {
    bagOrderCode?: string,
    status?: number,
    goodsInOrderId: number
  }

  /**
   * @description 【质检复核-复核】
   */
  type SubmitReCheckParams = {
    goodsInOrderId: number,
    submitReCheckSubReqList: SubmitReCheckParams_submitReCheckSubReqList[]
  }


  /**
   * @description 【质检复核-复核-submitReCheckSubReqList】
   */
  type SubmitReCheckParams_submitReCheckSubReqList = {
    buyerRemark: string
    goodsInOrderSubId: number
    type: number
    remark: string
    imgList: string[]
    checkVideoDuration?: string
    checkVideoUrl?: string
  }

  /**
   * @description 【发货审单-更改地址】
   */
  type SaveUserAddressInCheckDeliverParams = {
    address: string
    bagOrderId: number
    city: string
    company: number | string
    contactName: string
    contactPhone: string
    county: string
    province: string
    sellerRemark: string
    area?: any
  }


  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //------------------------------------------------------------------
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //------------------------------------------------------------------
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /**
   * @description 【实力卡发货】
   */
  type GrantCardData = {
    id?: number,
    orderCode?: string,
    cardId?:number,
    quantity?: number,
    userId?: number,
    realName?: string,
    mobile?: string,
    country?: null,
    province?: string,
    city?: string,
    county?: string,
    address?: string,
    expressNo?: any,
    payAmount?: number,
    status?: number,
    createTime?: number,
    paidTime?: number,
    cardName?: any,
    cardImg?: any,
    showBindBtn?: any,
    showBindDetail?: any,
    statusLabel?: any,
    expressCode?: any,
    expressAmount?: number,
    cardAmount?: number
  }


  /**
   * @description 【积分订单详情】
   */
  type PointOrderDetail = {
    contactName: string
    contactPhone: string
    orderId: number
    payAmount: number
    payPoint: number
    payTime: any
    refundAmount: number
    refundPoint: number
    refundStaffName: any
    refundTime: any
    status: number
  }

  /**
   * @description 【积分发货审单】
   */
  type PointCheckDeliverData = {
    id: number
    orderCode: string
    pointsShopGoodsId: number
    goodsName: string
    goodsImgurl: string
    status: number
    statusStr: any
    contactName: any
    contactPhone: any
    country: any
    province: any
    city: any
    county: any
    address: any
    points: number
    discountPoints: string
    payPoints: number
    amount: number
    discountAmount: number
    payAmount: number
    freight: number
    buyerRemark: string
    sellerRemark: any
    paidTime: any
    createTime: number
    expressCode: any
    expressCompany: any
    quantity: string
    type: number
    userId: number
    nickname: string
    phone: string
    allowRefund: boolean
  }

  /**
   * @description 【发货审单详情】
   */
  type CheckDeliverDetailData = {
    id: number
    sequence: number
    orderCode: string
    status: number
    contactName: any
    contactPhone: any
    country: any
    province: any
    city: any
    county: any
    address: any
    weight: any
    auditStaff: number
    sellerRemark: string
    suspendRecovery: boolean
    createTime: number
    preExpressTime: any
    confirmTime: any
    statusStr: string
    company: any
    bookVoList: CheckDeliverDetailData_bookVoList[]
  }

  /**
   * @description 【发货审单详情-bookVoList】
   */
  type CheckDeliverDetailData_bookVoList = {
    id: number
    bookNo: string
    isbn: number
    isbn10: string
    saleTitle: string
    publishTitle: string
    subTitle: string
    originTitle: any
    cost: any
    salePrice: number
    marketPrice: number
    shareReward: any
    discountRate: any
    bookRfid: any
    usedTimes: any
    author: any
    description: string
    coverPicture: string
    publisher: string
    pages: number
    binding: string
    publishDate: number
    type: number,
    status: number
    weight: number
    minAge: number
    maxAge: number
    totalStock: number
    orderStock: number
    deliverStock: number
    bought: boolean
    tagArr: any
    tagNameList: any
    detailImageArr: any
    recommendReasonArr: any
    inPreferList: boolean
    inReadList: boolean
    haveStock: boolean
    haveRightAge: boolean
    haveChangeBook: boolean
    appointmented: boolean
    useCoupon: boolean
    mustRead: boolean
    displayOrder: number
    haveGddAudio: boolean

  }

  /**
   * @description 【发货审单-响应数据】
   */
  type CheckDeliverData = {
    id: number,
    orderCode: string
    createTime: number
    confirmTime: any
    contactName: any
    contactPhone: any
    country: any
    province: any
    city: any
    county: any
    address: any
    bookCount: number
    statusStr: string
    status: number
    auditStatus: string
    sellerRemark: any
    sequence: number
    company: any
    expressCom: string
  }

  /**
   * @description 【质检复核-详情】
   */
  type ReCheckOrderDetailData = {
    id: number,
    orderCode: string
    bagOrderId: number
    returnOrderId: number
    wmsOrderCode: any
    expressType: number
    status: string
    subOrderList: ReCheckOrderDetailData_subOrderList[],
    sequence: number
    userId: number
    phone: string
    nickname: string
    inspectionTime: number
    bagOrderCode: string
    returnOrderCode: number
  }

  /**
   * @description 【质检复核-详情-subOrderList】
   */
  type  ReCheckOrderDetailData_subOrderList = {
    id: number
    productId: number
    productNo: string
    productName: string
    status: any
    inspectionTime: number
    reCheckTime: any
    confirmTime: any
    imgList: string[],
    hasImg: boolean
    hasRemark: boolean
    checkVideoUrl: any
    checkVideoDuration: any
    wmsOrderCode: any
    staffRemark: string
    buyerRemark: any
    damageReportOrderCode: any
    damageReportId: any
  }


  /**
   * @description 【质检复合-列表】
   */
  type ReCheckOrderData = {
    bagOrderCode: string
    bagOrderId: number
    expressType: number
    id: number
    inspectionTime: number
    nickname: any
    orderCode: string
    phone: any
    returnOrderCode: any
    returnOrderId: number
    sequence: number
    status: string
    subOrderList: ReCheckOrderData_subOrderList[]
    userId: number
    wmsOrderCode: any
  }

  /**
   * @description 【质检复合-列表-subOrderList】
   */
  type ReCheckOrderData_subOrderList = {
    id: number
    productId: number
    productNo: string
    productName: string
    status: any
    inspectionTime: number
    reCheckTime: any
    confirmTime: any
    imgList: string[]
    hasImg: boolean
    hasRemark: boolean
    checkVideoUrl: any
    checkVideoDuration: any
    wmsOrderCode: any
    staffRemark: string
    damageReportOrderCode: string
    damageReportId: any
  }


  /**
   * @description 【自寄订单-列表】
   */
  type ShelfReturnOrderData = {
    alipayId: string
    alipayName: string
    bagOrderCode: string
    bagOrderId: number
    contactName: string
    contactPhone: string
    createTime: string
    freight: any
    goodsInStatus: number
    id: number
    logisticsNo: string
    logisticsSync: boolean
    nextStepFlag: boolean
    nickname: any
    orderCode: string
    payMoney: string
    payStatus: number
    payTime: any
    phone: any
    pickupTime: any
    reserveTime: any
    selfPicList: string
    sequence: number
    shippingStatus: any
    status: number
    subsidyAmount: string
    trackingNo: any
    type: number
    userId: number
  }


  /**
   * @description 【回收订单-详情】响应数据
   */
  type ReturnOrderDetailData = {
    address: string
    arriveTerminalTime: any
    bagOrderCode: string
    bagOrderId: number
    city: string
    contactName: string
    contactPhone: string
    country: string
    county: string
    createTime: number
    damageOrder: any
    damageReportCode: any
    damageStatus: number
    expressCompany: any
    expressNo: any
    goodsInOrder: any
    goodsList: ReturnOrderDetailData_goodsList[]
    id: number
    orderCode: string
    nickname: string
    payAmount: number
    payStatus: number
    payTime: any
    phone: string
    pickupTime: any
    province: string
    refundTime: any
    sellerRemark: any
    status: number
    userId: number
  }

  /**
   * @description 【回收订单-详情-goodsList】响应数据
   */
  type ReturnOrderDetailData_goodsList = {
    bookNo: string
    buyerRemark: any
    costPrice: any
    goodsSequenceNo: any
    id: number
    isbn: string
    isbn10: string
    marketPrice: any
    quantity: number
    remark: any
    salePrice: number
    saleTitle: string
    status: number
    wmsOrderCode: any
  }

  /**
   * @description 【回收订单-列表】响应数据
   */
  type ReturnOrderListData = {
    bagOrderCode: string
    bagOrderId: number
    contactName: string
    contactPhone: string
    createTime: number
    freight: any
    goodsInStatus: any
    id: number
    logisticsSync: boolean
    nextStepFlag: boolean
    nickname: string
    orderCode: string
    phone: string
    pickupTime: any
    reserveTime: any
    sequence: number
    shippingStatus: any
    status: number
    trackingNo: any
    userId: number
  }

  /**
   * @description 【入库订单-详情】响应数据
   */
  type GoodsInOrderDetailData = {
    bagOrderCode: string
    bagOrderId: number
    createTime: number
    expressType: number
    goodsList: any
    id: number
    inspectionTime: number
    nickname: string
    orderCode: string
    phone: string
    returnOrderCode: any
    returnOrderId: number
    sequence: any
    status: number
    userId: number
    wmsOrderCode: any
    subOrderList: GoodsInOrderDetail_subOrderList[]
  }

  /**
   * @description 【入库订单-详情-subOrderList】
   */
  type GoodsInOrderDetail_subOrderList = {
    checkVideoDuration: any
    checkVideoUrl: any
    createTime: any
    goodIsTime: any
    id: number
    isbn: string
    isbn10: string
    productId: number
    productName: string
    productNo: string
    quantity: number
    status: number
    wmsOrderCode: any
  }

  /**
   * @description 【入库订单-列表】响应数据
   */
  type GoodsInOrderListData = {
    bagOrderCode: string
    bagOrderId: number
    createTime: number
    expressType: number
    id: number
    inspectionTime: number
    nickname: string
    orderCode: string
    phone: string
    sequence: number
    staffId: number
    staffName: string
    status: number
    userId: number
  }

  /**
   * @description 【追损订单-详情】响应数据
   */
  type ChaseDamageDetailData = {
    amount: number
    bagOrderCode: string
    bagOrderId: number
    buyerRemark: any
    confirmTime: any
    contactName: string
    contactPhone: string
    createTime: number
    discountAmount: number
    expressCompany: any
    id: number
    nickname: string
    orderCode: string
    outTradeNo: any
    paidAmount: any
    paidTime: any
    payAmount: number
    phone: string
    returnOrderCode: string
    returnOrderId: number
    sellerRemark: any
    sequence: number
    staffId: number
    staffName: string
    status: number
    subOrderList: ChaseDamageDetailData_subOrderList[]
    trackingNo: any
    userId: number
  }

  /**
   * @description 【追损订单-详情-subOrderList】响应数据
   */
  type ChaseDamageDetailData_subOrderList = {
    acceptRemark: any
    amount: number
    buyerRemark: any
    confirmTime: any
    createTime: number
    discountAmount: number
    goodsSequence: string
    id: number
    imgList: string[]
    isbn: string
    payAmount: number
    productId: number
    productName: string
    productNo: string
    salePrice: number
    sellerRemark: string
    status: number
  }

  /**
   * @description 【追损订单-列表】响应数据
   */
  type ChaseDamageData = {
    address: any
    bagOrderCode: string
    bagOrderId: number
    city: any
    contactName: string
    contactPhone: string
    count: number
    county: any
    createTime: number
    expressCompany: any
    id: number
    nickname: string
    orderCode: string
    paidTime: any
    payAmount: number
    phone: string
    province: any
    returnOrderCode: string
    returnOrderId: number
    sellerRemark: any
    sequence: number
    staffId: number
    staffName: string
    status: number
    trackingNo: any
    userId: number
  }

  /**
   * @description 【报损订单-详情】响应数据
   */
  type ReportDamageDetailData = {
    bagOrderCode: string
    createTime: number
    id: number
    nickName: string
    phone: string
    reportCode: string
    staffRemark: any
    status: number
    subReportVos: ReportDamageDetailData_subReportVos[]
  }

  /**
   * @description 【报损订单-详情-subReportVos】
   */
  type ReportDamageDetailData_subReportVos = {
    damageClassify: any
    damageClassifyRemark: any
    damageReportId: number
    damageType: number
    id: number
    imgArr: string[]
    isbn: string
    isbn10: string
    pointsAmount: any
    pointsCompensationAmount: any
    pointsCompensationReason: any
    pointsCompensationStatus: number
    pointsRemark: any
    productCode: string
    productName: string
    reportType: number
    result: any
    staffRemark: any
    staffReply: any
    status: number
    userRemark: string
  }

  /**
   * @description 【异常工单-获取徽标数】响应数据
   */
  type TicketBadgeCount = {
    type1: number
    type2: number
    type3: number
    type4: number
    type5: number
    type6: number
  }


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
