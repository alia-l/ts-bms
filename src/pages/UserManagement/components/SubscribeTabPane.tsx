import React, { useRef } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel } from '@@/plugin-model/useModel';
import { Button, Tag } from 'antd';
import { cardServiceStatus } from '@/conf/conf';

export type InfoProps = {
  id?: number;
  phone?: string;
};
const SubscribeTabPane: React.FC<InfoProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const { fetchGetSubscribeList } = useModel('userModel');
  const columns: ProColumns<UserAPI.SubscribeData>[] = [
    {
      title: '订阅订单ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '订阅类型',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: '订阅编码',
      dataIndex: 'userCardNo',
      key: 'userCardNo',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return (
          <Tag color={text === 2 ? 'red' : ''}>
            {(cardServiceStatus.find((it) => it.value === text) || {}).name ||
            ''}
          </Tag>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTimeMill',
      key: 'createTimeMill',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      key: 'bagOperation',
      valueType: 'option',
      width: 180,
      render: () => {
        // const { id } = record;
        return <Button
          type={`link`}
          key={'detail'}
          size={'small'}
          onClick={() => {
          }}>
          书袋详情
        </Button>;
      },
    },
  ];

  const expandedRowRender = (it: UserAPI.SubscribeData, index: number) => {
    it.key = index;
    const expandedColumn = [
      {
        title: it.serviceId === 11 ? '已用书袋' : '剩余书袋',
        dataIndex: it.serviceId === 1 ? 'usedCount' : 'leftCount',
        key: it.serviceId === 1 ? 'usedCount' : 'leftCount',
      },
      {
        title: '过期时间',
        dataIndex: 'expireTime',
        key: 'expireTime',
        valueType: 'dateTime',
      },
      {
        title: '激活时间',
        dataIndex: 'activateTime',
        key: 'activateTime',
        valueType: 'dateTime',
      },
    ];
    return (
      <ProTable
        columns={expandedColumn}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={[it]}
        pagination={false}
      />
    );
  };

  return <div>
    <ProTable<UserAPI.SubscribeData>
      expandable={{ expandedRowRender }}
      toolBarRender={false}
      columns={columns}
      actionRef={actionRef}
      search={false}
      rowKey='id'
      request={(p) => fetchGetSubscribeList(p, props.phone as string)}
    />
  </div>;
};
export default SubscribeTabPane;
