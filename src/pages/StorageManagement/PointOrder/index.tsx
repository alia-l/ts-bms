import React, { Fragment, useRef, useState } from 'react';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Cascader, Drawer, Form, Input, Modal, Tag, Radio, Select, Popover } from 'antd';
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

const PointOrder: React.FC = () => {
  const [form] = Form.useForm();

  const actionRef = useRef<ActionType>();
  const {
    fetchGetPointsOrderList,
    submitLoading,
  } = useModel('pointModel');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [remark, setRemark] = useState<string>('');
  const [currentExpressCompany, setCurrentExpressCompany] = useState<number>(8);
  const [detailId, setDetailId] = useState<number>();
  const [remarkVisible, setRemarkVisible] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [recordInfo, setRecordInfo] = useState<OrderAPI.PointCheckDeliverData>();
  const [currentExpressCompanyModalVisible, setCurrentExpressCompanyModalVisible] = useState<boolean>(false);
  const columns: ProColumns<OrderAPI.PointCheckDeliverData>[] = [
    { title: '下单手机号', dataIndex: 'phone', key: 'phone', hideInTable: true },
    { title: '收货手机号', dataIndex: 'contactPhone', key: 'contactPhone', hideInTable: true },
    { title: '订单编码', dataIndex: 'orderCode', key: 'orderCode', width: 250, hideInSearch: true },
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
      title: '下单人',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 200,
      render: (nickname, { phone }) => {
        const content = `${nickname || '-'} / ${phone || '-'}`;
        return <Popover content={content} title={null}>
          <div style={{
            overflow: ' hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {content}
          </div>
        </Popover>;
      },
      hideInSearch: true,
    },
    {
      title: '商品信息',
      dataIndex: 'pointsShopGoodsId',
      key: 'pointsShopGoodsId',
      width: 350,
      render: (_, record) => {
        const { goodsName, goodsImgurl } = record;
        const url = goodsImgurl.indexOf('http') > -1 ? goodsImgurl : `https://cdn.kangarooread.com${goodsImgurl}`;
        return (
          <Fragment>
            {goodsImgurl ?
              <img src={url} height='60' width='60' alt='' /> : null}
            <span style={{ margin: '0 10px' }}>{goodsName}</span>
          </Fragment>
        );
      },
      hideInSearch: true,
    },
    {
      title: '商品售价',
      dataIndex: 'payAmount',
      key: 'payAmount',
      hideInSearch: true,

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
      title: '兑换数量',
      dataIndex: 'quantity',
      key: 'quantity',
      hideInSearch: true,
    },
    {
      title: '兑换积分',
      dataIndex: 'points',
      key: 'points',
      hideInSearch: true,
    },
    {
      title: '支付积分',
      dataIndex: 'payPoints',
      key: 'payPoints',
      hideInSearch: true,
    },
    {
      title: '支付时间',
      dataIndex: 'paidTime',
      key: 'paidTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '物流单号',
      dataIndex: 'expressCode',
      key: 'expressCode',
    },
    {
      title: '收货人信息',
      dataIndex: 'contactName',
      key: 'contactName',
      render: (_, record) => {
        const { contactName, contactPhone } = record;
        return `${contactName || '--'} / ${contactPhone || '--'}`;
      },
      hideInSearch: true,
    },
    {
      title: '收货地址',
      dataIndex: 'address',
      key: 'address',
      width: 300,
      render: (_, record) => {
        const { province, city, county, address } = record;
        return `${province || ''}${city || ''}${county}${address}`;
      },
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'sellerRemark',
      key: 'sellerRemark',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: POINTS_ORDER_STATUS,
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


  return <div className={'unusual-order-wrapper'}>
    <PageContainer
      header={{
        title: '积分发货审单',
        breadcrumb: {},
      }}
    >
      <ProTable<OrderAPI.PointCheckDeliverData>
        columns={columns}
        actionRef={actionRef}
        scroll={{ x: 2000 }}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
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
                setSelectedRowKeys([]);
              }}
            >
              {searchConfig.searchText}
            </Button>,
          ],
        }}
        rowKey='id'
        request={fetchGetPointsOrderList}
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
        <Form.Item label={'备注'} name={'sellerRemark'}>
          <Input />
        </Form.Item>
      </Form>
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
        // await fetchAuditPointsOrderUnusual({ sellerRemark: remark, pointsOrderId: detailId });
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
export default PointOrder;
