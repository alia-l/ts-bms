import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import { Button } from 'antd';
import { useModel } from '@@/plugin-model/useModel';

const RfidDelivery: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const {
    fetchGetRfidRecordList,
  } = useModel('rfidModel');

  const columns: ProColumns<GoodsAPI.RfidListData>[] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '订单编码', dataIndex: 'bagOrderCode', key: 'bagOrderCode', hideInSearch: true },
    {
      title: '绘本名称',
      dataIndex: 'saleTitle',
      key: 'saleTitle',
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
      hideInSearch: true
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      hideInSearch: true
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true
    },
    {
      title: '质检员信息',
      dataIndex: 'staffName',
      key: 'staffName',
      hideInSearch: true
    },
    {
      title: '描述',
      dataIndex: 'count',
      key: 'count',
      hideInSearch: true
    },
  ];


  return <div className={'grant-card'}>
    <ProTable<GoodsAPI.RfidListData>
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
      request={fetchGetRfidRecordList}
      manualRequest={true}
    />
  </div>;
};
export default RfidDelivery;
