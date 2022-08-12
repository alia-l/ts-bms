import { useCallback } from 'react';
import { getTicketList } from '@/services/OrderService/api';

export default () => {
  /**
   * @description 获取用户列表
   */
  const fetchGetTicketList = useCallback(async (p: any, ticketType: string, dueDaysMode: boolean | null, ticketUpdateMode: boolean | null) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ticketType,
      dueDaysMode,
      ticketUpdateMode,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getTicketList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  return {
    fetchGetTicketList,
  };
}
