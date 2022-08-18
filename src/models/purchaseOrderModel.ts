import { useCallback, useState } from 'react';
import { getPurchaseDetail, getPurchaseList, refundPurchaseSubOrder } from '@/services/OrderService/api';
import { message } from 'antd';

export default () => {
  const [renderCount, setRenderCount] = useState<number>(0);
  const [detail, setDetail] = useState<OrderAPI.PurchaseOrderDetailData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  /**
   * @description 获取列表
   */
  const fetchGetPurchaseList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getPurchaseList(params);
    setRenderCount(renderCount + 1);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 获取详情
   */
  const fetchGetPurchaseDetail = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const res: API.Result = await getPurchaseDetail(id);
      if (res) {
        const { data } = res;
        setDetail(data);
      }
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * @description 获取详情
   */
  const fetchRefundPurchaseSubOrder = useCallback(async (params: OrderAPI.RefundPurchaseSubOrderParams) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await refundPurchaseSubOrder(params);
      if (res) {
        message.success('操作成功')
      }else{
        message.success('操作失败')
      }
    } catch (e) {
      message.success('操作失败')
      setSubmitLoading(false);
    } finally {
      setSubmitLoading(false);
    }
  }, []);


  return {
    fetchGetPurchaseList,
    fetchGetPurchaseDetail,
    fetchRefundPurchaseSubOrder,
    detail,
    renderCount,
    loading,
    submitLoading
  };
}
