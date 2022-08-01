import React, { useRef } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import { useModel } from '@@/plugin-model/useModel';

export type InfoProps = {
  id?: number;
  phone?: string;
};

const BagTabPane: React.FC<InfoProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const { fetchGetBagList } = useModel('userModel');
  const columns: ProColumns<OrderAPI.BagListData>[] = [
    {
      title: '书袋ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '书袋编码',
      dataIndex: 'orderCode',
      key: 'orderCode',
    },
    {
      title: '状态',
      dataIndex: 'statusStr',
      key: 'statusStr',
      render: (text) => {
        return <Tag>{text}</Tag>;
      },
    },
    {
      title: '书袋编码',
      dataIndex: 'sequence',
      key: 'sequence',
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
        return [
          <Button
            type={`link`}
            key={'detail'}
            size={'small'}
            onClick={() => {
            }}>
            书袋详情
          </Button>,
          <Button
            type={`link`}
            key={'relation'}
            size={'small'}
            onClick={() => {

            }}>
            关联订单
          </Button>,
        ];
      },
    },
  ];

  const expandedRowRender = (it: OrderAPI.BagListData, index: number) => {
    it.key = index;
    return (
      <ProTable
        columns={
          [{ title: '物流单号', dataIndex: 'trackingCode', key: 'trackingCode' },
            {
              title: '确认时间', dataIndex: 'confirmTimeMill', key: 'confirmTimeMill', valueType: 'dateTime',
            },
          ]}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={[it]}
        pagination={false}
      />
    );
  };

  return <div>
    <ProTable<OrderAPI.BagListData>
      expandable={{ expandedRowRender }}
      toolBarRender={false}
      columns={columns}
      actionRef={actionRef}
      search={false}
      rowKey='id'
      request={(p) => fetchGetBagList(p, props.phone as string)}
    />
  </div>;
};
export default BagTabPane;
