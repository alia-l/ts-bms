import { useState, useCallback } from 'react';
import { addRole, deleteRole, getRoleList, updateRole } from '@/services/UserService/api';
import { message } from 'antd';

export default () => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  /**
   * @description 更新菜单
   */
  const fetchDeleteRole = useCallback(async (id) => {
    try {
      const res: API.Result = await deleteRole(id);
      if (res) {
        const { data } = res;
        if (data) {
          message.success('更新成功');
        } else {
          message.success('更新失败');
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  /**
   * @description 更新菜单
   */
  const fetchUpdateRole = useCallback(async (params: UserAPI.RoleData) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await updateRole(params);
      if (res) {
        const { data } = res;
        if (data) {
          message.success('更新成功');
        } else {
          message.success('更新失败');
        }
      }
    } catch (e) {
      setSubmitLoading(false);
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description 添加菜单
   */
  const fetchAddRole = useCallback(async (params: UserAPI.RoleData) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await addRole(params);
      if (res) {
        const { data } = res;
        if (data) {
          message.success('更新成功');
        } else {
          message.success('更新失败');
        }
      }
    } catch (e) {
      setSubmitLoading(false);
    } finally {
      setSubmitLoading(false);
    }
  }, []);

  /**
   * @description 获取列表
   */
  const fetchGetList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
    };
    const res: API.Result = await getRoleList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  return {
    submitLoading,
    fetchUpdateRole,
    fetchGetList,
    fetchAddRole,
    fetchDeleteRole,
  };
};
