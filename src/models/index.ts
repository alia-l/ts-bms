import { useState, useCallback } from 'react';

export default () => {
  const [btnAuthList, setBtnAuthList] = useState('');
  const [reportDamageSearchProps, setReportDamageSearchProps] = useState<OrderAPI.ReportDamageOrderListParams>();

  const updateBtnAuthList = useCallback((list: any) => {
    setBtnAuthList(list);
  }, []);

  const updateReportDamageSearchProps = useCallback((params: any) => {
    delete params._timestamp;
    setReportDamageSearchProps(params);
  }, []);


  return {
    updateBtnAuthList,
    updateReportDamageSearchProps,
    btnAuthList,
    reportDamageSearchProps,
  };
};
