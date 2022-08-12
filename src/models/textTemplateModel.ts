import { useCallback, useState } from 'react';
import { getSendInfoList, sendSmsInfo } from '@/services/UserService/api';
import { message } from 'antd';

export default () => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  /**
   * @description 获取书袋列表
   */
  const fetchGetSendInfoList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getSendInfoList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description  解冻订阅卡
   */
  const fetSendSmsInfo = useCallback(async (params: UserAPI.sendSmsInfoParams) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await sendSmsInfo(params);
      if (res) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
    } catch (e) {
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  return {
    fetchGetSendInfoList,
    fetSendSmsInfo,
    submitLoading,
  };
}
