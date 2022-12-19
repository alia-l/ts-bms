import { useCallback, useState } from 'react';
import {
  completeSelfOrder,
  exportShelfReturnExl,
  getReturnOrderDetail,
  getSelfReturnOrderList,
} from '@/services/OrderService/api';
import { message } from 'antd';
import { env } from '@/conf/conf';


export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<OrderAPI.ReturnOrderDetailData>();
  /**
   * @description 获取列表
   */
  const fetchGetSelfReturnOrderList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getSelfReturnOrderList(params);
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

  /**
   * @description 完成自寄单
   */
  const fetchCompleteSelfOrder = useCallback(async (params:any ) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await completeSelfOrder(params);
      if (res) {
        message.success('操作成功');
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
    fetchGetSelfReturnOrderList,
    fetchGetReturnOrderDetail,
    fetchCompleteSelfOrder,
    fetchExportShelfReturnExl,
    loading,
    submitLoading,
    detail,
  };
}
