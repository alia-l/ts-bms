import { useCallback, useState } from 'react';
import {
  auditPointsOrderConfirm, auditPointsOrderUnusual,
  editPointsInfo,
  getAuditPointsOrderList,
} from '@/services/OrderService/api';
import { message } from 'antd';

export default () => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  /**
   * @description 获取书袋列表
   */
  const fetchGetAuditPointsOrderList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      pageSize: p.pageSize,
      ...p,
    };
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

  /**
   * @description 获取书袋列表
   */
  const fetchGetAuditPointsGiftOrderList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      pageSize: p.pageSize,
      goodsTypes: '54,55',
      ...p,
    };
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

  const fetchAuditPointsOrderConfirm = useCallback(async (p: any) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await auditPointsOrderConfirm(p);
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


  const fetchEditPointsInfo = useCallback(async (p: any) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await editPointsInfo(p);
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

  const fetchAuditPointsOrderUnusual= useCallback(async (p: any) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await auditPointsOrderUnusual(p);
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


  return {
    fetchGetAuditPointsOrderList,
    fetchAuditPointsOrderConfirm,
    fetchAuditPointsOrderUnusual,
    fetchGetAuditPointsGiftOrderList,
    fetchEditPointsInfo,
    submitLoading,
  };
}
