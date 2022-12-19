import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import { Button, Tag } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { LEAD_LEVEL } from '@/conf/conf';
import { history } from 'umi';

const UserList: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const { fetchGetList } = useModel('userModel');
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
        hideInTable: true,
      },
      {
        title: '用户姓名',
        dataIndex: 'realName',
        key: 'realName',
        render: (text, record) => {
          const { nickname } = record;
          return `${nickname || '-'}/${text || ''}`;
        },
        hideInSearch: true,
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
          const { superLevel, superNickname, superPhone, superRealName } = record;
          const item = LEAD_LEVEL.find((it) => it.value === superLevel) || {};
          return (
            <>
              <Tag color={item?.color}>{item?.label}</Tag>
              {superPhone && <span>{superNickname}/{superPhone}/{superRealName}</span>}
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
            }}>
              详情
            </Button>
          );
        },
      },
    ];


    return (
      <PageContainer  header={{
        title: '用户中心',
        breadcrumb: {},
      }}>
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
                  formProps.form?.resetFields();
                }}
              >
                {searchConfig.resetText}
              </Button>,
              <Button
                type='primary'
                key='search'
                onClick={() => {
                  formProps.form?.submit();
                }}
              >
                {searchConfig.searchText}
              </Button>,
            ],
          }}
          rowKey='id'
          request={fetchGetList}
          manualRequest
        />
      </PageContainer>
    );
  }
;
export default UserList;
