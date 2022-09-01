import React, { useRef, useState } from 'react';
import { ActionType, PageContainer, ProColumns, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Tag } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { GOODS_IN_STATUS, GOODS_IN_SUB_ORDER_STATUS } from '@/conf/conf';

const EXPRESS_TYPE: any[] = [
  { name: '上门取件', value: 1 },
  { name: '用户自寄', value: 2 },
];

const GoodsInOrderManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { fetchGetGoodsInOrderList, fetchGetGoodsInOrderDetail, loading, detail } = useModel('goodsInOrderModel');
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const columns: ProColumns<OrderAPI.GoodsInOrderListData>[] = [
    {
      title: '用户手机号',
      dataIndex: 'phone',
      key: 'phone',
      hideInTable: true,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      hideInSearch: true,
      width: 100,
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
      title: '订单编码',
      dataIndex: 'orderCode',
      key: 'orderCode',
      width: 300,
      copyable: true,
    },
    {
      title: '书袋序号',
      dataIndex: 'sequence',
      key: 'sequence',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '书袋编码',
      dataIndex: 'bagOrderCode',
      key: 'bagOrderCode',
      width: 300,
      copyable: true,
    },
    {
      title: '寄回方式',
      dataIndex: 'expressType',
      key: 'expressType',
      render: (text) => {
        return <Tag>{(EXPRESS_TYPE.find((it) => (it.value === text)) || {}).name}</Tag>;
      },
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: GOODS_IN_STATUS,
    },
    {
      title: '操作人员',
      dataIndex: 'staffName',
      key: 'staffName',
      width: 150,
    },
    {
      title: '支付时间',
      dataIndex: 'timeDateRange',
      key: 'timeDateRange',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
    },
    {
      title: '支付时间',
      dataIndex: 'createTime',
      key: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,

    },
    {
      title: '质检时间',
      dataIndex: 'inspectionTime',
      key: 'inspectionTime',
      valueType: 'dateTime',
      hideInSearch: true,

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
          setDrawerVisible(true);
          await fetchGetGoodsInOrderDetail(id);
        }}>详情</Button>;
      },
    },
  ];
  const subColumns: ProColumns<OrderAPI.GoodsInOrderDetail_subOrderList>[] = [
    {
      title: '绘本ID',
      dataIndex: 'productId',
      key: 'productId',
      width: 100,
    },
    {
      title: '绘本编号',
      dataIndex: 'productNo',
      key: 'productNo',
      width: 150,
    },
    {
      title: '绘本名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 200,
    },
    {
      title: '入库单号',
      dataIndex: 'wmsOrderCode',
      key: 'wmsOrderCode',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 200,
      key: 'status',
      valueEnum: GOODS_IN_SUB_ORDER_STATUS,
    },
    {
      title: '入库时间',
      dataIndex: 'goodIsTime',
      key: 'goodIsTime',
      valueType: 'dateTime',
    },
    {
      title: '质检视频',
      dataIndex: 'checkVideoUrl',
      width: 150,
      key: 'checkVideoUrl',
    },
    {
      title: '质检视频时长',
      dataIndex: 'checkVideoDuration',
      key: 'checkVideoDuration',
    },
  ];

  return <div>
    <PageContainer
      header={{
        title: '购买订单',
        breadcrumb: {},
      }}
    >
      <ProTable<OrderAPI.GoodsInOrderListData>
        columns={columns}
        actionRef={actionRef}
        scroll={{ x: 2000 }}
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
        request={fetchGetGoodsInOrderList}
        manualRequest
      />
    </PageContainer>
    <Drawer
      title={'详情'}
      visible={drawerVisible}
      width={800}
      onClose={() => setDrawerVisible(false)}
    >
      <ProDescriptions
        title={'支付信息'}
        loading={loading}
        dataSource={detail}
        columns={
          [
            {
              title: '用户信息',
              key: 'nickname',
              dataIndex: 'nickname',
              render: (text, record) => {
                const { phone } = record;
                return `${text || '--'} / ${phone || '--'}`;
              },
            },
            {
              title: '创建时间',
              key: 'createTime',
              dataIndex: 'createTime',
              valueType: 'dateTime',
            },
            {
              title: '书袋编码',
              key: 'bagOrderCode',
              dataIndex: 'bagOrderCode',
              copyable: true,
            },
            {
              title: '质检时间',
              key: 'inspectionTime',
              dataIndex: 'inspectionTime',
              valueType: 'dateTime',
            },
            {
              title: '订单编码',
              key: 'orderCode',
              dataIndex: 'orderCode',
              copyable: true,
            },

            {
              title: '书袋序号',
              dataIndex: 'sequence',
              key: 'sequence',
            },
            {
              title: '回收单编码',
              key: 'returnOrderCode',
              dataIndex: 'returnOrderCode',
              copyable: true,
            },
            {
              title: '状态',
              dataIndex: 'status',
              key: 'status',
              valueEnum: GOODS_IN_STATUS,
            },
            {
              title: '入库单号',
              key: 'wmsOrderCode',
              dataIndex: 'wmsOrderCode',
              copyable: true,
            },
            {
              title: '寄回方式',
              dataIndex: 'expressType',
              key: 'expressType',
              render: (text) => {
                return <Tag>{(EXPRESS_TYPE.find((it) => (it.value === text)) || {}).name}</Tag>;
              },
            },
          ]
        }
        column={2}
      />
      <div className='ant-descriptions-title' style={{ marginBottom: 20 }}>入库内容</div>
      <ProTable<OrderAPI.GoodsInOrderDetail_subOrderList>
        columns={subColumns}
        dataSource={detail?.subOrderList}
        search={false}
        toolBarRender={false}
        size={'small'}
        loading={loading}
        rowKey={'id'}
        scroll={{ x: 1300 }}
        pagination={false}
      />
    </Drawer>
  </div>;
};
export default GoodsInOrderManagement;

