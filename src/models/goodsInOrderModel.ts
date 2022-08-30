import { useCallback, useState } from 'react';
import { getGoodsInOrderDetail, getGoodsInOrderList } from '@/services/OrderService/api';


export default () => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<OrderAPI.GoodsInOrderDetailData>();
  /**
   * @description 获取列表
   */
  const fetchGetGoodsInOrderList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getGoodsInOrderList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 详情
   */
  const fetchGetGoodsInOrderDetail = useCallback(async (goodsInOrderId: number) => {
    setLoading(true);
    try {
      const res: API.Result = await getGoodsInOrderDetail(goodsInOrderId);
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
    fetchGetGoodsInOrderList,
    fetchGetGoodsInOrderDetail,
    loading,
    detail,
  };
}
