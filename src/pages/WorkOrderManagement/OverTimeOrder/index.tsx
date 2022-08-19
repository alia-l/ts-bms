import React, { useEffect, useRef, useState } from 'react';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Badge, Button, DatePicker, Drawer, Input, Tabs } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import moment from 'moment';
import { TIME_FORMAT } from '@/conf/conf';
import '../index.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

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


const OverTimeManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const {
    fetchGetTicketList,
    fetchGetTicketRecordList,
    fetchAddTicketRecord,
    fetchGetTicketTimeoutCount,
    ticketRecordList,
    submitLoading,
    badgeCount,
  } = useModel('unusualOrderModel');
  const [currentTab, serCurrentTab] = useState<string>('1');
  const [dueDaysMode, setDueDaysMode] = useState<boolean | null>(null);
  const [ticketUpdateMode, setTicketUpdateMode] = useState<boolean | null>(null);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [ticketId, setTicketId] = useState<number>();
  const columns: ProColumns<OrderAPI.TicketListData>[] = [
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
      render: (text, record) => {
        return <span
          style={{ color: '#1890ff', cursor: 'pointer' }}
          onClick={() => {
          }}
        >
          {`${text || '-'}/${record.userTelephone || '-'}`}</span>;
      },
      hideInSearch: true,
    },
    {
      title: '逾期天数',
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
      title: currentTab === '2' ? '逾期未归还书袋序号' : '超时待确认书袋序号',
      dataIndex: 'confirmedSequence',
      key: 'confirmedSequence',
      render: (text) => {
        return text === '-' ? '无' : text;
      },
      hideInSearch: true,
    },
    {
      title: '订阅过期时间',
      dataIndex: 'expireTime',
      key: 'expireTime',
      valueType: 'dateTime',
      hideInSearch: true,
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
      render: (_, record) => {
        const { id } = record;
        return <Button type={`link`} onClick={async () => {
          setDrawerVisible(true);
          setTicketId(id);
          await fetchGetTicketRecordList(id);
        }}>详情</Button>;
      },
    },
  ];

  useEffect(() => {
   fetchGetTicketTimeoutCount()
  }, );

  const changeTab = (v: string) => {
    serCurrentTab(v);
  };

  const changeTextArea = (e: any) => {
    const { value } = e.target;
    setContent(value);
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

  const submitInfo = async () => {
    const params: OrderAPI.AddTicketRecordParams = {
      content,
      ticketId,
      operationType: 1,
      overCode: false,
    };
    await fetchAddTicketRecord(params);
    setDrawerVisible(false);
    setContent('');
    actionRef.current?.reload();
  };

  return <div className={'unusual-order-wrapper'}>
    <PageContainer
      header={{
        title: '超时工单',
        breadcrumb: {},
      }}
    >
      <Badge count={badgeCount?.type1} className={`badge1`}  overflowCount={9999}/>
      <Badge count={badgeCount?.type2} className={`badge2`} overflowCount={9999}/>
      <Tabs onChange={changeTab} type='card'>
        <TabPane tab='【逆】逾期超时未预约' key='1'>
          <ProTable<OrderAPI.TicketListData>
            columns={columns}
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
        <TabPane tab='【正】超时未确认' key='2'>
          <ProTable<OrderAPI.TicketListData>
            columns={columns}
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
      </Tabs>
    </PageContainer>
    <Drawer
      title={'工单详情'}
      visible={drawerVisible}
      onClose={() => setDrawerVisible(false)}
      destroyOnClose={true}
      width={500}
    >

      <div className='ant-descriptions-title' style={{ marginBottom: 10 }}>跟进操作</div>
      <TextArea rows={5} onChange={changeTextArea} value={content} />
      <div style={{ marginBottom: 10, marginTop: 10 }}>
        <Button
          type={'primary'}
          loading={submitLoading}
          onClick={() => submitInfo()}
        >保存
        </Button>
      </div>
      <div className='ant-descriptions-title' style={{ marginBottom: 10 }}>工单记录</div>
      {
        ticketRecordList?.map((it: OrderAPI.TicketDetail_ticketRecordList, index: number) => (
          <div style={{ marginBottom: 15 }} key={index}>
            <div>{moment(it.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
            <div>{it.content}</div>
          </div>
        ))
      }
    </Drawer>
  </div>;
};
export default OverTimeManagement;
