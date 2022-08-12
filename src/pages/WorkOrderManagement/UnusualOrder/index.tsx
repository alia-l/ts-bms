import React, { useRef, useState } from 'react';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Tabs } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import moment from 'moment';
import { TIME_FORMAT } from '@/conf/conf';
import './index.less'

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const WORK_STATUS = {
  0: { text: '未处理' },
  10: { text: '已跟进' },
  50: { text: '自动完结' },
};

const SERVICE_CARD_STATUS = {
  0: { text: '已过期' },
  10: { text: '服务暂停中' },
  20: { text: '激活使用中' },
  '-10': { text: '冻结或失效' },
};

const UnusualOrderManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { fetchGetTicketList } = useModel('unusualOrderModel');
  const [currentTab, serCurrentTab] = useState<string>('4');
  const [dueDaysMode, setDueDaysMode] = useState<boolean | null>(null);
  const [ticketUpdateMode, setTicketUpdateMode] = useState<boolean | null>(null);
  const forwardColumns: ProColumns<OrderAPI.TicketListData>[] = [
    {
      title: '工单状态',
      dataIndex: 'workStatus',
      key: 'workStatus',
      initialValue: '0',
      valueEnum: WORK_STATUS,
      width: 70,
      hideInTable: true,
    },
    {
      title: '订阅状态',
      dataIndex: 'serviceCardStatus',
      key: 'serviceCardStatus',
      initialValue: '20',
      valueEnum: SERVICE_CARD_STATUS,
      hideInTable: true,
    },
    {
      title: '用户手机号',
      dataIndex: 'telephone',
      key: 'telephone',
      hideInTable: true,
    },
    {
      title: '预计签收时间',
      dataIndex: 'ticketTimeRange',
      key: 'ticketTimeRange',
      initialValue: [
        moment('2019-06-01'),
        moment().subtract(10, 'days').startOf('day').endOf('day')],
      renderFormItem: () => {
        return <RangePicker
          showTime
          format={TIME_FORMAT.FULL}
          ranges={{
            '超时10天以上': [
              moment('2019-06-01'),
              moment().subtract(10, 'days').startOf('day').endOf('day'),
            ],
            '超时10至29天': [
              moment().subtract(29, 'days').startOf('day'),
              moment().subtract(10, 'days').startOf('day').endOf('day'),
            ],
            '超时30至59天': [
              moment().subtract(59, 'days').startOf('day'),
              moment().subtract(30, 'days').startOf('day').endOf('day'),
            ],
            '超时60天以上': [
              moment('2019-06-01'),
              moment().subtract(2, 'months').startOf('day').endOf('day'),
            ],
          }}
        />;
      },
      hideInTable: true,
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
    },
    {
      title: '工单ID',
      dataIndex: 'id',
      key: 'id',
      hideInSearch: true,
      fixed: 'left',
      width: 100,
    },
    {
      title: '用户信息',
      dataIndex: 'userName',
      key: 'userName',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'userTelephone',
      key: 'userTelephone',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '超时天数',
      dataIndex: 'dueDays',
      key: 'dueDays',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '订单编号',
      dataIndex: 'orderCode',
      key: 'orderCode',
      hideInSearch: true,
      // render: (text) => {
      //   return <Button type={`link`}>{text}</Button>;
      // },
    },
    {
      title: '书袋序号',
      dataIndex: 'sequence',
      key: 'sequence',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: '快递公司',
      dataIndex: 'trackingName',
      key: 'trackingName',
      hideInSearch: true,
    },
    {
      title: '物流单号',
      dataIndex: 'trackingNo',
      key: 'trackingNo',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '预计签收时间',
      dataIndex: 'ticketRecordUpdateTime',
      key: 'ticketRecordUpdateTime',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '工单记录内容',
      dataIndex: 'ticketRecordContent',
      key: 'ticketRecordContent',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: () => {
        return <Button type={`link`}>详情</Button>;
      },
    },
  ];
  const reverseOvertimeColumns: ProColumns<OrderAPI.TicketListData>[] = [
    {
      title: '工单状态',
      dataIndex: 'workStatus',
      key: 'workStatus',
      initialValue: '0',
      valueEnum: WORK_STATUS,
      width: 70,
      hideInTable: true,
    },
    {
      title: '订阅状态',
      dataIndex: 'serviceCardStatus',
      key: 'serviceCardStatus',
      initialValue: '20',
      valueEnum: SERVICE_CARD_STATUS,
      hideInTable: true,
    },
    {
      title: '用户手机号',
      dataIndex: 'telephone',
      key: 'telephone',
      hideInTable: true,
    },
    {
      title: '预计签收时间',
      dataIndex: 'ticketTimeRange',
      key: 'ticketTimeRange',
      initialValue: [
        moment('2019-06-01'),
        moment().subtract(10, 'days').startOf('day').endOf('day')],
      renderFormItem: () => {
        return <RangePicker
          showTime
          format={TIME_FORMAT.FULL}
          ranges={{
            '超时10天以上': [
              moment('2019-06-01'),
              moment().subtract(10, 'days').startOf('day').endOf('day'),
            ],
            '超时10至29天': [
              moment().subtract(29, 'days').startOf('day'),
              moment().subtract(10, 'days').startOf('day').endOf('day'),
            ],
            '超时30至59天': [
              moment().subtract(59, 'days').startOf('day'),
              moment().subtract(30, 'days').startOf('day').endOf('day'),
            ],
            '超时60天以上': [
              moment('2019-06-01'),
              moment().subtract(2, 'months').startOf('day').endOf('day'),
            ],
          }}
        />;
      },
      hideInTable: true,
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
    },
    {
      title: '工单ID',
      dataIndex: 'id',
      key: 'id',
      hideInSearch: true,
      fixed: 'left',
      width: 100,
    },
    {
      title: '用户信息',
      dataIndex: 'userName',
      key: 'userName',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'userTelephone',
      key: 'userTelephone',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '超时天数',
      dataIndex: 'dueDays',
      key: 'dueDays',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '订单编号',
      dataIndex: 'orderCode',
      key: 'orderCode',
      hideInSearch: true,
      // render: (text) => {
      //   return <Button type={`link`}>{text}</Button>;
      // },
    },
    {
      title: '书袋序号',
      dataIndex: 'sequence',
      key: 'sequence',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: '书袋订单编号',
      dataIndex: 'bagOrderCode',
      key: 'bagOrderCode',
      hideInSearch: true,
      // render: (text) => {
      //   return <Button type={`link`}>{text}</Button>;
      // },
    },
    {
      title: '预约归还时间',
      dataIndex: 'exceptionBeginTime',
      key: 'exceptionBeginTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '快递公司',
      dataIndex: 'trackingName',
      key: 'trackingName',
      hideInSearch: true,
    },
    {
      title: '物流单号',
      dataIndex: 'trackingNo',
      key: 'trackingNo',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '状态更新时间',
      dataIndex: 'ticketRecordUpdateTime',
      key: 'ticketRecordUpdateTime',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '工单记录内容',
      dataIndex: 'ticketRecordContent',
      key: 'ticketRecordContent',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: () => {
        return <Button type={`link`}>详情</Button>;
      },
    },
  ];
  const reverseStorageColumns: ProColumns<OrderAPI.TicketListData>[] = [
    {
      title: '工单状态',
      dataIndex: 'workStatus',
      key: 'workStatus',
      initialValue: '0',
      valueEnum: WORK_STATUS,
      width: 70,
      hideInTable: true,
    },
    {
      title: '订阅状态',
      dataIndex: 'serviceCardStatus',
      key: 'serviceCardStatus',
      initialValue: '20',
      valueEnum: SERVICE_CARD_STATUS,
      hideInTable: true,
    },
    {
      title: '用户手机号',
      dataIndex: 'telephone',
      key: 'telephone',
      hideInTable: true,
    },
    {
      title: '预计签收时间',
      dataIndex: 'ticketTimeRange',
      key: 'ticketTimeRange',
      initialValue: [
        moment('2019-06-01'),
        moment().subtract(10, 'days').startOf('day').endOf('day')],
      renderFormItem: () => {
        return <RangePicker
          showTime
          format={TIME_FORMAT.FULL}
          ranges={{
            '超时10天以上': [
              moment('2019-06-01'),
              moment().subtract(10, 'days').startOf('day').endOf('day'),
            ],
            '超时10至29天': [
              moment().subtract(29, 'days').startOf('day'),
              moment().subtract(10, 'days').startOf('day').endOf('day'),
            ],
            '超时30至59天': [
              moment().subtract(59, 'days').startOf('day'),
              moment().subtract(30, 'days').startOf('day').endOf('day'),
            ],
            '超时60天以上': [
              moment('2019-06-01'),
              moment().subtract(2, 'months').startOf('day').endOf('day'),
            ],
          }}
        />;
      },
      hideInTable: true,
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
    },
    {
      title: '工单ID',
      dataIndex: 'id',
      key: 'id',
      hideInSearch: true,
      fixed: 'left',
      width: 100,
    },
    {
      title: '用户信息',
      dataIndex: 'userName',
      key: 'userName',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'userTelephone',
      key: 'userTelephone',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '已发货天数',
      dataIndex: 'dueDays',
      key: 'dueDays',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '订单编号',
      dataIndex: 'orderCode',
      key: 'orderCode',
      hideInSearch: true,
      // render: (text) => {
      //   return <Button type={`link`}>{text}</Button>;
      // },
    },
    {
      title: '书袋序号',
      dataIndex: 'sequence',
      key: 'sequence',
      hideInSearch: true,
      align: 'center',

    },
    {
      title: '书袋订单编号',
      dataIndex: 'bagOrderCode',
      key: 'bagOrderCode',
      hideInSearch: true,
      // render: (text) => {
      //   return <Button type={`link`}>{text}</Button>;
      // },
    },
    {
      title: '发货时间',
      dataIndex: 'exceptionBeginTime',
      key: 'exceptionBeginTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '快递公司',
      dataIndex: 'trackingName',
      key: 'trackingName',
      hideInSearch: true,
    },
    {
      title: '物流单号',
      dataIndex: 'trackingNo',
      key: 'trackingNo',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '状态更新时间',
      dataIndex: 'ticketRecordUpdateTime',
      key: 'ticketRecordUpdateTime',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '工单记录内容',
      dataIndex: 'ticketRecordContent',
      key: 'ticketRecordContent',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: () => {
        return <Button type={`link`}>详情</Button>;
      },
    },
  ];
  const reverseCancelColumns: ProColumns<OrderAPI.TicketListData>[] = [
    {
      title: '工单状态',
      dataIndex: 'workStatus',
      key: 'workStatus',
      initialValue: '0',
      valueEnum: WORK_STATUS,
      width: 70,
      hideInTable: true,
    },
    {
      title: '工单ID',
      dataIndex: 'id',
      key: 'id',
      hideInSearch: true,
      fixed: 'left',
      width: 100,
    },
    {
      title: '用户信息',
      dataIndex: 'userName',
      key: 'userName',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'userTelephone',
      key: 'userTelephone',
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '已发货天数',
      dataIndex: 'dueDays',
      key: 'dueDays',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '订单编号',
      dataIndex: 'orderCode',
      key: 'orderCode',
      hideInSearch: true,
      // render: (text) => {
      //   return <Button type={`link`}>{text}</Button>;
      // },
    },
    {
      title: '书袋序号',
      dataIndex: 'sequence',
      key: 'sequence',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: '书袋订单编号',
      dataIndex: 'bagOrderCode',
      key: 'bagOrderCode',
      hideInSearch: true,
      // render: (text) => {
      //   return <Button type={`link`}>{text}</Button>;
      // },
    },
    {
      title: '预约取件时间',
      dataIndex: 'pickupTime',
      key: 'pickupTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '快递员取消时间',
      dataIndex: 'logisticsCancelTime',
      key: 'logisticsCancelTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '取消前物流单号',
      dataIndex: 'mainNo',
      key: 'mainNo',
      hideInSearch: true,

    },
    {
      title: '工单记录内容',
      dataIndex: 'ticketRecordContent',
      key: 'ticketRecordContent',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: () => {
        return <Button type={`link`}>详情</Button>;
      },
    },
  ];
  const changeTab = (v: string) => {
    serCurrentTab(v);
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    console.log(sorter);
    const { order, columnKey } = sorter;
    if (order) {
      if (order === 'ascend') {
        if (columnKey === 'dueDays') {
          setDueDaysMode(false);
        } else {
          setTicketUpdateMode(false);
        }
      } else if (order === 'descend') {
        if (columnKey === 'dueDays') {
          setDueDaysMode(true);
        } else {
          setTicketUpdateMode(true);
        }
      }
    }
  };

  return <div className={'unusual-order-wrapper'}>
    <PageContainer
      header={{
        title: '异常工单',
        breadcrumb: {},
      }}
    >
      <Tabs onChange={changeTab} type='card'>
        <TabPane tab='【正】已发货超时未签收' key='4'>
          <ProTable<OrderAPI.TicketListData>
            columns={forwardColumns}
            actionRef={actionRef}
            onChange={handleTableChange}
            scroll={{ x: 1800 }}
            search={{
              labelWidth: 100,
              collapsed: false,
              span: 8,
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
            request={(p) => fetchGetTicketList(p, currentTab, dueDaysMode, ticketUpdateMode)}
          />
        </TabPane>
        <TabPane tab='【逆】待取件超时未取件' key='5'>
          <ProTable<OrderAPI.TicketListData>
            columns={reverseOvertimeColumns}
            actionRef={actionRef}
            onChange={handleTableChange}
            scroll={{ x: 2000 }}
            search={{
              labelWidth: 100,
              collapsed: false,
              span: 8,
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
            request={(p) => fetchGetTicketList(p, currentTab, dueDaysMode, ticketUpdateMode)}
          />
        </TabPane>
        <TabPane tab='【逆】已发货未入库' key='6'>
          <ProTable<OrderAPI.TicketListData>
            columns={reverseStorageColumns}
            actionRef={actionRef}
            onChange={handleTableChange}
            scroll={{ x: 1800 }}
            search={{
              labelWidth: 100,
              collapsed: false,
              span: 8,
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
            request={(p) => fetchGetTicketList(p, currentTab, dueDaysMode, ticketUpdateMode)}
          />
        </TabPane>
        <TabPane tab='【逆】快递员取消，48小时内未建新单' key='3'>
          <ProTable<OrderAPI.TicketListData>
            columns={reverseCancelColumns}
            actionRef={actionRef}
            onChange={handleTableChange}
            scroll={{ x: 1800 }}
            search={{
              labelWidth: 100,
              collapsed: false,
              span: 8,
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
            request={(p) => fetchGetTicketList(p, currentTab, dueDaysMode, ticketUpdateMode)}
          />
        </TabPane>
      </Tabs>
    </PageContainer>
  </div>;
};
export default UnusualOrderManagement;
