import { useCallback, useState } from 'react';
import {
  completePointsCompensation, damageReportV2,
  exportPointsApply,
  exportSubReport,
  getDamageReportList,
  getReportDetail, subReportDamageClassify, subReportPointCompensation, subReportReply,
} from '@/services/OrderService/api';
import { message } from 'antd';
import { env } from '@/conf/conf';

export default () => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [reportDetail, setReportDetail] = useState<OrderAPI.ReportDamageDetailData>();
  const [staffRemark, setStaffRemark] = useState<string>('');

  /**
   * @description 获取列表
   */
  const fetchGetDamageReportList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getDamageReportList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 完成积分订单
   */
  const fetchCompletePointsCompensation = useCallback(async (bagOrderCodeList: string) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await completePointsCompensation(bagOrderCodeList);
      if (res) {
        message.success('操作成功');
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

  /**
   * @description 导出积分申请
   */
  const fetchExportPointsApply = useCallback(async (p: any) => {
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
      const res: API.Result = await exportPointsApply(params);
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

  /**
   * @description 导出子订单
   */
  const fetchExportSubReport = useCallback(async (p: any) => {
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
      const res: API.Result = await exportSubReport(params);
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

  /**
   * @description 获取报损详情
   */
  const fetchGetReportDetail = useCallback(async (damageReportId: number) => {
    setLoading(true);
    try {
      const res: API.Result = await getReportDetail(damageReportId);
      if (res) {
        const { data } = res;
        setReportDetail(data);
        setStaffRemark(data.staffRemark)
      }
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * @description 回复
   */
  const fetchSubReportReply = useCallback(async (params: { reply: string, subReportId: number }) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await subReportReply(params);
      if (res) {
        message.success('操作成功');
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

  /**
   * @description 标记积分补偿
   */
  const fetchSubReportPointCompensation = useCallback(async (params: OrderAPI.PointCompensationParams) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await subReportPointCompensation(params);
      if (res) {
        message.success('操作成功');
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

  /**
   * @description 报损原因分类
   */
  const fetchSubReportDamageClassify = useCallback(async (params: OrderAPI.DamageTypeParams) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await subReportDamageClassify(params);
      if (res) {
        message.success('操作成功');
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

  /**
   * @description 报损原因分类
   */
  const fetchDamageReportV2 = useCallback(async (params: OrderAPI.StaffReportParams) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await damageReportV2(params);
      if (res) {
        message.success('操作成功');
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
    fetchGetDamageReportList,
    fetchCompletePointsCompensation,
    fetchExportPointsApply,
    fetchExportSubReport,
    fetchGetReportDetail,
    fetchSubReportReply,
    fetchSubReportPointCompensation,
    fetchSubReportDamageClassify,
    fetchDamageReportV2,
    reportDetail,
    staffRemark,
    setStaffRemark,
    loading,
    submitLoading,
  };
}
