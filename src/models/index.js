import { useState, useCallback } from 'react';

// 全局用法
// const { xxx } = useModel('index', model => ({ xxx: model.xxx}));

export default function useAuthModel() {
  const [token, setToken] = useState('');

  const logout = useCallback(() => {
    setToken('');
  }, []);

  return {
    token,
    logout,
  };
}
