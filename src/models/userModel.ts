import { useCallback, useState } from 'react';
import {
  getUserDetail,
  getUserList,
  getUserReferRecord,
  getUserServiceList,
  userLotteryCountList,
} from '@/services/UserService/api';
import {
  anewReport,
  cancelConfirm,
  getBagOrderDetail,
  getBagOrderList,
  getBagSubOrderList,
  getLinkedOrder,
  getUserCouponList,
  getUserPointList, subBagAddRemark, updateBagOrderAddress, updateOverdueTime,
} from '@/services/OrderService/api';
import { message } from 'antd';

export default () => {
  const [detailInfoLoading, setDetailInfoLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<UserAPI.UserDetailData>({});
  const [bagOrderDetail, setBagOrderDetail] = useState<OrderAPI.BagOrderDetailData>();
  const [subBagOrderList, setSubBagOrderList] = useState<OrderAPI.BagSubOrderList[]>();

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
  const fetchGetLinkedOrderList = useCallback(async (p: any, bagOrderId: number) => {
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
    return {
      data: arr || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
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
    setDetailInfoLoading,
    detailInfoLoading,
    detail,
    setBagOrderDetail,
    bagOrderDetail,
    subBagOrderList,
    loading,
    submitLoading,
  };
};
