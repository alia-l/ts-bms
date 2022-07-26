import { useState, useCallback } from 'react';

// 全局用法
// const { xxx } = useModel('文件名', model => ({ xxx: model.xxx}));

export default () => {
  const [token, setToken] = useState('111');

  const logout = useCallback(() => {
    setToken('');
  }, []);

  return {
    token,
    logout,
  };
};
