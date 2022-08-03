import { useState, useCallback } from 'react';

export default () => {
  const [btnAuthList, setBtnAuthList] = useState('');

  const updateBtnAuthList = useCallback((list: any) => {
    setBtnAuthList(list);
  }, []);

  return {
    updateBtnAuthList,
    btnAuthList,
  };
};
