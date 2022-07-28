import React, { useEffect, useRef, useState } from 'react';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, Modal } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const AccountManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const {
    fetchGetList,
    fetchGetRoleList,
    fetchAddAccount,
    fetchUpdateAccount,
    fetchDeleteAccount,
    fetchResetPassword,
    roleList,
  } = useModel('accountModel');
  const [visible, setVisible] = useState<boolean>(false);
  const [detail, setDetail] = useState<UserAPI.AccountData>();
  const columns: ProColumns<UserAPI.AccountData>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '员工姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色',
      dataIndex: 'staffRole',
      key: 'staffRole',
      render: (text) => {
        const { name } = text as UserAPI.AccountData;
        return name;
      },
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      width: 180,
      render: (_, record) => {
        const { id } = record;
        return [
          <Button
            type={'link'}
            key="detail"
            onClick={() => {
              setTimeout(() => {
                formRef?.current?.setFieldsValue(record);
                setDetail(record);
              }, 100);
              setVisible(true);
            }}
          >
            详情
          </Button>,
          <Button
            type={'primary'}
            size={'small'}
            key="reset"
            onClick={() => {
              confirm({
                title: '提示',
                icon: <ExclamationCircleOutlined />,
                content: '是否重置密码',
                async onOk() {
                  await fetchResetPassword(id as number);
                  actionRef.current?.reload();
                },
              });
            }}
          >
            重置密码
          </Button>,
          <Button
            type="primary"
            danger
            size={'small'}
            key="delete"
            onClick={async () => {
              confirm({
                title: '提示',
                icon: <ExclamationCircleOutlined />,
                content: '是否要删除账号',
                async onOk() {
                  await fetchDeleteAccount(id as number);
                  actionRef.current?.reload();
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
   * @description 初始化
   */
  const initData = async () => {
    await fetchGetRoleList({ pageNum: 1, size: 30 });
  };

  /**
   * @description 关闭
   */
  const onClose = () => {
    setVisible(false);
    setDetail({});
    actionRef.current?.reload();
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <PageContainer>
      <ProTable<UserAPI.AccountData>
        columns={columns}
        actionRef={actionRef}
        rowKey="id"
        request={fetchGetList}
        search={false}
        toolBarRender={() => [
          <Button
            type={`primary`}
            key="add"
            onClick={() => {
              setVisible(true);
            }}
          >
            新增账号
          </Button>,
        ]}
      />
      <Drawer
        title={'账号详情'}
        visible={visible}
        onClose={() => {
          setVisible(false);
          setDetail({});
        }}
      >
        <ProForm
          formRef={formRef}
          onFinish={async (values) => {
            if (detail?.id) {
              values.id = detail?.id;
              await fetchUpdateAccount(values);
            } else {
              await fetchAddAccount(values);
            }
            onClose();
          }}
        >
          <ProFormText
            width="md"
            name="name"
            required
            label="姓名"
            placeholder="请输入姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          />
          <ProFormText
            width="md"
            name="phone"
            required
            label="手机号"
            placeholder="请输入手机号"
            rules={[{ required: true, message: '请输入手机号' }]}
          />
          <ProFormText width="md" name="email" label="邮箱" placeholder="请输入邮箱" />
          <ProFormSelect
            name="roleId"
            label="权限"
            request={async () => roleList}
            placeholder="请选择权限"
            rules={[{ required: true, message: '请选择权限' }]}
          />
        </ProForm>
      </Drawer>
    </PageContainer>
  );
};

export default AccountManagement;
