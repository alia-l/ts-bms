import { useCallback } from 'react';
import { getUserServiceList } from '@/services/UserService/api';

export default ()=>{
  /**
   * @description 获取书袋列表
   */
  /**
   * @description 获取订阅列表
   */
  const fetchGetSubscribeList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getUserServiceList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  return {
    fetchGetSubscribeList
  }
}
