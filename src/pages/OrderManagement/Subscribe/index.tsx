import React, { useRef, useState } from 'react';
import { ActionType, PageContainer, ProColumns, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { useModel } from '@@/plugin-model/useModel';
import { Button, Col, Collapse, Drawer, Form, Input, Modal, Popover, Row, Select, Table, Tag } from 'antd';
import { BIG_GIFT_STATUS, cardServiceStatus, GDD_STATUS, MONTH_LIST, TIME_FORMAT } from '@/conf/conf';
import moment from 'moment';
import { CaretRightOutlined } from '@ant-design/icons';
import { checkBtnAuth } from '@/utils/utils';
import type { ColumnsType } from 'antd/es/table';

const { confirm } = Modal;
const { TextArea } = Input;
const { Option } = Select;

const { Panel } = Collapse;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const SubscribeManagement: React.FC = () => {
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();
  const {
    fetchGetUserServiceCardDetail,
    fetchManualCatchNextBag,
    fetchNotFreezeOrder,
    fetchFreezeOrder,
    fetchAddStopCount,
    fetchExtendExpiredTime,
    fetchGetExtendRecordList,
    subscribeDetail,
    subscribeBagOrderList,
    subscribeBigGiftList,
    deviceList,
    expiredTimeList,
    loading,
  } = useModel('userModel');
  const {
    fetchGetSubscribeList,
  } = useModel('subscribeModel');
  //书袋详情drawer
  const [visible, setVisible] = useState<boolean>(false);
  //冻结订阅卡备注modal
  const [remarkVisible, setRemarkVisible] = useState<boolean>(false);
  //增加延期modal
  const [expireTimeVisible, setExpireTimeVisible] = useState<boolean>(false);
  //增加延期列表modal
  const [expireTimeListVisible, setExpireTimeListVisible] = useState<boolean>(false);
  //冻结订阅卡备注
  const [freezeRemark, setFreezeRemark] = useState<string>('');
  //订阅类型 1:老服务 10:新服务+30 11:新服务168
  const [serviceId, setServiceId] = useState<number>();
  const [userServiceCardId, setUserServiceCardId] = useState<number>();
  const columns: ProColumns<UserAPI.SubscribeData>[] = [
    {
      title: '用户昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      hideInTable: true,
    },
    {
      title: '用户手机',
      dataIndex: 'phone',
      key: 'phone',
      hideInTable: true,
    },
    {
      title: '订阅订单ID',
      dataIndex: 'id',
      key: 'id',
      hideInSearch: true,
    },
    {
      title: '订阅类型',
      dataIndex: 'serviceName',
      key: 'serviceName',
      hideInSearch: true,
    },
    {
      title: '订阅编码',
      dataIndex: 'userCardNo',
      key: 'userCardNo',
      copyable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTimeRange',
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ createTimeStart: value[0], createTimeEnd: value[1] }),
      },
      hideInTable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择创建时间',
          },
        ],
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return (
          <Tag color={text === 2 ? 'red' : ''}>
            {(cardServiceStatus.find((it) => it.value === text) || {}).name ||
            ''}
          </Tag>
        );
      },
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTimeMill',
      key: 'createTimeMill',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      key: 'bagOperation',
      valueType: 'option',
      width: 180,
      render: (_, record) => {
        const { id, serviceId: serId } = record;
        return <Button
          type={`link`}
          key={'detail'}
          size={'small'}
          onClick={async () => {
            setVisible(true);
            setServiceId(serId);
            setUserServiceCardId(id);
            await fetchGetUserServiceCardDetail({ userServiceCardId: id } as OrderAPI.SubscribeDetailParams);
          }}>
          详情
        </Button>;
      },
    },
  ];
  const subscribeColumns: ProColumns<OrderAPI.SubScribeDetail_BagOrderList>[] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: '书袋编码',
      dataIndex: 'orderCode',
      key: 'orderCode',
      render: (text) => (
        <Button
          type='link'
          // onClick={() => this.toBagOrderList(text)}
        >
          {text}
        </Button>
      ),
    },
    {
      title: '书袋编号',
      dataIndex: 'sequence',
      key: 'sequence',
    },
    {
      title: '状态',
      dataIndex: 'statusStr',
      key: 'statusStr',
      render: (status, { damageOrderId, damageOrderStatus }) => {
        if (damageOrderId) {
          return <Popover content='检测此单有追损订单，可前往关联订单查看'>
            <Tag color='red'>{damageOrderStatus}</Tag>
          </Popover>;
        }
        return <Tag>{status || '--'}</Tag>;
      },
    },
    {
      title: '预计发货日期',
      dataIndex: 'preExpressTime',
      key: 'preExpressTime',
      valueType: 'date',
    },
    {
      title: '发货日期',
      dataIndex: 'expressTime',
      key: 'expressTime',
      valueType: 'date',
    },
    {
      title: '操作',
      key: 'action',
      render: () => {
        return (
          <Button
            type='link'
            // onClick={() => this.toLinkOrderDetail(record)}
          >
            查看订单详情
          </Button>
        );
      },
    },
  ];
  const expiredTimeColumns: ColumnsType<UserAPI.ExpiredTimeData> = [
    {
      title: '操作人',
      dataIndex: 'staffName',
      key: 'staffName',
      render: (text) => {
        return text || '--';
      },
    },
    {
      title: '延长时间',
      dataIndex: 'unitStr',
      key: 'unitStr',
      render: (text, record) => {
        const { serviceDuration } = record;
        return `${serviceDuration}${text}` || '--';
      },
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return moment(text).format(TIME_FORMAT.FULL) || '--';
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      render: (text) => {
        return text || '--';
      },
    },
  ];

  const expandedRowRender = (it: UserAPI.SubscribeData, index: number) => {
    it.key = index;
    const expandedColumn = [
      {
        title: it.serviceId === 11 ? '已用书袋' : '剩余书袋',
        dataIndex: it.serviceId === 1 ? 'usedCount' : 'leftCount',
        key: it.serviceId === 1 ? 'usedCount' : 'leftCount',
      },
      {
        title: '过期时间',
        dataIndex: 'expireTime',
        key: 'expireTime',
        valueType: 'dateTime',
      },
      {
        title: '激活时间',
        dataIndex: 'activateTime',
        key: 'activateTime',
        valueType: 'dateTime',
      },
    ];
    return (
      <ProTable
        columns={expandedColumn}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={[it]}
        pagination={false}
      />
    );
  };

  const handleNextBag = () => {
    confirm({
      title: '是否提前生成书袋',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await fetchManualCatchNextBag(userServiceCardId as number);
      },
    });
  };

  const handleUnFreeze = () => {
    confirm({
      title: '是否取消冻结',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await fetchNotFreezeOrder(userServiceCardId as number);
        await fetchGetUserServiceCardDetail({ userServiceCardId } as OrderAPI.SubscribeDetailParams);
        actionRef.current?.reload();
      },
    });
  };

  const handleAddStopCount = () => {
    confirm({
      title: '是否增加一次暂停次数',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await fetchAddStopCount(userServiceCardId as number);
        await fetchGetUserServiceCardDetail({ userServiceCardId } as OrderAPI.SubscribeDetailParams);
      },
    });
  };

  const handleInput = (e: any) => {
    setFreezeRemark(e.target.value);
  };

  const submitFreezeOrder = async () => {
    const params = {
      remark: freezeRemark,
      userServiceCardId: userServiceCardId,
    };
    await fetchFreezeOrder(params as UserAPI.FreezeOrderParams);
    await fetchGetUserServiceCardDetail({ userServiceCardId } as OrderAPI.SubscribeDetailParams);
    setRemarkVisible(false);
    actionRef.current?.reload();
  };

  const submitExpireTime = async () => {
    const values = await form.validateFields();
    const params = {
      ...values,
      userServiceCardId,
    };
    await fetchExtendExpiredTime(params);
    setExpireTimeVisible(false);
    form.resetFields();
  };

  return <PageContainer
    header={{
      title: '订单管理',
      breadcrumb: {},
    }}
  >
    <ProTable<UserAPI.SubscribeData>
      expandable={{ expandedRowRender }}
      toolBarRender={false}
      columns={columns}
      actionRef={actionRef}
      search={{
        labelWidth: 80,
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
      request={fetchGetSubscribeList}
      manualRequest
    />
    <Drawer
      title={'订阅订单详情'}
      visible={visible}
      onClose={() => {
        setVisible(false);
      }}
      width={900}
    >
      {
        checkBtnAuth('create_bag') && <ProDescriptions title={'常规操作'} loading={loading}>
          <ProDescriptions.Item>
            <Button type={'primary'} onClick={() => handleNextBag()}>生成书袋</Button>
          </ProDescriptions.Item>
        </ProDescriptions>
      }
      {
        (subscribeDetail?.status === -5 || subscribeDetail?.status === 5 || subscribeDetail?.status === 10) &&
        <ProDescriptions title={'特殊操作'} loading={loading}>
          <ProDescriptions.Item>
            {
              checkBtnAuth('unfrozen') && subscribeDetail?.status === -5 &&
              <Button type={'primary'} style={{ marginRight: 16 }} onClick={() => handleUnFreeze()}>解除冻结</Button>
            }
            {
              checkBtnAuth('frozen') &&
              (subscribeDetail?.status === 5 || subscribeDetail?.status === 10) &&
              <Button type={'primary'} danger style={{ marginRight: 16 }}
                      onClick={() => setRemarkVisible(true)}>冻结</Button>
            }
            {
              checkBtnAuth('add_pause_count') &&
              <Button type={'primary'} danger onClick={() => handleAddStopCount()}>增加一次暂停次数</Button>
            }
          </ProDescriptions.Item>
        </ProDescriptions>
      }
      {
        serviceId === 1 ?
          <ProDescriptions
            title={'基础信息'}
            loading={loading}
            dataSource={subscribeDetail}
            columns={
              [
                {
                  title: '用户信息',
                  key: 'username',
                  dataIndex: 'username',
                  render: (text, record) => {
                    const { phone } = record;
                    return `${text || '--'} / ${phone || '--'}`;
                  },
                },
                {
                  title: '订单时间',
                  key: 'createTime',
                  dataIndex: 'createTime',
                  valueType: 'dateTime',
                },
                {
                  title: '会员类型',
                  key: 'serviceName',
                  dataIndex: 'serviceName',
                },
                {
                  title: '激活时间',
                  key: 'activateTime',
                  dataIndex: 'activateTime',
                  valueType: 'dateTime',
                },
                {
                  title: '订单编码',
                  key: 'userServiceCardNo',
                  dataIndex: 'userServiceCardNo',
                  copyable: true,
                },
                {
                  title: '过期时间',
                  key: 'expireTime',
                  dataIndex: 'expireTime',
                  render: (text: any) => {
                    return <div>
                  <span>
                    {text ? moment(text).format(TIME_FORMAT.FULL) : '-'}
                  </span>
                      <Button
                        style={{ marginLeft: 10 }}
                        shape={'round'}
                        size={'small'}
                        type={'primary'} onClick={() => {
                        setVisible(false);
                        setExpireTimeVisible(true);
                      }}>增加期限</Button>
                      <Button
                        size={'small'}
                        type={'link'}
                        onClick={async () => {
                          await fetchGetExtendRecordList(userServiceCardId as number);
                          setExpireTimeListVisible(true);
                        }}
                      >
                        查看延期记录
                      </Button>
                    </div>;
                  },
                },
                {
                  title: '金额',
                  key: 'amountValue',
                  dataIndex: 'amountValue',
                  valueType: 'money',
                },
                {
                  title: '书袋总量',
                  key: 'serviceCount',
                  dataIndex: 'serviceCount',
                },
                {
                  title: '剩余书袋',
                  key: 'leftCount',
                  dataIndex: 'leftCount',
                },
              ]
            }
            column={2}
          >
            {
              subscribeDetail?.guaranteeInfos?.map((it: any, index: number) => (
                <ProDescriptions.Item label={`担保类型${index + 1}`} key={index}>
                  {it}<span style={{ color: '#1890ff', cursor: 'pointer', marginLeft: 10 }}>详情</span>
                </ProDescriptions.Item>
              ))
            }
          </ProDescriptions> :
          <ProDescriptions
            title={'基础信息'}
            loading={loading}
            dataSource={subscribeDetail}
            columns={
              [
                {
                  title: '用户信息',
                  key: 'username',
                  dataIndex: 'username',
                  render: (text, record) => {
                    const { phone } = record;
                    return `${text || '--'} / ${phone || '--'}`;
                  },
                },
                {
                  title: '激活时间',
                  key: 'activateTime',
                  dataIndex: 'activateTime',
                  valueType: 'dateTime',
                },
                {
                  title: '会员类型',
                  key: 'serviceName',
                  dataIndex: 'serviceName',
                },
                {
                  title: '过期时间',
                  key: 'expireTime',
                  dataIndex: 'expireTime',
                  render: (text: any) => {
                    return <div>
                  <span>
                    {text ? moment(text).format(TIME_FORMAT.FULL) : '-'}
                  </span>
                      <Button
                        style={{ marginLeft: 10 }}
                        shape={'round'}
                        size={'small'}
                        type={'primary'}
                        onClick={() => setExpireTimeVisible(true)}
                      >增加期限</Button>
                      <Button
                        size={'small'}
                        type={'link'}
                        onClick={async () => {
                          await fetchGetExtendRecordList(userServiceCardId as number);
                          setExpireTimeListVisible(true);
                        }}
                      >
                        查看延期记录
                      </Button>
                    </div>;
                  },
                },
                {
                  title: '订单编码',
                  key: 'userServiceCardNo',
                  dataIndex: 'userServiceCardNo',
                  copyable: true,
                },
                {
                  title: '是否自动开通',
                  key: 'continuousSub',
                  dataIndex: 'continuousSub',
                  render: (text) => text ? '开通中' : '未开通',
                },
                {
                  title: '金额',
                  key: 'amountValue',
                  dataIndex: 'amountValue',
                  render: (text) => {
                    return <div>
                      <span>{`¥${text || '-'}`}</span>
                      <Button
                        style={{ marginLeft: 5 }}
                        size={'small'}
                        type={'link'}
                      >
                        查看扣费记录
                      </Button>
                    </div>;
                  },
                },
                {
                  title: '书袋总量',
                  key: 'serviceCount',
                  dataIndex: 'serviceCount',
                  render: (text) => {
                    return serviceId === 11 ? '不限量' : text;
                  },
                },
                {
                  title: serviceId === 11 ? '已用书袋' : '剩余书袋',
                  key: serviceId === 11 ? 'usedCount' : 'leftCount',
                  dataIndex: serviceId === 11 ? 'usedCount' : 'leftCount',
                },
              ]
            }
            column={2}
          >
            {
              subscribeDetail?.guaranteeInfos?.map((it: any, index: number) => (
                <ProDescriptions.Item label={`担保类型${index + 1}`} key={index}>
                  {it}<span style={{ color: '#1890ff', cursor: 'pointer', marginLeft: 10 }}>详情</span>
                </ProDescriptions.Item>
              ))
            }
          </ProDescriptions>
      }
      {
        serviceId !== 1 &&
        <>
          <ProDescriptions
            title={'新服务-大礼包'}
            loading={loading}
          >
            <div>
              <Collapse
                style={{ width: '100% ' }}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              >
                {
                  subscribeBigGiftList?.map((it: OrderAPI.SubScribeDetail_BigGiftList, index: number) => (
                    <Panel header={
                      <Row>
                        <Col span={12}>
                          <div style={{ marginBottom: 16 }}>订单编码：{it.orderCode || '-'}</div>
                        </Col>
                        <Col span={12}>
                          <div style={{ marginBottom: 16 }}>订单包含：{it.orderInclude || '-'}</div>
                        </Col>
                        <Col
                          span={12}>大礼包状态：<Tag
                          color={'blue'}>{(BIG_GIFT_STATUS.find((i) => i.value === it.status) || {}).label || '-'}</Tag></Col>
                        <Col span={12}>大礼包内谷兜兜编码：{it.gddCode || '-'}</Col>
                      </Row>
                    } key={index}>
                      <Row>
                        <Col span={12}>
                          <div style={{ marginBottom: 16 }}>物流公司：{it.expressCompany || '-'}</div>
                        </Col>
                        <Col span={12}>
                          <div style={{ marginBottom: 16 }}>物流单号：{it.expressCode || '-'}</div>
                        </Col>
                        <Col span={12}>
                          <div
                            style={{ marginBottom: 16 }}>推送仓库时间：{it.pushTime ? moment(it.pushTime).format(TIME_FORMAT.FULL) : '-'}</div>
                        </Col>
                        <Col span={12}>
                          <div
                            style={{ marginBottom: 16 }}>发货时间：{it.pushTime ? moment(it.pushTime).format(TIME_FORMAT.FULL) : '-'}</div>
                        </Col>
                        <Col span={12}>
                          <div
                            style={{ marginBottom: 16 }}>物流签收时间：{it.signTime ? moment(it.signTime).format(TIME_FORMAT.FULL) : '-'}</div>
                        </Col>
                      </Row>
                    </Panel>
                  ))
                }
              </Collapse>
            </div>
          </ProDescriptions>
          <ProDescriptions
            title={'新服务-谷兜兜'}
            loading={loading}
          >
            <div>
              <Collapse
                style={{ width: '100% ' }}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              >
                {
                  deviceList?.map((it: OrderAPI.SubScribeDetail_DeviceList, index) => (
                    <Panel header={
                      <Row>
                        <Col span={24}>
                          <div style={{ marginBottom: 16 }}>设备ID：{it.id}</div>
                        </Col>
                        <Col span={24}>
                          <div>谷兜兜编码：{it.deviceId || '-'}</div>
                        </Col>
                      </Row>
                    } key={`${it.id}_${index}`}>
                      <Row>
                        <Col span={12}>
                          <div style={{ marginBottom: 16 }}>谷兜兜使用情况：{it.gddStatusValue || '-'}</div>
                        </Col>
                        <Col span={12}>
                          <div
                            style={{ marginBottom: 16 }}>谷兜兜使用状态：{(GDD_STATUS.find((i) => i.value === it.status) || {}).label || '-'}</div>
                        </Col>
                        <Col span={12}>
                          <div
                            style={{ marginBottom: 16 }}>绑定时间：{it.bindingTime ? moment(it.bindingTime).format(TIME_FORMAT.FULL) : '-'}</div>
                        </Col>
                      </Row>
                    </Panel>
                  ))
                }
              </Collapse>
            </div>
          </ProDescriptions>
        </>
      }

      <div className='ant-descriptions-title' style={{ marginBottom: 20 }}>书袋信息</div>
      <ProTable<OrderAPI.SubScribeDetail_BagOrderList>
        search={false}
        toolBarRender={false}
        dataSource={subscribeBagOrderList}
        size={'small'}
        rowKey='id'
        loading={loading}
        columns={subscribeColumns}
      />
    </Drawer>
    <Modal
      title={'填写备注说明'}
      visible={remarkVisible}
      onCancel={() => setRemarkVisible(false)}
      onOk={() => submitFreezeOrder()}
    >
      <TextArea rows={4} value={freezeRemark} onChange={handleInput} />
    </Modal>
    <Modal
      title={'增加期限'}
      visible={expireTimeVisible}
      onCancel={() => {
        form.resetFields();
        setExpireTimeVisible(false);
      }}
      onOk={() => submitExpireTime()}
      forceRender={true}
    >
      <Form
        {...formItemLayout}
        form={form}
      >
        <Form.Item
          name='monthCnt'
          label='添加期限'
          rules={[{ required: true, message: '请选择添加期限' }]}
        >
          {
            serviceId === 1 ? <Select placeholder={'请选择添加期限'}>
              {
                MONTH_LIST.map((i) => (
                  <Option value={i.value} key={i.value}>{i.label}</Option>
                ))
              }
            </Select> : <Input placeholder={'请选择添加期限'} />
          }
        </Form.Item>
        <Form.Item
          name={'remark'}
          label='备注'
          rules={[{ required: true, message: '请填写备注' }]}
        >
          <Input placeholder={'请添加备注'} />
        </Form.Item>
      </Form>
    </Modal>
    <Modal
      title={'延期记录'}
      visible={expireTimeListVisible}
      onCancel={() => setExpireTimeListVisible(false)}
      footer={false}
    >
      <Table
        dataSource={expiredTimeList}
        columns={expiredTimeColumns}
      />

    </Modal>
  </PageContainer>;
};
export default SubscribeManagement;
