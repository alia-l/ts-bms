import { useCallback, useState } from 'react';
import {
  exportShelfReturnExl,
  getReCheckDetail,
  reCheckListV2, submitReCheck,
} from '@/services/OrderService/api';
import { message } from 'antd';
import { env } from '@/conf/conf';


export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<OrderAPI.ReCheckOrderDetailData>();
  /**
   * @description 获取列表
   */
  const fetchReCheckList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await reCheckListV2(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 详情
   */
  const fetchGetReCheckDetail = useCallback(async (params: OrderAPI.ReCheckOrderDetailParams) => {
    setLoading(true);
    try {
      const res: API.Result = await getReCheckDetail(params);
      if (res) {
        const { data } = res || {};
        setDetail(data[0]);
      }
    } catch (e) {
      setLoading(false);

    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * @description 质检复核
   */
  const fetchSubmitReCheck = useCallback(async (params: OrderAPI.SubmitReCheckParams) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await submitReCheck(params);
      if (res) {
        if (res.data) {
          message.success('操作成功');
        }
      }
    } catch (e) {
      message.error('操作失败');
    } finally {
      setSubmitLoading(false);
    }
  }, []);


  /**
   * @description 导出积分申请
   */
  const fetchExportShelfReturnExl = useCallback(async (p: any) => {
    setSubmitLoading(true);
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    delete params._timestamp;
    try {
      const res: API.Result = await exportShelfReturnExl(params);
      if (res) {
        const { data } = res;
        if (data) {
          window.open(`${env.CDN}${data}`);
        }
      } else {
        message.error('操作失败');
      }
    } catch (e) {
      message.error('操作失败');
      setSubmitLoading(false);
    } finally {
      setSubmitLoading(false);
    }
  }, []);


  return {
    fetchReCheckList,
    fetchGetReCheckDetail,
    fetchSubmitReCheck,
    fetchExportShelfReturnExl,
    loading,
    submitLoading,
    detail,
  };
}
