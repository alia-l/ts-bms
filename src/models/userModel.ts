import { useCallback, useState } from 'react';
import {
  getUserDetail,
  getUserList,
  getUserReferRecord,
  getUserServiceList,
  userLotteryCountList,
  freezeOrder,
  addStopCount,
  notFreezeOrder,
  extendExpiredTime,
  getExtendRecordList,
} from '@/services/UserService/api';
import {
  anewReport,
  cancelConfirm,
  getBagOrderDetail,
  getBagOrderList,
  getBagSubOrderList,
  getLinkedOrder,
  getUserCouponList,
  getUserPointList,
  getUserServiceCardDetail,
  manualCatchNextBag,
  recoverUserCoupon,
  subBagAddRemark,
  updateBagOrderAddress,
  updateOverdueTime,
  updateUserCouponExtendExpired,
} from '@/services/OrderService/api';
import { message } from 'antd';

export default () => {
  const [detailInfoLoading, setDetailInfoLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<UserAPI.UserDetailData>({});
  const [bagOrderDetail, setBagOrderDetail] = useState<OrderAPI.BagOrderDetailData>();
  const [subscribeDetail, setSubscribeDetail] = useState<OrderAPI.SubscribeDetailData>();
  const [subBagOrderList, setSubBagOrderList] = useState<OrderAPI.BagSubOrderList[]>();
  const [subscribeBagOrderList, setSubscribeBagOrderList] = useState<OrderAPI.SubScribeDetail_BagOrderList[]>();
  const [subscribeBigGiftList, setSubscribeBigGiftList] = useState<OrderAPI.SubScribeDetail_BigGiftList[]>();
  const [deviceList, setSubscribeDeviceList] = useState<OrderAPI.SubScribeDetail_DeviceList[]>();
  const [referList, setReferList] = useState<any>();
  const [expiredTimeList, setExpiredTimeList] = useState<UserAPI.ExpiredTimeData[]>();


  /**
   * @description 获取用户列表
   */
  const fetchGetList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getUserList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 获取关联订单
   */
  const fetchGetLinkedOrderList = useCallback(async (bagOrderId: number) => {
    setLoading(true);
    try {
      const res: API.Result = await getLinkedOrder(bagOrderId);
      const { data } = res;
      const {
        damageOrderList = [],
        damageReportList = [],
        goodsInOrderList = [],
        overdueOrderList = [],
        purchaseOrderList = [],
        returnOrderList = [],
      } = data || {};

      const arr = [
        ...damageOrderList,
        ...damageReportList,
        ...goodsInOrderList,
        ...overdueOrderList,
        ...purchaseOrderList,
        ...returnOrderList,
      ];
      setReferList(arr);
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }

  }, []);

  /**
   * @description 获取积分列表
   */
  const fetchGetUserPointList = useCallback(async (p: any, userId: number) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      userId,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getUserPointList(params);
    const data = res.data?.pointsRecordList;
    return {
      data: data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 获取关系记录列表
   */
  const fetchGetUserReferList = useCallback(async (p: any, userId: number) => {
    const res: API.Result = await getUserReferRecord(userId);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 获取抽奖列表
   */
  const fetchGetLotteryCountList = useCallback(async (p: any, userId: number) => {
    const params = {
      userId,
    };
    const res: API.Result = await userLotteryCountList(params);
    const data = res.data ? [res.data] : [];
    return {
      data: data,
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 获取订阅列表
   */
  const fetchGetSubscribeList = useCallback(async (p: any, phone: string) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      phone,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getUserServiceList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 获取书袋列表
   */
  const fetchGetBagList = useCallback(async (p: any, phone: string) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      phone,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getBagOrderList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 获取优惠券列表
   */
  const fetchGetCouponList = useCallback(async (p: any, id: number) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
    };
    const res: API.Result = await getUserCouponList(params, id);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 获取用户列表详情
   */
  const fetchGetUserDetail = useCallback(async (id: number) => {
    setDetailInfoLoading(true);
    try {
      const res: API.Result = await getUserDetail(id);
      if (res) {
        setDetail(res.data);
      }
    } catch (e) {

    } finally {
      setDetailInfoLoading(false);
    }
  }, []);

  /**
   * @description  获取书袋详情信息
   */
  const fetchGetBagOrderDetail = useCallback(async (bagOrderId: number) => {
    setLoading(true);
    try {
      const res: API.Result = await getBagOrderDetail(bagOrderId);
      if (res) {
        setBagOrderDetail(res?.data);
        const sub = await getBagSubOrderList(bagOrderId);
        if (sub) {
          setSubBagOrderList(sub?.data);
        }
      }
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * @description  更新逾期时间
   */
  const fetchUpdateOverdueTime = useCallback(async (params: OrderAPI.OverdueTimeParams) => {
    try {
      const res: API.Result = await updateOverdueTime(params);
      if (res) {
        message.success('时间更新成功');
      } else {
        message.error('时间更新失败');
      }
    } catch (e) {
    }
  }, []);

  /**
   * @description  更新备注
   */
  const fetchUpdateSubAddRemark = useCallback(async (params: OrderAPI.SubBagAddRemarkParams) => {
    try {
      const res: API.Result = await subBagAddRemark(params);
      if (res) {
        message.success('备注更新成功');
      } else {
        message.error('备注更新失败');
      }
    } catch (e) {
    }
  }, []);

  /**
   * @description  允许用户重新报损
   */
  const fetchAnewReport = useCallback(async (bagOrderId: number) => {
    try {
      const res: API.Result = await anewReport(bagOrderId);
      if (res) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
    } catch (e) {
    }
  }, []);

  /**
   * @description  允许用户重新报损
   */
  const fetchCancelConfirm = useCallback(async (bagOrderId: number) => {
    try {
      const res: API.Result = await cancelConfirm(bagOrderId);
      if (res) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
    } catch (e) {
    }
  }, []);

  /**
   * @description  更新地址
   */
  const fetchUpdateBagOrderAddress = useCallback(async (params: OrderAPI.UpdateAddressParams, id: number) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await updateBagOrderAddress(params);
      if (res) {
        message.success('操作成功');
        await fetchGetBagOrderDetail(id);
      } else {
        message.error('操作失败');
      }
    } catch (e) {
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description  获取订阅详情
   */
  const fetchGetUserServiceCardDetail = useCallback(async (params: OrderAPI.SubscribeDetailParams) => {
    setLoading(true);
    try {
      const res: API.Result = await getUserServiceCardDetail(params);
      if (res) {
        setSubscribeDetail(res?.data || {});
        setSubscribeBagOrderList(res.data?.bagOrderList);
        setSubscribeBigGiftList(res.data?.bigGiftList);
        setSubscribeDeviceList(res.data?.deviceList);
      }
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * @description  生成下一个书袋
   */
  const fetchManualCatchNextBag = useCallback(async (serviceCardId: number) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await manualCatchNextBag(serviceCardId);
      if (res) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
    } catch (e) {
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description  冻结订阅卡
   */
  const fetchFreezeOrder = useCallback(async (params: UserAPI.FreezeOrderParams) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await freezeOrder(params);
      if (res) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
    } catch (e) {
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description  解冻订阅卡
   */
  const fetchNotFreezeOrder = useCallback(async (userServiceCardId: number) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await notFreezeOrder(userServiceCardId);
      if (res) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
    } catch (e) {
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description  增加一次暂停次数
   */
  const fetchAddStopCount = useCallback(async (userServiceCardId: number) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await addStopCount(userServiceCardId);
      if (res) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
    } catch (e) {
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description  增加一次暂停次数
   */
  const fetchExtendExpiredTime = useCallback(async (params: UserAPI.ExpiresTimeParams) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await extendExpiredTime(params);
      if (res) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
    } catch (e) {
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description  增加一次暂停次数
   */
  const fetchGetExtendRecordList = useCallback(async (userServiceCardId: number) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await getExtendRecordList(userServiceCardId);
      if (res) {
        const { data } = res;
        setExpiredTimeList(data);
      }
    } catch (e) {
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description  恢复用户优惠券
   */
  const fetchRecoverUserCoupon = useCallback(async (userCouponId: number) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await recoverUserCoupon(userCouponId);
      if (res) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
    } catch (e) {
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description  更新用户优惠券过期时间
   */
  const fetchUpdateUserCouponExtendExpired = useCallback(async (userCouponId: number, expireTime: string) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await updateUserCouponExtendExpired(userCouponId, expireTime);
      if (res) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
    } catch (e) {
    } finally {
      setSubmitLoading(false);
    }
  }, []);


  return {
    fetchGetList,
    fetchGetUserDetail,
    fetchGetBagList,
    fetchGetCouponList,
    fetchGetSubscribeList,
    fetchGetUserPointList,
    fetchGetLotteryCountList,
    fetchGetUserReferList,
    fetchGetBagOrderDetail,
    fetchUpdateOverdueTime,
    fetchUpdateSubAddRemark,
    fetchAnewReport,
    fetchCancelConfirm,
    fetchUpdateBagOrderAddress,
    fetchGetLinkedOrderList,
    fetchGetUserServiceCardDetail,
    fetchManualCatchNextBag,
    fetchNotFreezeOrder,
    fetchFreezeOrder,
    fetchAddStopCount,
    fetchExtendExpiredTime,
    fetchGetExtendRecordList,
    fetchRecoverUserCoupon,
    fetchUpdateUserCouponExtendExpired,
    setDetailInfoLoading,
    detailInfoLoading,
    detail,
    setBagOrderDetail,
    bagOrderDetail,
    subBagOrderList,
    loading,
    submitLoading,
    referList,
    subscribeDetail,
    subscribeBagOrderList,
    subscribeBigGiftList,
    deviceList,
    expiredTimeList,
  };
};
