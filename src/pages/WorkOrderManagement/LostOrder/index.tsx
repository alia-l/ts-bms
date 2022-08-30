import React, { useRef, useState } from 'react';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Modal, Space } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import moment from 'moment';
import { TIME_FORMAT } from '@/conf/conf';
import { numberCal } from '@/utils/utils';

const { TextArea } = Input;

const WORK_STATUS = {
  0: { text: '未处理' },
  50: { text: '快递已赔付' },
};

const TICKET_TYPE = {
  11: { text: '正向单' },
  12: { text: '逆向单' },
};

const EXPRESS_COMPANY = {
  1: { text: '圆通速递' },
  2: { text: '申通快递' },
  3: { text: '中通快递' },
  4: { text: '韵达速递' },
  5: { text: '顺丰速运' },
  6: { text: 'EMS' },
  7: { text: '京东' },
  8: { text: '顺丰丰网' },
};

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const LosOrderManagement: React.FC = () => {
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();
  const {
    fetchGetLostTicketList,
    fetchOverTicketList,
    submitLoading,
  } = useModel('lostOrderModel');
  const [createTime, setCreateTime] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const columns: ProColumns<OrderAPI.AddLostTicketRecordData>[] = [
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
      title: '丢件类型',
      dataIndex: 'ticketType',
      key: 'ticketType',
      initialValue: '11',
      valueEnum: TICKET_TYPE,
      width: 70,
      hideInTable: true,
    },
    {
      title: '快递公司',
      dataIndex: 'trackingName',
      key: 'trackingName',
      valueEnum: EXPRESS_COMPANY,
      hideInTable: true,
    },
    {
      title: '用户手机号',
      dataIndex: 'telephone',
      key: 'telephone',
      hideInTable: true,
    },
    {
      title: '订单号',
      dataIndex: 'orderCode',
      key: 'orderCode',
      hideInTable: true,
    },
    {
      title: '预计签收时间',
      dataIndex: 'ticketTimeRange',
      key: 'ticketTimeRange',
      valueType: 'dateRange',
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
      title: '订单编号',
      dataIndex: 'orderCode',
      key: 'orderCode',
      hideInSearch: true,
    },
    {
      title: '书袋序号',
      dataIndex: 'sequence',
      key: 'sequence',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: '订单创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
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
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      valueType: 'money',
      hideInSearch: true,
    },
    {
      title: '状态更新时间',
      dataIndex: 'handleTime',
      key: 'handleTime',
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
        const { createTime: c, amount } = record;
        return <Button type={`link`} onClick={async () => {
          setCreateTime(moment(c).format(TIME_FORMAT.FULL));
          setTotalAmount(amount);
          setModalVisible(true);
        }}>结算</Button>;
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[], rows: OrderAPI.AddLostTicketRecordData[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (rows.length === 1) {
      const time = moment(rows[0].createTime).format(TIME_FORMAT.FULL);
      const amount = rows[0].amount;
      setCreateTime(time);
      setQuantity(1);
      setTotalAmount(amount);
    } else if (rows.length > 1) {
      const time = `${moment(rows[0].createTime).format(TIME_FORMAT.FULL)} ~ ${moment(rows[rows.length - 1].createTime).format(TIME_FORMAT.FULL)}`;
      let sum = 0;
      rows.forEach((it) => {
        sum = numberCal.add(sum, it.amount);
      });
      setCreateTime(time);
      setQuantity(rows.length);
      setTotalAmount(sum);
    }

  };

  const submitInfo = async () => {
    const values = await form.validateFields();
    const params = {
      ...values,
      ticketIdList: [...selectedRowKeys],
    };
    await fetchOverTicketList(params);
    setModalVisible(false)
    setSelectedRowKeys([])
    actionRef.current?.reload()
    form.resetFields()
  };


  return <div className={'unusual-order-wrapper'}>
    <PageContainer
      header={{
        title: '丢件工单',
        breadcrumb: {},
      }}
    >
      <ProTable<OrderAPI.AddLostTicketRecordData>
        columns={columns}
        actionRef={actionRef}
        scroll={{ x: 2000 }}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        tableAlertOptionRender={() => {
          return (
            <Space size={16} onClick={() => setModalVisible(true)}>
              <a>批量处理</a>
            </Space>
          );
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
                setSelectedRowKeys([]);
              }}
            >
              {searchConfig.searchText}
            </Button>,
          ],
        }}
        rowKey='id'
        request={fetchGetLostTicketList}
      />
    </PageContainer>
    <Modal
      title={'快递赔付'}
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      destroyOnClose={true}
      forceRender={true}
      onOk={() => submitInfo()}
      confirmLoading={submitLoading}
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item label={`时间`}>{createTime}</Form.Item>
        <Form.Item label={`丢件单数`}>{quantity}</Form.Item>
        <Form.Item label={`累计金额`}>{totalAmount}</Form.Item>
        <Form.Item label={'备注'} rules={[{ required: true, message: '请出入备注' }]} name={'content'}>
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  </div>;
};
export default LosOrderManagement;
