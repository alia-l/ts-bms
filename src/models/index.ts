import { useState, useCallback } from 'react';

// 全局用法
// const { xxx } = useModel('文件名', model => ({ xxx: model.xxx}));

export default () => {
  const [token, setToken] = useState('');

  const logout = useCallback(() => {
    setToken('');
  }, []);

  return {
    token,
    logout,
  };
};
