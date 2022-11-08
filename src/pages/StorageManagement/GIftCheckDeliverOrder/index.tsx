import React, { useRef, useState } from 'react';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Cascader, Drawer, Form, Input, Modal, Space, Tag, Radio, Select, Popover } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import cityOptions from '@/conf/address';
import { EXPRESS_COMPANY, POINTS_ORDER_STATUS } from '@/conf/conf';

const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const PointCheckDeliverOrder: React.FC = () => {
  const [form] = Form.useForm();

  const actionRef = useRef<ActionType>();
  const {
    fetchGetAuditPointsOrderList,
    fetchAuditPointsOrderUnusual,
    fetchEditPointsInfo,
    submitLoading,
    fetchAuditPointsOrderConfirm,

  } = useModel('pointCheckDeliverModel');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [remark, setRemark] = useState<string>('');
  const [auditMode, setAuditMode] = useState<string>('auto');
  const [currentExpressCompany, setCurrentExpressCompany] = useState<number>(8);
  const [detailId, setDetailId] = useState<number>();
  const [remarkVisible, setRemarkVisible] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [auditModeLoading, setAuditModeLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [recordInfo, setRecordInfo] = useState<OrderAPI.PointCheckDeliverData>();
  const [currentExpressCompanyModalVisible, setCurrentExpressCompanyModalVisible] = useState<boolean>(false);
  const columns: ProColumns<OrderAPI.PointCheckDeliverData>[] = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 100, hideInSearch: true },
    { title: '订单编码', dataIndex: 'orderCode', key: 'orderCode', width: 250 },
    { title: '商品编码', dataIndex: 'productNo', key: 'productNo', hideInTable: true },
    { title: '排除的商品编码', dataIndex: 'excludeProductNo', key: 'excludeProductNo', hideInTable: true },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
      hideInSearch: true,
    },
    {
      title: '商品图片',
      dataIndex: 'goodsImgurl',
      key: 'goodsImgurl',
      hideInSearch: true,
      render: (text) => {
        return <img src={text as string} alt={''} width={60} />;
      },
    },
    {
      title: '商品类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        return <Tag color={type === 1 ? 'green' : 'blue'}>
          {type === 1 ? '积分兑换' : '抽奖'}
        </Tag>;
      },
      hideInSearch: true,
    },
    {
      title: '收货信息',
      dataIndex: 'contactName',
      key: 'contactName',
      render: (name, record) => {
        const { contactPhone, province, city, county, address } = record;
        const content = `${name} / ${contactPhone}  ${province || ''}${city || ''}${county || ''}${address || ''}`;
        return <Popover content={content} title={null}>
          <div style={{
            maxWidth: 200,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}>{content}</div>
        </Popover>;
      },
      hideInSearch: true,
    },
    {
      title: '物流',
      dataIndex: 'expressCompany',
      key: 'expressCompany',
      width: 120,
      render: (text) => {
        return <Tag>{text || ''}</Tag>;
      },
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: POINTS_ORDER_STATUS,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        1: { text: '待发货' },
        2: { text: '已发货' },
      },
      hideInTable: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      hideInTable: true,
    },
    {
      title: '下单人手机号',
      dataIndex: 'phone',
      key: 'phone',
      hideInTable: true,
    },
    {
      title: '收件人手机号',
      dataIndex: 'contactPhone',
      key: 'contactPhone',
      hideInTable: true,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      hideInTable: true,
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTimeRange',
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      valueType: 'option',
      width: 200,
      fixed: 'right',
      render: (_, record) => {
        const {
          id,
          contactName,
          province,
          city,
          county,
          contactPhone,
          address,
          sellerRemark,
        } = record;
        return <>
          <Button type={`link`} onClick={async () => {
            setDrawerVisible(true);
            setLoading(true);
            form.setFieldsValue({
              contactName,
              contactPhone,
              area: province && city && county && [province, city, county],
              address,
              sellerRemark,
            });
            setDetailId(id);
            setRecordInfo(record);
            setLoading(false);
          }}>查看</Button>
        </>;
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const changeRemarkTextArea = (e: any) => {
    setRemark(e.target.value);
  };

  const changeCurrentExpressCompany = (e: any) => {
    setCurrentExpressCompany(e.target.value);
  };


  const expandedRowRender = (it: OrderAPI.PointCheckDeliverData) => {
    const { contactName, contactPhone, province, country, city, address } = it;
    return (
      <div
        style={{ marginLeft: 70 }}>收货地址：{`${contactName || '-'} / ${contactPhone || '-'} / ${province || ''}${city || ''}${country || ''}${address || ''}`}</div>
    );
  };

  const submitAddress = async () => {
    const values = await form.validateFields();
    const { company, contactName, contactPhone, sellerRemark, address, area } = values;
    const [province, city, county] = area;
    const params = {
      company,
      county,
      city,
      contactName,
      contactPhone,
      province,
      sellerRemark,
      address,
      pointsGoodsOrderId: detailId as number,
    };
    confirm({
      title: '是否要保存该地址？',
      onOk: async () => {
        await fetchEditPointsInfo(params);
        actionRef.current?.reload();
        setDrawerVisible(false);
        form.resetFields();
      },
    });
  };

  const submitInfo = async () => {
    const values = await form.validateFields();
    const { area } = values;
    const [province, city, county] = area;
    const params = {
      ...values,
      county,
      city,
      province,
      pointsGoodsOrderId: detailId as number,
    };
    delete params.area;
    if (auditMode === 'auto') {
      params.company = '';
    }
    confirm({
      title: '是否确认审单？',
      onOk: async () => {
        await fetchAuditPointsOrderConfirm(params);
        actionRef.current?.reload();
        setDrawerVisible(false);
        form.resetFields();
      },
    });
  };


  return <div className={'unusual-order-wrapper'}>
    <PageContainer
      header={{
        title: '积分发货审单',
        breadcrumb: {},
      }}
    >
      <ProTable<OrderAPI.PointCheckDeliverData>
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandAllRows: true }}
        actionRef={actionRef}
        scroll={{ x: 2000 }}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a>批量处理</a>
            </Space>
          );
        }}
        toolBarRender={() => [
          <>
            默认快递：{auditMode === 'auto' ? '默认分配' : EXPRESS_COMPANY.find((it) => it.value === currentExpressCompany).name}
            {
              auditMode === 'normal' && <Button
                type='primary'
                onClick={() => {
                  setCurrentExpressCompanyModalVisible(true);
                }}
                style={{ marginLeft: '10px' }}>
                修改
              </Button>
            }
            <Button
              type={`primary`}
              key='add'
              loading={auditModeLoading}
              onClick={() => {
                setAuditModeLoading(true);
                setTimeout(() => {
                  setAuditMode(auditMode === 'auto' ? 'normal' : 'auto');
                  setAuditModeLoading(false);
                }, 1000);
              }}
            >
              {auditMode === 'auto' ? '切换手动模式' : '切换自动模式'}
            </Button>
          </>,

        ]}
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
                setSelectedRowKeys([]);
              }}
            >
              {searchConfig.searchText}
            </Button>,
          ],
        }}
        rowKey='id'
        request={fetchGetAuditPointsOrderList}
      />
    </PageContainer>
    <Drawer
      title={`${recordInfo?.orderCode || '--'}的详情`}
      visible={drawerVisible}
      onClose={() => {
        setDrawerVisible(false);
        form.resetFields();
      }}
      width={800}
      destroyOnClose={true}
    >
      <ProDescriptions
        title={'书袋信息'}
        dataSource={recordInfo}
        loading={loading}
        columns={
          [
            {
              title: '商品ID:',
              key: 'id',
              dataIndex: 'id',
            },

            {
              title: '商品名称',
              key: 'goodsName',
              dataIndex: 'goodsName',
            },
            {
              title: '订单状态',
              key: 'status',
              dataIndex: 'status',
              valueEnum: POINTS_ORDER_STATUS,
            },
            {
              title: '商品数量',
              key: 'quantity',
              dataIndex: 'quantity',
            },
            {
              title: '商品所需积分',
              key: 'points',
              dataIndex: 'points',
            },
            {
              title: '积分折扣',
              key: 'discountPoints',
              dataIndex: 'discountPoints',
            },
            {
              title: '实付积分',
              key: 'payPoints',
              dataIndex: 'payPoints',
            },
            {
              title: '商品所需金额',
              key: 'amount',
              dataIndex: 'amount',
            },
            {
              title: '金额折扣',
              key: 'discountAmount',
              dataIndex: 'discountAmount',
            },
            {
              title: '实付金额',
              key: 'payAmount',
              dataIndex: 'payAmount',
            },
            {
              title: '创建时间',
              key: 'createTime',
              dataIndex: 'createTime',
              valueType: 'dateTime',
            },
            {
              title: '支付时间',
              key: 'paidTime',
              dataIndex: 'paidTime',
              valueType: 'dateTime',
            },

          ]
        }
        column={2}
      />
      <div className='ant-descriptions-title' style={{ marginBottom: 20 }}>收货地址</div>
      <Form
        {...formItemLayout}
        form={form}
      >
        <Form.Item label={'收货人姓名'} name={'contactName'}>
          <Input />
        </Form.Item>
        <Form.Item label={'收货人电话'} name={'contactPhone'}>
          <Input />
        </Form.Item>
        <Form.Item name='area' label={'省市区'}>
          <Cascader options={cityOptions} placeholder=' 请填写省市区' />
        </Form.Item>
        <Form.Item name='address' label='地址'>
          <Input placeholder={'请填写地址'} />
        </Form.Item>
        {
          auditMode === 'auto' ?
            <Form.Item label={'物流公司'}>
              系统自动分配（当前物流：{
              (EXPRESS_COMPANY.find((i) => i.value === currentExpressCompany) || {})
                .name || '暂未分配'}）
            </Form.Item>
            :
            <Form.Item label={'物流公司'} name='company'>
              <Select>
                {EXPRESS_COMPANY.map((it) => (
                  <Option value={it.value} key={it.value}>
                    {it.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
        }
        <Form.Item label={'备注'} name={'sellerRemark'}>
          <Input />
        </Form.Item>
      </Form>
      {
        recordInfo && (recordInfo?.status >= 10 && recordInfo?.status <= 12) &&
        <Button type={'primary'} style={{ marginRight: 16 }} onClick={() => submitInfo()}>确认审单</Button>
      }
      {
        recordInfo && recordInfo?.status < 20 &&
        <Button onClick={() => submitAddress()} type={'primary'}
                style={{ marginRight: 16 }}>修改地址</Button>
      }
      {
        recordInfo && recordInfo?.status < 10 &&
        <Button onClick={() => {
          setDrawerVisible(false)
          setRemarkVisible(true);
        }} type={'primary'} danger>标记异常</Button>
      }
    </Drawer>

    <Modal
      title='修改默认快递'
      visible={currentExpressCompanyModalVisible}
      footer={null}
      onCancel={() => setCurrentExpressCompanyModalVisible(false)}>
      <Radio.Group
        onChange={changeCurrentExpressCompany}
        value={currentExpressCompany}>
        {EXPRESS_COMPANY.map((i) => (
          <Radio value={i.value} key={i.value}>
            {i.name}
          </Radio>
        ))}
      </Radio.Group>
    </Modal>
    <Modal
      title='填写备注'
      confirmLoading={submitLoading}
      onCancel={() => setRemarkVisible(false)}
      onOk={async () => {
        await fetchAuditPointsOrderUnusual({ sellerRemark: remark, pointsOrderId: detailId });
        setRemarkVisible(false);
        actionRef?.current?.reload();
      }}
      visible={remarkVisible}
      forceRender={true}
      destroyOnClose={true}
    >
      <TextArea onChange={changeRemarkTextArea} />
    </Modal>
  </div>;
};
export default PointCheckDeliverOrder;
