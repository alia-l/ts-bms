import { useCallback } from 'react';
import { getRfidRecordList } from '@/services/GoodsService/api';

export default () => {

  /**
   * @description 实体卡分发
   */
  const fetchGetRfidRecordList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.current;
    const res: API.Result = await getRfidRecordList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  return {
    fetchGetRfidRecordList,
  };
}
