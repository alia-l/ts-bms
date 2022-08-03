import React, { useRef } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel } from '@@/plugin-model/useModel';
import { Button, Tag } from 'antd';

export type InfoProps = {
  id?: number;
  phone?: string;
};
const PointTabPane: React.FC<InfoProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const { fetchGetUserPointList } = useModel('userModel');
  const columns: ProColumns<OrderAPI.PointsRecordList>[] = [
    {
      title: '兑换订单号',
      dataIndex: 'exchangeOrderCode',
      key: 'exchangeOrderCode',
      render: (text) => {
        return text ? text : <Tag color='red'>积分获取</Tag>;
      },
      hideInSearch: true,
      width: 220,
    },
    {
      title: '兑换时间',
      dataIndex: 'createTime',
      key: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '兑换时间',
      dataIndex: 'createTime',
      key: 'createTimeRange',
      valueType: 'dateTimeRange',
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
      hideInTable: true,
    },
    {
      title: '积分记录',
      dataIndex: 'points',
      key: 'points',
    },
    {
      title: '兑换类型',
      dataIndex: 'exchangeTypeStr',
      key: 'exchangeTypeStr',
      hideInSearch: true,
    },
    {
      title: '说明',
      dataIndex: 'reason',
      key: 'reason',
    },
  ];

  return <div>
    <ProTable<OrderAPI.PointsRecordList>
      toolBarRender={false}
      columns={columns}
      actionRef={actionRef}
      rowKey='id'
      search={{
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
      dateFormatter='string'
      request={(p) => fetchGetUserPointList(p, props.id as number)}
    />
  </div>;
};
export default PointTabPane;
;
