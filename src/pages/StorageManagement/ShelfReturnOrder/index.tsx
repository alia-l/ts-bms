import { ActionType, PageContainer, ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { Button, Modal, Space, Tag } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { history } from '@@/core/history';
import { GOODS_IN_STATUS, RETURN_STATUS } from '@/conf/conf';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const ShelfReturnOrder: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const {
    fetchGetSelfReturnOrderList,
    fetchExportShelfReturnExl,
    fetchCompleteSelfOrder,
    submitLoading
  } = useModel('shelfReturnOrderModel');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchForm, setSearchForm] = useState({});

  const columns: ProColumns<OrderAPI.ShelfReturnOrderData>[] = [
    {
      title: '用户手机号',
      dataIndex: 'phone',
      key: 'phone',
      hideInTable: true,
    },
    {
      title: '联系人',
      dataIndex: 'contactName',
      key: 'contactName',
      hideInTable: true,
    },
    {
      title: '联系人电话',
      dataIndex: 'contactPhone',
      key: 'contactPhone',
      hideInTable: true,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '用户信息',
      dataIndex: 'contactName',
      key: 'contactName',
      render: (text, record) => {
        return <span
          style={{ color: '#1890ff', cursor: 'pointer' }}
          onClick={() => {
          }}
        >
          {`${text || '-'}/${record?.contactPhone || '-'}`}</span>;
      },
      hideInSearch: true,
    },
    {
      title: '书袋编码',
      dataIndex: 'bagOrderCode',
      key: 'bagOrderCode',
      copyable: true,
      width: 280,
    },
    {
      title: '书袋序号',
      dataIndex: 'sequence',
      key: 'sequence',
      width: 80,
      hideInSearch: true,
    },
    {
      title: '物流单号',
      dataIndex: 'logisticsNo',
      key: 'logisticsNo',
      copyable: true,
      width: 280,
    },
    {
      title: '书袋序号',
      dataIndex: 'sequence',
      key: 'sequence',
      width: 80,
      hideInSearch: true,
    },
    {
      title: '回收状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: RETURN_STATUS,
      hideInSearch: true,
    },
    {
      title: '入库状态',
      dataIndex: 'goodsInStatus',
      key: 'goodsInStatus',
      valueEnum: GOODS_IN_STATUS,
      hideInSearch: true,
    },
    {
      title: '补贴金额',
      dataIndex: 'subsidyAmount',
      key: 'subsidyAmount',
      width: 80,
      valueType: 'money',
      hideInSearch: true,
    },
    {
      title: '补贴状态',
      dataIndex: 'payStatus',
      key: 'payStatus',
      width: 100,
      hideInSearch: true,
      render: (text) => {
        return <Tag>{text === 0 || !text ? '未补贴' : '已补贴'}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTimeDateRange',
      key: 'createTimeDateRange',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value: any) => ({ createTimeStart: value[0], createTimeEnd: value[1] }),
      },
    },
    {
      title: '补贴状态',
      dataIndex: 'payStatus',
      key: 'payStatus',
      initialValue: '0',
      valueEnum: {
        0: { text: '未补贴' },
        10: { text: '已补贴' },
      },
      hideInTable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
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
          history.push(`/shelfOrderDetail/detail/${id}`);
        }}>详情</Button>;
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return <div>
    <PageContainer
      header={{
        title: '自寄订单',
        breadcrumb: {},
      }}
    >
      <ProTable<OrderAPI.ShelfReturnOrderData>
        formRef={formRef}
        actionRef={actionRef}
        scroll={{ x: 1800 }}
        columns={columns}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        beforeSearchSubmit={(params) => {
          setSearchForm(params);
          return params;
        }}
        tableAlertOptionRender={() => {
          return (
            <Space size={16} onClick={() => {
              confirm({
                title: '是否批量完成选中的自寄单',
                onOk: async () => {
                  await fetchCompleteSelfOrder({ returnOrderIdList: [...selectedRowKeys] });
                  actionRef.current?.reload();
                  setSelectedRowKeys([]);
                },
              });
            }}>
              <a>批量完成自寄单</a>
            </Space>
          );
        }}
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
        toolBarRender={() => [
          <Button key='pointExport' type='primary' icon={<VerticalAlignBottomOutlined />}
                  onClick={async () => await fetchExportShelfReturnExl(searchForm)} loading={submitLoading}>
            导出
          </Button>,
        ]}
        rowKey='id'
        request={fetchGetSelfReturnOrderList}
        manualRequest={true}
      />

    </PageContainer>
  </div>;
};
export default ShelfReturnOrder;
