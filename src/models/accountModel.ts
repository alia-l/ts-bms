import { useCallback, useState } from 'react';
import {
  addAccount,
  deleteAccount,
  getAccountList,
  getRoleList,
  resetPwd,
  updateAccount,
} from '@/services/UserService/api';
import { message } from 'antd';

export default () => {
  const [roleList, setRoleList] = useState([]);

  /**
   * @description 获取列表
   */
  const fetchGetList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
    };
    const res: API.Result = await getAccountList(params);
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount as number,
    };
  }, []);

  /**
   * @description 获取权限列表
   */
  const fetchGetRoleList = useCallback(async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
    };
    const res: API.Result = await getRoleList(params);
    if (res) {
      const { data } = res;
      const arr = data.map((it: UserAPI.RoleData) => ({
        label: it.name,
        value: it.id,
      }));
      setRoleList(arr);
    }
  }, []);

  /**
   * @description 添加账号
   */
  const fetchAddAccount = useCallback(async (p: UserAPI.AccountParams) => {
    try {
      const res: API.Result = await addAccount(p);
      if (res) {
        const { data } = res;
        if (data) {
          message.success('添加成功');
        } else {
          message.error('添加失败');
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  /**
   * @description 更新账号
   */
  const fetchUpdateAccount = useCallback(async (p: UserAPI.AccountParams) => {
    try {
      const res: API.Result = await updateAccount(p);
      if (res) {
        message.success('更新成功');
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  /**
   * @description 更新账号
   */
  const fetchDeleteAccount = useCallback(async (staffId: number) => {
    try {
      const res: API.Result = await deleteAccount(staffId);
      if (res) {
        message.success('删除成功');
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  /**
   * @description 更新账号
   */
  const fetchResetPassword = useCallback(async (staffId: number) => {
    try {
      const res: API.Result = await resetPwd(staffId);
      if (res) {
        message.success('重置成功');
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return {
    roleList,
    fetchGetList,
    fetchGetRoleList,
    fetchAddAccount,
    fetchUpdateAccount,
    fetchDeleteAccount,
    fetchResetPassword,
  };
};
