import { useCallback, useState } from 'react';
import {
  cancelDamageSubOrder,
  exportDamageOrder,
  getDamageInfo,
  getDamageList,
  refundDamageSubOrder,
  updateDamageInfo,
} from '@/services/OrderService/api';
import { env } from '@/conf/conf';
import { message } from 'antd';

export default () => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<OrderAPI.ChaseDamageDetailData>();

  /**
   * @description 获取列表
   */
  const fetchGetDamageList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getDamageList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 导出
   */
  const fetchExportDamageOrder = useCallback(async (p: any) => {
    setSubmitLoading(true);
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    delete params._timestamp;
    try {
      const res: API.Result = await exportDamageOrder(params);
      if (res) {
        const { data } = res;
        if (data) {
          window.open(`${env.CDN}${data}`);
        }
      } else {
        message.error('操作失败');
      }
    } catch (e) {
      message.error('操作失败');
      setSubmitLoading(false);
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description 详情
   */
  const fetchGetDamageInfoDetail = useCallback(async (damageOrderId: number) => {
    setLoading(true);
    try {
      const res: API.Result = await getDamageInfo(damageOrderId);
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
   * @description 取消单独的绘本追损
   */
  const fetchCancelDamageSubOrder = useCallback(async (damageOrderId: number) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await cancelDamageSubOrder(damageOrderId);
      if (res) {
        const { data } = res;
        if (data) {
          message.success('操作成功');
        }
      }
    } catch (e) {
      setSubmitLoading(false);
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description 更新追损单subOrder
   */
  const fetchUpdateDamageInfo = useCallback(async (params: OrderAPI.UpdateDamageInfoParams) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await updateDamageInfo(params);
      if (res) {
        const { data } = res;
        if (data) {
          message.success('操作成功');
        }
      }
    } catch (e) {
      setSubmitLoading(false);
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description 更新追损单subOrder
   */
  const fetchRefundDamageSubOrder = useCallback(async (params: OrderAPI.RefundDamageParams) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await refundDamageSubOrder(params);
      if (res) {
        const { data } = res;
        if (data) {
          message.success('操作成功');
        }
      }
    } catch (e) {
      setSubmitLoading(false);
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  return {
    fetchGetDamageList,
    fetchExportDamageOrder,
    fetchGetDamageInfoDetail,
    fetchCancelDamageSubOrder,
    fetchUpdateDamageInfo,
    fetchRefundDamageSubOrder,
    submitLoading,
    detail,
    loading,
  };
}
