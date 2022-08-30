import { ActionType, PageContainer, ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { history } from '@@/core/history';
import { CHASE_DAMAGE_STATUS } from '@/conf/conf';
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';

const ChaseDamageOrder: React.FC = (props: any) => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const { updateChaseDamageSearchProps, chaseDamageSearchProps } = useModel('index');
  const { fetchGetDamageList, fetchExportDamageOrder, submitLoading } = useModel('chaseDamageOrderModel');
  const [searchForm, setSearchForm] = useState({});
  const columns: ProColumns<OrderAPI.ChaseDamageData>[] = [
    {
      title: '用户手机号',
      dataIndex: 'phone',
      key: 'phone',
      hideInTable: true,
    },
    {
      title: '编码',
      dataIndex: 'keyword',
      key: 'keyword',
      hideInTable: true,
    },
    {
      title: '物流单号',
      dataIndex: 'trackingNo',
      key: 'trackingNo',
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
      copyable: true,
      width: 280,
      hideInSearch: true,
    },
    {
      title: '书袋序号',
      dataIndex: 'sequence',
      key: 'sequence',
      width: 80,
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: CHASE_DAMAGE_STATUS,
    },
    {
      title: '绘本数量',
      dataIndex: 'count',
      key: 'count',
      width: 80,
      hideInSearch: true,
    },
    {
      title: '追损金额',
      dataIndex: 'payAmount',
      key: 'payAmount',
      width: 100,
      valueType: 'money',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTimeDateRange',
      key: 'createTimeDateRange',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
    },
    {
      title: '赔付时间',
      dataIndex: 'paidTimeDateRange',
      key: 'paidTimeDateRange',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value: any) => ({ paidTimeStart: value[0], paidTimeEnd: value[1] }),
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
      title: '赔付时间',
      dataIndex: 'paidTime',
      key: 'paidTime',
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
          history.push(`/chaseDamage/detail/${id}`);
        }}>详情</Button>;
      },
    },
  ];


  const initData = () => {
    const { query } = props.location;
    if (query) {
      if (query.back === 'success') {
        formRef?.current?.setFieldsValue(chaseDamageSearchProps);
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
        title: '追损订单',
        breadcrumb: {},
      }}
    >
      <ProTable<OrderAPI.ChaseDamageData>
        formRef={formRef}
        params={chaseDamageSearchProps}
        actionRef={actionRef}
        scroll={{ x: 1800 }}
        columns={columns}
        beforeSearchSubmit={(params) => {
          setSearchForm(params);
          updateChaseDamageSearchProps(params);
          return params;
        }}
        search={{
          labelWidth: 100,
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
        toolBarRender={() => [
          <Button key='finish' type='primary' ghost icon={<VerticalAlignTopOutlined />}
                  loading={submitLoading}
                  onClick={async () => await fetchExportDamageOrder(searchForm)}>
            导出追损订单
          </Button>,
          <Button key='pointExport' type='primary' icon={<VerticalAlignBottomOutlined />}>
            导入物流信息
          </Button>,
        ]}
        rowKey='id'
        request={fetchGetDamageList}
        manualRequest={true}
      />

    </PageContainer>
  </div>;
};
export default ChaseDamageOrder;
