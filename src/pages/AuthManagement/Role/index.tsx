import { getRoleList, updateRole } from '@/services/UserService/api';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Tree } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import routes from '../../../../config/routes';

const AuthManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [listItem, setListItem] = useState<UserAPI.RoleData>();
  const [menuConfig, setMenuConfig] = useState([]);
  // const [selectBtnKeys, setSelectBtnKeys] = useState([]);
  const columns: ProColumns<UserAPI.RoleData>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (_, record: UserAPI.RoleData) => [
        <Button
          type={`link`}
          onClick={() => {
            const { menu, id, name } = record;
            setVisible(true);
            setListItem({
              ...listItem,
              id,
              menuList: menu?.split(','),
              name,
              functionList: record.function?.split(','),
            });
          }}
        >
          菜单权限
        </Button>,
        <Button type={`link`} onClick={() => {}}>
          按钮权限
        </Button>,
        <Button type={`primary`} danger size={'small'}>
          删除
        </Button>,
      ],
    },
  ];

  /**
   * @description 递归遍历菜单
   * @param defaultMenu
   */
  const getMenu = (defaultMenu: any) => {
    defaultMenu.forEach((it: any) => {
      console.log(it);
      it.title = it.name;
      if (it.routes || [].length > 0) {
        it.children = it.routes;
        getMenu(it.children);
      }
    });
    return defaultMenu;
  };

  /**
   * @description 初始化菜单
   */
  const initMenu = () => {
    const defaultMenu = routes.filter((it) => it.showMenu);
    const arr = getMenu(defaultMenu);
    setMenuConfig(arr);
  };

  /**
   * @description 选择菜单
   * @param value
   */
  const onCheckTree = (value: any) => {
    const { checked } = value;
    const { id } = listItem as UserAPI.RoleData;
    setListItem({
      ...listItem,
      menuList: [...checked],
      id,
    });
  };

  useEffect(() => {
    initMenu();
  }, []);

  //table列表
  const getList = async (p: any) => {
    const params = {
      pageNum: p.current,
      size: p.pageSize,
    };
    const res: API.Result = await getRoleList(params);
    res.data.forEach((it: UserAPI.RoleData, index: number) => {
      it.key = `${it?.id ?? ''}${index.toString()}`;
    });
    return {
      data: res?.data || [],
      success: res?.resultStatus?.code === 1000,
      total: res?.dataCount,
      options: false,
    };
  };

  //更新接口
  const fetchUpdateRole = async (params: UserAPI.RoleData) => {
    setSubmitLoading(true);
    try {
      const res: API.Result = await updateRole(params);
      if (res) {
        const { data } = res;
        if (data) {
          message.success('更新成功');
          setVisible(false);
          actionRef.current?.reloadAndRest?.();
        } else {
          message.error('更新失败');
        }
      }
    } catch (e) {
      setSubmitLoading(false);
    } finally {
      setSubmitLoading(false);
    }
  };

  /**
   * @description 更新权限
   */
  const handleSubmitInfo = async () => {
    const { id, name, menuList, functionList } = listItem as UserAPI.RoleData;
    const params = {
      id,
      name,
      menu: menuList.join(','),
      function: functionList.join(','),
    };
    await fetchUpdateRole(params);
  };

  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}
    >
      <ProTable<UserAPI.RoleData>
        columns={columns}
        actionRef={actionRef}
        rowKey="key"
        // @ts-ignore
        request={getList}
        search={false}
        toolBarRender={() => [<Button type={`primary`}>新增权限</Button>]}
      />
      <Drawer
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      >
        <Tree
          checkable
          checkStrictly
          checkedKeys={listItem?.menuList}
          onCheck={onCheckTree}
          defaultExpandAll={true}
          treeData={menuConfig}
        />
        <Button onClick={() => handleSubmitInfo()} loading={submitLoading}>
          保存
        </Button>
      </Drawer>
    </PageContainer>
  );
};

export default AuthManagement;
