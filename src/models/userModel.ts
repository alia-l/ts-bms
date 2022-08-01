import { useCallback, useState } from 'react';
import { getUserDetail, getUserList, getUserServiceList } from '@/services/UserService/api';
import { getBagOrderList, getUserCouponList } from '@/services/OrderService/api';

export default () => {
  const [search, setSearch] = useState<boolean>(false);
  const [detailInfoLoading, setDetailInfoLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<UserAPI.UserDetailData>({});

  /**
   * @description 获取用户列表
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

  /**
   * @description 获取订阅列表
   */
  const fetchGetSubscribeList = useCallback(async (p: any, phone: string) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      phone,
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

  /**
   * @description 获取书袋列表
   */
  const fetchGetBagList = useCallback(async (p: any, phone: string) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
      phone,
      ...p,
    };
    delete params.pageSize;
    delete params.current;
    const res: API.Result = await getBagOrderList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 获取优惠券列表
   */
  const fetchGetCouponList = useCallback(async (p: any, id: number) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
    };
    const res: API.Result = await getUserCouponList(params, id);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 获取用户列表详情
   */
  const fetchGetUserDetail = useCallback(async (id: number) => {
    setDetailInfoLoading(true);
    try {
      const res: API.Result = await getUserDetail(id);
      if (res) {
        setDetail(res.data);
      }
    } catch (e) {

    } finally {
      setDetailInfoLoading(false);
    }
  }, []);

  return {
    fetchGetList,
    fetchGetUserDetail,
    fetchGetBagList,
    fetchGetCouponList,
    fetchGetSubscribeList,
    setSearch,
    setDetailInfoLoading,
    detailInfoLoading,
    search,
    detail,
  };
};
