import { useCallback, useState } from 'react';
import { getLostTicketList, overTicketList } from '@/services/OrderService/api';
import { message } from 'antd';

export default () => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  /**
   * @description 获取书袋列表
   */
  const fetchGetLostTicketList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getLostTicketList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  const fetchOverTicketList = useCallback(async (p: any) => {
    setSubmitLoading(true)
    try {
      const res: API.Result = await overTicketList(p);
      if (res) {
        message.success('操作成功');
      } else {
        message.success('操作失败');
      }
    } catch (e) {
      setSubmitLoading(false)
      message.success('操作失败');
    } finally {
      setSubmitLoading(false)
    }

  }, []);

  return {
    fetchGetLostTicketList,
    fetchOverTicketList,
    submitLoading
  };
}
