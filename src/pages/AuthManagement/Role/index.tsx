import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Checkbox, Col, Drawer, Input, Row, Tree, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import routes from '../../../../config/routes';
import { BTN_ACCESS_GROUPS } from '@/conf/conf';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const AuthManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { fetchUpdateRole, fetchGetList, fetchAddRole, fetchDeleteRole, submitLoading } =
    useModel('roleModel');
  const [visible, setVisible] = useState<boolean>(false);
  const [btnVisible, setBtnVisible] = useState<boolean>(false);
  const [listItem, setListItem] = useState<UserAPI.RoleData>();
  const [menuConfig, setMenuConfig] = useState([]);
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
      render: (_, record: UserAPI.RoleData) => {
        const { menu, id, name } = record;
        return [
          <Button
            type={`link`}
            key={'menu'}
            onClick={() => {
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
          <Button
            type={`link`}
            key="btn"
            onClick={() => {
              setBtnVisible(true);
              setListItem({
                ...listItem,
                id,
                menuList: menu?.split(','),
                name,
                functionList: record.function?.split(','),
              });
            }}
          >
            按钮权限
          </Button>,
          <Button
            type={`primary`}
            key={'delete'}
            danger
            size={'small'}
            onClick={() => {
              confirm({
                title: '提示',
                icon: <ExclamationCircleOutlined />,
                content: '是否要删除权限',
                async onOk() {
                  await fetchDeleteRole(id);
                  actionRef.current?.reloadAndRest?.();
                },
              });
            }}
          >
            删除
          </Button>,
        ];
      },
    },
  ];

  /**
   * @description 递归遍历菜单
   * @param defaultMenu
   */
  const getMenu = (defaultMenu: any) => {
    defaultMenu.forEach((it: any) => {
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

  useEffect(() => {
    initMenu();
  }, []);

  /**
   * @description 关闭
   */
  const onClose = () => {
    setVisible(false);
    setBtnVisible(false);
    actionRef.current?.reload();
  };

  /**
   * @description 更新/添加菜单权限
   */
  const handleSubmitInfo = async () => {
    const { id, name, menuList, functionList } = listItem as UserAPI.RoleData;
    if (id === 0) {
      const params = {
        name,
        menu: menuList.join(','),
        function: '',
      };
      await fetchAddRole(params);
      onClose();
    } else {
      const params = {
        id,
        name,
        menu: menuList.join(','),
        function: functionList.join(','),
      };
      await fetchUpdateRole(params);
      onClose();
    }
  };

  /**
   * @description 选择菜单
   * @param value
   */
  const checkMenuTree = (value: any) => {
    const { checked } = value;
    setListItem({
      ...listItem,
      menuList: [...checked],
    });
  };

  /**
   * @description 更改菜单名称
   * @param e
   */
  const changeMenuInput = (e: any) => {
    const { value } = e.target;
    setListItem({
      ...listItem,
      name: value,
    });
  };

  /**
   * @description 更改按钮
   * @param v
   */
  const changeBtnCheckBox = (v: any) => {
    setListItem({
      ...listItem,
      functionList: v,
    });
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
        rowKey="id"
        request={fetchGetList}
        search={false}
        toolBarRender={() => [
          <Button
            type={`primary`}
            key={'add'}
            onClick={() => {
              setVisible(true);
              setListItem({
                ...listItem,
                id: 0,
                menuList: '',
                name: '',
                functionList: '',
              });
            }}
          >
            新增权限
          </Button>,
        ]}
      />
      <Drawer
        title={'菜单权限'}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        width={400}
      >
        <Input
          style={{ marginBottom: 16 }}
          placeholder={'请填写权限名称'}
          value={listItem?.name}
          onChange={changeMenuInput}
        />
        <Tree
          checkable
          checkStrictly
          checkedKeys={listItem?.menuList}
          onCheck={checkMenuTree}
          defaultExpandAll={true}
          treeData={menuConfig}
        />
        <Button
          style={{ marginTop: 16 }}
          onClick={() => handleSubmitInfo()}
          loading={submitLoading}
          type={'primary'}
        >
          保存
        </Button>
      </Drawer>
      <Drawer
        title={'按钮权限'}
        visible={btnVisible}
        onClose={() => {
          setBtnVisible(false);
        }}
      >
        <Checkbox.Group value={listItem?.functionList} onChange={changeBtnCheckBox}>
          <Row>
            {BTN_ACCESS_GROUPS.map((it) => (
              <Col span={14} key={it.value}>
                <Checkbox value={it.value}>{it.label}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
        <Button
          style={{ marginTop: 16 }}
          onClick={() => handleSubmitInfo()}
          loading={submitLoading}
          type={'primary'}
        >
          保存
        </Button>
      </Drawer>
    </PageContainer>
  );
};

export default AuthManagement;
