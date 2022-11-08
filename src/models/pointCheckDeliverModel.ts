import { useCallback, useState } from 'react';
import {
  confirmAudit,
  getAuditBagDetail,
  getAuditPointsOrderList,
  markUnusual,
  saveUserAddressInCheckDeliver,
} from '@/services/OrderService/api';
import { message } from 'antd';

export default () => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<OrderAPI.CheckDeliverDetailData>();
  /**
   * @description 获取书袋列表
   */
  const fetchGetAuditPointsOrderList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getAuditPointsOrderList(params);
    res.data.forEach((it: any, index: number) => {
      it.key = index.toString();
    });
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  const fetchMarkUnusual = useCallback(async (p: any) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await markUnusual(p);
      if (res) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
    } catch (e) {
      setSubmitLoading(false);
      message.error('操作失败');
    } finally {
      setSubmitLoading(false);
    }

  }, []);


  const fetchSaveUserAddressInCheckDeliver = useCallback(async (p: OrderAPI.SaveUserAddressInCheckDeliverParams) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await saveUserAddressInCheckDeliver(p);
      if (res) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
    } catch (e) {
      setSubmitLoading(false);
      message.error('操作失败');
    } finally {
      setSubmitLoading(false);
    }

  }, []);

  const fetchConfirmAudit = useCallback(async (p: OrderAPI.SaveUserAddressInCheckDeliverParams) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await confirmAudit(p);
      if (res) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
    } catch (e) {
      setSubmitLoading(false);
      message.error('操作失败');
    } finally {
      setSubmitLoading(false);
    }

  }, []);

  const fetchGetAuditBagDetail = useCallback(async (bagOrderId: number) => {
    setLoading(true);
    try {
      const res: API.Result = await getAuditBagDetail(bagOrderId);
      if (res) {
        const { data } = res || {};
        setDetail(data);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }

  }, []);



  return {
    fetchGetAuditPointsOrderList,
    fetchGetAuditBagDetail,
    fetchMarkUnusual,
    fetchConfirmAudit,
    fetchSaveUserAddressInCheckDeliver,
    submitLoading,
    detail,
    loading
  };
}
