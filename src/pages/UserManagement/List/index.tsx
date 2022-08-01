import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import { Button, Tag } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { LEAD_LEVEL } from '@/conf/conf';
import { history } from 'umi';

const UserList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { fetchGetList, setSearch, search } = useModel('userModel');
  const columns: ProColumns<UserAPI.UserListData>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户姓名',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '用户手机',
      dataIndex: 'phone',
      copyable: true,
      key: 'phone',
    },
    {
      title: '角色',
      dataIndex: 'roleValue',
      key: 'roleValue',
      hideInSearch: true,
    },
    {
      title: '订阅服务',
      dataIndex: 'serviceName',
      key: 'serviceName',
      hideInSearch: true,
    },
    {
      title: '绑定关系',
      dataIndex: 'superNickname',
      key: 'superNickname',
      hideInSearch: true,
      render: (_, record) => {
        const { superLevel, superNickname, superPhone } = record;
        const item = LEAD_LEVEL.find((it) => it.value === superLevel) || {};
        return (
          <>
            <Tag color={item?.color}>{item?.label}</Tag>
            {superNickname}/{superPhone}
          </>
        );
      },
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      width: 180,
      render: (_, record) => {
        const { id, phone } = record;
        return (
          <Button type={'link'} size={'small'} onClick={() => {
            history.push(`/user/detail/${id}/${phone}`);
            setSearch(false);
          }}>
            详情
          </Button>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<UserAPI.UserListData>
        columns={columns}
        actionRef={actionRef}
        search={{
          labelWidth: 80,
          collapsed: false,
          collapseRender: () => null,
          optionRender: (searchConfig, formProps) => [
            <Button
              key='reset'
              onClick={() => {
                formProps.form?.resetFields(); // 重置表单
                setSearch(false);
              }}
            >
              {searchConfig.resetText}
            </Button>,
            <Button
              type='primary'
              key='search'
              onClick={() => {
                formProps.form?.submit();
                setSearch(true);
              }}
            >
              {searchConfig.searchText}
            </Button>,
          ],
        }}
        rowKey='id'
        request={search ? fetchGetList : async () =>
          ({
            data: [],
            success: true,
            total: 0,
          })
        }
      />
    </PageContainer>
  );
};
export default UserList;
