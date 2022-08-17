import React, { useRef } from 'react';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { PURCHASE_SUB_STATUS } from '@/conf/conf';
import Info from '@/components/Info';
import { history } from 'umi';

const PurchaseOrderManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { fetchGetPurchaseList } = useModel('purchaseOrderModel');
  const columns: ProColumns<OrderAPI.PurchaseOrderListData>[] = [
    {
      title: '用户手机号',
      dataIndex: 'phone',
      key: 'phone',
      hideInTable: true,
    },
    {
      title: '编码/id',
      dataIndex: 'keyword',
      key: 'keyword',
      hideInTable: true,
    },
    {
      title: '用户id',
      dataIndex: 'userId',
      key: 'userId',
      hideInTable: true,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      hideInTable: true,
    },
    {
      title: '支付时间',
      dataIndex: 'paidTimeDateRange',
      key: 'paidTimeDateRange',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value: any) => ({ paidStartTime: value[0], paidEndTime: value[1] }),
      },
    },
    {
      title: '用户信息',
      dataIndex: 'nickname',
      key: 'nickname',
      render: (text, record) => {
        return <span
          style={{ color: '#1890ff', cursor: 'pointer' }}
          onClick={() => {
          }}
        >
          {`${text || '-'}/${record.phone || '-'}`}</span>;
      },
      hideInSearch: true,
    },
    {
      title: '购买订单编码',
      dataIndex: 'orderCode',
      key: 'orderCode',
      hideInSearch: true,
    },
    {
      title: '书袋序号',
      dataIndex: 'bagOrderSequence',
      key: 'bagOrderSequence',
      hideInSearch: true,
    },
    {
      title: '总金额',
      dataIndex: 'amount',
      key: 'amount',
      valueType: 'money',
      hideInSearch: true,
    },
    {
      title: '购买数量',
      dataIndex: 'productNames',
      key: 'productNames',
      render: (text: any) => {
        return text && text.length;
      },
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      hideInSearch: true,
      render: (text) => {
        return <Tag> {(PURCHASE_SUB_STATUS.find((it) => it.value === text) || {}).label}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: (_, record) => {
        const { id } = record;
        return <Button type={`link`} onClick={async () => {
          history.push(`/purchase/detail/${id}`);
        }}>详情</Button>;
      },
    },
  ];

  const expandedRowRender = (it: OrderAPI.PurchaseOrderListData, index: number) => {
    it.key = index;
    return (<Info content={it.productNames.join(',')} title={'购买商品'} />
    );
  };

  return <div>
    <PageContainer
      header={{
        title: '购买订单',
        breadcrumb: {},
      }}
    >
      <ProTable<OrderAPI.PurchaseOrderListData>
        expandable={{ expandedRowRender, defaultExpandedRowKeys: [] }}
        columns={columns}
        actionRef={actionRef}
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
        rowKey='id'
        request={fetchGetPurchaseList}
        manualRequest
      />
    </PageContainer>
  </div>;
};
export default PurchaseOrderManagement;
