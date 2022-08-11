import { useCallback } from 'react';
import { getBagOrderList } from '@/services/OrderService/api';

export default ()=>{
  /**
   * @description 获取书袋列表
   */
  const fetchGetBagList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getBagOrderList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  return {
    fetchGetBagList,
  }
}
