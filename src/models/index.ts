import { useState, useCallback } from 'react';
import { updateRole } from '@/services/UserService/api';

// 全局用法
// const { xxx } = useModel('文件名', model => ({ xxx: model.xxx}));

export default () => {
  const [token, setToken] = useState('');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const logout = useCallback(() => {
    setToken('');
  }, []);

  const fetchUpdateRole = useCallback(async (params: UserAPI.RoleData) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await updateRole(params);
      if (res) {
        const { data } = res;
        return data;
      }
    } catch (e) {
      setSubmitLoading(false);
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  return {
    token,
    logout,
    submitLoading,
    fetchUpdateRole,
  };
};
