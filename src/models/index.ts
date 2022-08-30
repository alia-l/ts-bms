import { getOSSData } from '@/services/ThirdpartyService/api';
import { useState, useCallback } from 'react';

export default () => {
  const [btnAuthList, setBtnAuthList] = useState('');
  const [reportDamageSearchProps, setReportDamageSearchProps] = useState<OrderAPI.ReportDamageOrderListParams>();
  const [chaseDamageSearchProps, setChaseDamageSearchProps] = useState<OrderAPI.ChaseDamageDetailData>();
  const [ossData, setOssData] = useState<ThirdPartyAPI.OssInfoData>();

  /**
   *
   * @description 按钮权限
   *
   */
  const updateBtnAuthList = useCallback((list: any) => {
    setBtnAuthList(list);
  }, []);

  /**
   *
   *@description 报损订单搜索条件
   *
   */
  const updateReportDamageSearchProps = useCallback((params: any) => {
    delete params._timestamp;
    setReportDamageSearchProps(params);
  }, []);

  /**
   *
   * @description 追损订单搜索条件
   *
   */
  const updateChaseDamageSearchProps = useCallback((params: any) => {
    delete params._timestamp;
    setChaseDamageSearchProps(params);
  }, []);

  /**
   *
   * @description 获取Oss签名
   *
   */
  const fetchGetOSSData = useCallback(async (path: string) => {
    try {
      const res = await getOSSData(path);
      if (res) {
        const { data } = res;
        setOssData(data);
      }
    } catch (e) {

    }
  }, []);


  return {
    updateBtnAuthList,
    updateReportDamageSearchProps,
    updateChaseDamageSearchProps,
    btnAuthList,
    reportDamageSearchProps,
    chaseDamageSearchProps,
    fetchGetOSSData,
    ossData,
  };
};
