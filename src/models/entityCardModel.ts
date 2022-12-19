import { useCallback, useState } from 'react';
import {
  getPointOrderDetail, physicalCardList, refundPointOrder, updateOrderExpressCode,
} from '@/services/OrderService/api';
import { message } from 'antd';
import { getCardUserList } from '@/services/UserService/api';

export default () => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<OrderAPI.PointOrderDetail>();

  /**
   * @description 实体卡分发
   */
  const fetchGetCardUserList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.current;
    const res: API.Result = await getCardUserList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 实体卡制作
   */
  const fetchPhysicalCardList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      pageSize: p.pageSize,
      ...p,
    };
    delete params.current;
    const res: API.Result = await physicalCardList(params);
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
  const fetchUpdateOrderExpressCode = useCallback(async (params: any) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await updateOrderExpressCode(params);
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
    fetchPhysicalCardList,
    fetchGetCardUserList,
    fetchGetPointOrderDetail,
    fetchUpdateOrderExpressCode,
    submitLoading,
    detail,
    loading,
  };
}
