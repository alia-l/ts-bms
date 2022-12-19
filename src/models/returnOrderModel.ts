import { useCallback, useState } from 'react';
import {
  addGoodsIn,
  cancelAppointment,
  cancelReturnOrderForce,
  getReturnOrderDetail,
  getReturnOrderList,
  manualSignIn,
} from '@/services/OrderService/api';
import { message } from 'antd';


export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<OrderAPI.ReturnOrderDetailData>();
  /**
   * @description 获取列表
   */
  const fetchGetReturnOrderList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getReturnOrderList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 详情
   */
  const fetchGetReturnOrderDetail = useCallback(async (returnOrderId: number) => {
    setLoading(true);
    try {
      const res: API.Result = await getReturnOrderDetail(returnOrderId);
      if (res) {
        const { data } = res || {};
        setDetail(data);
      }
    } catch (e) {
      setLoading(false);

    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * @description 确认到仓
   */
  const fetchManualSignIn = useCallback(async (params: OrderAPI.ManualSignInParams) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await manualSignIn(params);
      if (res) {
        message.success('操作成功');
      }
    } catch (e) {
      message.error('操作失败');
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description 验收通过
   */
  const fetchAddGoodsIn = useCallback(async (params: OrderAPI.AddGoodsInParams) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await addGoodsIn(params);
      if (res) {
        message.success('操作成功');
      }
    } catch (e) {
      message.error('操作失败');
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description 取消预约
   */
  const fetchCancelAppointment = useCallback(async (orderCode: string) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await cancelAppointment(orderCode);
      if (res) {
        message.success('操作成功');
      }
    } catch (e) {
      message.error('操作失败');
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description 强制取消快递预约
   */
  const fetchCancelReturnOrderForce = useCallback(async (params: any) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await cancelReturnOrderForce(params);
      if (res) {
        message.success('操作成功');
      }
    } catch (e) {
      message.error('操作失败');
    } finally {
      setSubmitLoading(false);
    }
  }, []);


  return {
    fetchGetReturnOrderList,
    fetchGetReturnOrderDetail,
    fetchManualSignIn,
    fetchCancelAppointment,
    fetchAddGoodsIn,
    fetchCancelReturnOrderForce,
    loading,
    submitLoading,
    detail,
  };
}
