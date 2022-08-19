import { useCallback, useState } from 'react';
import {
  addTicketRecord,
  changeLostOrderRecord,
  getLostTicketList,
  getTicketList,
  getTicketRecordList,
  getTicketTimeoutCount,
} from '@/services/OrderService/api';
import { message } from 'antd';

export default () => {
  // const [ticketRecord, setTicketRecord] = useState<OrderAPI.TicketDetailData>();
  const [ticketRecordList, setTicketRecordList] = useState<OrderAPI.TicketDetail_ticketRecordList[]>();
  const [lostTicketRecord, setLostTicketRecord] = useState<OrderAPI.AddLostTicketRecordData>();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [badgeCount, setBadgeCount] = useState<OrderAPI.TicketBadgeCount>();
  /**
   * @description 获取工单列表
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

  /**
   * @description 获取工单详情
   */
  const fetchGetTicketRecordList = useCallback(async (ticketId: number) => {
    try {
      const res: API.Result = await getTicketRecordList(ticketId);
      if (res) {
        const { data } = res;
        // setTicketRecord(data || {});
        setTicketRecordList(data.ticketRecordList || []);
      }
    } catch (e) {

    }
  }, []);

  /**
   * @description 获取工单详情
   */
  const fetchGetLostTicketList = useCallback(async (params: OrderAPI.AddLostTicketRecordParams) => {
    try {
      const res: API.Result = await getLostTicketList(params);
      if (res) {
        const { data } = res;
        setLostTicketRecord(data && data[0] || {});
      }
    } catch (e) {

    }
  }, []);

  /**
   * @description  添加跟进记录
   */
  const fetchAddTicketRecord = useCallback(async (params: OrderAPI.AddTicketRecordParams) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await addTicketRecord(params);
      if (res) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
    } catch (e) {
      setSubmitLoading(false);
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description  保存跟进记录
   */
  const fetchChangeLostOrderRecord = useCallback(async (params: OrderAPI.SubmitLostTicketParams) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await changeLostOrderRecord(params);
      if (res) {
        message.success('操作成功');
      } else {
        message.error('操作失败');
      }
    } catch (e) {
      setSubmitLoading(false);
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description  获取徽标数
   */
  const fetchGetTicketTimeoutCount = useCallback(async () => {
    try {
      const res: API.Result = await getTicketTimeoutCount();
      if (res) {
        const { data } = res;
        setBadgeCount(data);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);


  return {
    fetchGetTicketList,
    fetchGetTicketRecordList,
    fetchGetLostTicketList,
    fetchAddTicketRecord,
    fetchChangeLostOrderRecord,
    fetchGetTicketTimeoutCount,
    ticketRecordList,
    lostTicketRecord,
    submitLoading,
    badgeCount
  };
}
