import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { Button, Tabs, Tag } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { history } from '@@/core/history';
import { RE_CHECK_STATUS } from '@/conf/conf';
import '../index.less'

const { TabPane } = Tabs;

const ReCheckListOrder: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const {
    fetchReCheckList,
  } = useModel('reCheckListOrderModel');
  const [currentTab, setCurrentTab] = useState('1');
  const [searchForm, setSearchForm] = useState({});

  const columns: ProColumns<OrderAPI.ReCheckOrderData>[] = [
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
    },
    {
      title: '书袋编码',
      dataIndex: 'bagOrderCode',
      key: 'bagOrderCode',
      copyable: true,
    },
    {
      title: '入库单编码',
      dataIndex: 'orderCode',
      key: 'orderCode',
      hideInSearch: true,
    },
    {
      title: '书袋序号',
      dataIndex: 'sequence',
      key: 'sequence',
      hideInSearch: true,
    },
    {
      title: '复核状态',
      dataIndex: 'status',
      key: 'status',
      initialValue: currentTab === '1' ? '1' : '2',
      hideInTable: true,
      valueEnum: currentTab === '1' ? RE_CHECK_STATUS : {
        2: { text: '待确认', status: 'Processing' },
        4: { text: '完成', status: 'Success' },
      },
    },
    {
      title: '复核状态',
      dataIndex: 'status',
      key: 'status',
      hideInSearch: true,
      render: (text) => {
        return <Tag>{text}</Tag>;
      },
    },
    {
      title: '生成复核时间',
      dataIndex: 'inspectTimeDateRange',
      key: 'inspectTimeDateRange',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value: any) => ({ inspectTimeStart: value[0], inspectTimeEnd: value[1] }),
      },
    },
    {
      title: '质检复核时间',
      dataIndex: 'reCheckDateRange',
      key: 'reCheckDateRange',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value: any) => ({ reCheckStart: value[0], reCheckEnd: value[1] }),
      },
    },
    {
      title: '复核确认时间',
      dataIndex: 'confirmTimeDateRange',
      key: 'confirmTimeDateRange',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value: any) => ({ confirmTimeStart: value[0], confirmTimeEnd: value[1] }),
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => {
        const { id } = record;
        return <Button type={`link`} onClick={async () => {
          // @ts-ignore
          history.push(`/reCheckListOrder/detail/${id}/${searchForm.status}`);
        }}>详情</Button>;
      },
    },
  ];

  const changeTab = (v: string) => {
    setCurrentTab(v);
  };

  return <div className={'re-check'}>
    <PageContainer
      header={{
        title: '质检复核',
        breadcrumb: {},
      }}
    >
      <Tabs type={'card'} onChange={changeTab}>
        <TabPane tab={'质检复核'} key={'1'}>
          <ProTable<OrderAPI.ReCheckOrderData>
            actionRef={actionRef}
            columns={columns}
            beforeSearchSubmit={(params) => {
              setSearchForm(params);
              return params;
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
            rowKey='id'
            request={fetchReCheckList}
            manualRequest={true}
          />
        </TabPane>
        <TabPane tab={'追损复核'} key={'2'}>
          <ProTable<OrderAPI.ReCheckOrderData>
            actionRef={actionRef}
            columns={columns}
            beforeSearchSubmit={(params) => {
              setSearchForm(params);
              return params;
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
            rowKey='id'
            request={fetchReCheckList}
            manualRequest={true}
          />
        </TabPane>
      </Tabs>
    </PageContainer>
  </div>;
};
export default ReCheckListOrder;
