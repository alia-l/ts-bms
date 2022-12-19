import React, { useEffect, useRef } from 'react';
import { ActionType, PageContainer, ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { GOODS_IN_STATUS, RETURN_STATUS, SHIPPING_STATUS } from '@/conf/conf';
import { history } from 'umi';

const ReturnOrderManagement: React.FC = (props) => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const { fetchGetReturnOrderList } = useModel('returnOrderModel');
  const { updateReturnOrderSearchProps, returnOrderSearchProps } = useModel('index');
  const columns: ProColumns<OrderAPI.ReturnOrderListData>[] = [
    {
      title: '用户手机号',
      dataIndex: 'phone',
      key: 'phone',
      hideInTable: true,
    },
    {
      title: '联系人姓名',
      dataIndex: 'contactName',
      key: 'contactName',
      hideInTable: true,
    },
    {
      title: '联系人手机',
      dataIndex: 'contactPhone',
      key: 'contactPhone',
      hideInTable: true,
    },
    {
      title: '关联rfid',
      dataIndex: 'productSequenceNo',
      key: 'productSequenceNo',
      hideInTable: true,
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
      search: {
        transform: (value: any) => ({ returnOrderCode: value }),
      },
    },
    {
      title: '书袋序号',
      dataIndex: 'bagOrderSequence',
      key: 'bagOrderSequence',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '书袋编号',
      dataIndex: 'bagOrderCode',
      key: 'bagOrderCode',
    },
    {
      title: '联系人信息',
      dataIndex: 'contactName',
      key: 'contactName',
      render: (text, record) => {
        return <span>{`${text || '-'}/${record.contactPhone || '-'}`}</span>;
      },
      hideInSearch: true,
    },
    {
      title: '物流单号',
      dataIndex: 'trackingNo',
      key: 'trackingNo',
    },
    {
      title: '回收状态',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      hideInSearch: true,
      valueEnum: RETURN_STATUS,
    },
    {
      title: '入库状态',
      dataIndex: 'goodsInStatus',
      key: 'goodsInStatus',
      width: 150,
      hideInSearch: true,
      valueEnum: GOODS_IN_STATUS,
    },
    {
      title: '物流状态',
      dataIndex: 'shippingStatus',
      key: 'shippingStatus',
      width: 150,
      hideInSearch: true,
      render: (text) => {
        return (
          <Tag>
            {(SHIPPING_STATUS.find((it) => it.value === text) || {}).name ||
            '--'}
          </Tag>
        );
      },
    },
    {
      title: '取件时间',
      dataIndex: 'pickupTimeDateRange',
      key: 'pickupTimeDateRange',
      valueType: 'dateTimeRange',
      hideInTable: true,
      search: {
        transform: (value: any) => ({ pickupTimeStart: value[0], pickupTimeEnd: value[1] }),
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTimeDateRange',
      key: 'createTimeDateRange',
      valueType: 'dateTimeRange',
      hideInTable: true,
      search: {
        transform: (value: any) => ({ createTimeStart: value[0], createTimeEnd: value[1] }),
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '取件时间',
      dataIndex: 'pickupTime',
      key: 'pickupTime',
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
          history.push(`/returnOrder/detail/${id}`);
        }}>详情</Button>;
      },
    },
  ];

  const initData = () => {
    // @ts-ignore
    const { query } = props.location;
    if (query) {
      if (query.back === 'success') {
        formRef?.current?.setFieldsValue(returnOrderSearchProps);
        setTimeout(() => {
          actionRef.current?.reload();
        }, 100);
      }
    }
  };

  useEffect(() => {
    initData();
  }, []);


  return <div>
    <PageContainer
      header={{
        title: '购买订单',
        breadcrumb: {},
      }}
    >
      <ProTable<OrderAPI.ReturnOrderListData>
        formRef={formRef}
        columns={columns}
        actionRef={actionRef}
        scroll={{ x: 2500 }}
        params={returnOrderSearchProps}
        beforeSearchSubmit={(params) => {
          updateReturnOrderSearchProps(params);
          return params;
        }}
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
        request={fetchGetReturnOrderList}
        manualRequest
      />
    </PageContainer>
  </div>;
};
export default ReturnOrderManagement;

