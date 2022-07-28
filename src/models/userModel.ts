import { useCallback } from 'react';
import { getUserList } from '@/services/UserService/api';

export default () => {
  /**
   * @description 获取列表
   */
  const fetchGetList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getUserList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  return {
    fetchGetList,
  };
};
