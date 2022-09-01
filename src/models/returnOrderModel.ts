import { useCallback, useState } from 'react';
import { getReturnOrderDetail, getReturnOrderList } from '@/services/OrderService/api';


export default () => {
  const [loading, setLoading] = useState<boolean>(false);
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

  return {
    fetchGetReturnOrderList,
    fetchGetReturnOrderDetail,
    loading,
    detail,
  };
}
