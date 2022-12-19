import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import { Button } from 'antd';
import { useModel } from '@@/plugin-model/useModel';

const MakeUpCard: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const {
    fetchGetCardUserList,
  } = useModel('entityCardModel');

  const columns: ProColumns<UserAPI.MakeUoCardData>[] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: '用户信息',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '用户电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '角色',
      dataIndex: 'roleValue',
      key: 'roleValue'
    },
    {
      title: '剩余谷粒',
      dataIndex: 'cerealAmount',
      key: 'cerealAmount'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => {
        return <>
          <Button type={`link`}  size={'small'}
                  style={{ marginRight: 10 }}>查看转卡、制作实体卡记录</Button>
          <Button type={`primary`}  size={'small'}>实体卡制作</Button>
        </>
      },
    },
  ];


  return <div className={'grant-card'}>
    <ProTable<UserAPI.MakeUoCardData>
      actionRef={actionRef}
      columns={columns}
      search={{
        labelWidth: 100,
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
      request={fetchGetCardUserList}
      manualRequest={true}
    />
  </div>;
};
export default MakeUpCard;
