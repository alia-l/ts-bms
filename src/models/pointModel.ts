import { useCallback, useState } from 'react';
import {
  getPointOrderDetail,
  getPointsOrderList, refundPointOrder,
} from '@/services/OrderService/api';
import { message } from 'antd';

export default () => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<OrderAPI.PointOrderDetail>();

  /**
   * @description 获取书袋列表
   */
  const fetchGetPointsOrderList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      pageSize: p.pageSize,
      ...p,
    };
    delete params.current;
    const res: API.Result = await getPointsOrderList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 详情
   */
  const fetchGetPointOrderDetail = useCallback(async (returnOrderId: number) => {
    setLoading(true);
    try {
      const res: API.Result = await getPointOrderDetail(returnOrderId);
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
   * @description
   */
  const fetchRefundPointOrder = useCallback(async (params: any) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await refundPointOrder(params);
      if (res) {
        const { data } = res || {};
        if (data) {
          message.success('操作成功');
        } else {
          message.success('操作失败');
        }
      }
    } catch (e) {
      setSubmitLoading(false);
      message.success('操作失败');

    } finally {
      setSubmitLoading(false);
    }
  }, []);


  return {
    fetchGetPointsOrderList,
    fetchGetPointOrderDetail,
    fetchRefundPointOrder,
    submitLoading,
    detail,
    loading,
  };
}
