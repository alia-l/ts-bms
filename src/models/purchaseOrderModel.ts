import { useCallback, useState } from 'react';
import { getPurchaseDetail, getPurchaseList } from '@/services/OrderService/api';

export default () => {
  const [renderCount, setRenderCount] = useState<number>(0);
  const [detail, setDetail] = useState<OrderAPI.PurchaseOrderDetailData>();
  const [loading, setLoading] = useState<boolean>(false);
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


  return {
    fetchGetPurchaseList,
    fetchGetPurchaseDetail,
    detail,
    renderCount,
    loading,
  };
}
