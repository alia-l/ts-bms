import React, { Fragment, useRef, useState } from 'react';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, Form, Input, Modal, Tag, Popover } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { POINTS_ORDER_STATUS } from '@/conf/conf';

const { TextArea } = Input;

const PointOrder: React.FC = () => {
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();
  const {
    fetchGetPointsOrderList,
    fetchRefundPointOrder,
    submitLoading,
    detail,
    loading,
    fetchGetPointOrderDetail,
  } = useModel('pointModel');
  const [remark, setRemark] = useState<string>('');
  const [detailId, setDetailId] = useState<number>();
  const [remarkVisible, setRemarkVisible] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const columns: ProColumns<OrderAPI.PointCheckDeliverData>[] = [
    { title: '下单手机号', dataIndex: 'phone', key: 'phone', hideInTable: true },
    { title: '收货手机号', dataIndex: 'contactPhone', key: 'contactPhone', hideInTable: true },
    { title: '订单编码', dataIndex: 'orderCode', key: 'orderCode', width: 300, hideInSearch: true, copyable: true },
    {
      title: '下单人',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 270,
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
      width: 300,
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
      title: '商品类型',
      dataIndex: 'type',
      key: 'type',
      width: 80,
      render: (type) => {
        return <Tag color={type === 1 ? 'green' : 'blue'}>
          {type === 1 ? '积分兑换' : '抽奖'}
        </Tag>;
      },
      hideInSearch: true,
    },
    {
      title: '商品售价',
      dataIndex: 'payAmount',
      key: 'payAmount',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '兑换数量',
      dataIndex: 'quantity',
      key: 'quantity',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '兑换积分',
      dataIndex: 'points',
      key: 'points',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '支付积分',
      dataIndex: 'payPoints',
      key: 'payPoints',
      hideInSearch: true,
      width: 100,
    },

    {
      title: '支付时间',
      dataIndex: 'paidTime',
      key: 'paidTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 100,

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
        return `${province || ''}${city || ''}${county || ''}${address || ''}`;
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
      valueEnum: {
        1: { text: '待支付', status: 'Default' },
        2: { text: '全部支付', status: 'Processing' },
        3: { text: '已发货', status: 'Processing' },
        4: { text: '已完成', status: 'Success' },
      },
      hideInTable: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: POINTS_ORDER_STATUS,
      hideInSearch: true,
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
          allowRefund,
        } = record;
        return <>
          <Button type={`link`} onClick={async () => {
            setDrawerVisible(true);
            await fetchGetPointOrderDetail(id);
            setDetailId(id);
          }}>详情</Button>
          {
            allowRefund && <Button size={'small'} type={`primary`} onClick={async () => {
              setRemarkVisible(true);
              await fetchGetPointOrderDetail(id);
              setDetailId(id);
            }}>退款</Button>
          }
        </>;
      },
    },
  ];


  const changeRemarkTextArea = (e: any) => {
    setRemark(e.target.value);
  };


  return <div className={'unusual-order-wrapper'}>
    <PageContainer
      header={{
        title: '积分订单',
        breadcrumb: {},
      }}
    >
      <ProTable<OrderAPI.PointCheckDeliverData>
        columns={columns}
        actionRef={actionRef}
        scroll={{ x: 3000 }}
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
        request={fetchGetPointsOrderList}
      />
    </PageContainer>
    <Drawer
      visible={drawerVisible}
      onClose={() => {
        setDrawerVisible(false);
        form.resetFields();
      }}
      width={400}
      destroyOnClose={true}
    >
      <ProDescriptions
        title={'积分详情'}
        dataSource={detail}
        loading={loading}
        columns={
          [
            {
              title: 'id:',
              key: 'id',
              dataIndex: 'id',
            },

            {
              title: '用户信息',
              key: 'contactName',
              dataIndex: 'contactName',
            },
            {
              title: '支付金额',
              key: 'payAmount',
              dataIndex: 'payAmount',
              valueType: 'money',
            },
            {
              title: '支付积分',
              key: 'payPoint',
              dataIndex: 'payPoint',
              render: (text) => {
                return `${text}积分`;
              },
            },
            {
              title: '支付时间',
              key: 'payTime',
              dataIndex: 'payTime',
              valueType: 'dateTime',
            },
          ]
        }
        column={1}
      />
      {
        detail?.status === -30 && <ProDescriptions
          dataSource={detail}
          loading={loading}
          columns={
            [
              {
                title: '退款金额',
                key: 'refundAmount',
                dataIndex: 'refundAmount',
                valueType: 'money',
              },

              {
                title: '退款积分',
                key: 'refundPoint',
                dataIndex: 'refundPoint',
                render: (text) => {
                  return `${text}积分`;
                },
              },
              {
                title: '退款时间',
                key: 'refundTime',
                dataIndex: 'refundTime',
                valueType: 'dateTime',
              },
              {
                title: '操作人',
                key: 'refundStaffName',
                dataIndex: 'refundStaffName',
              },
            ]
          }
          column={1}
        />
      }
    </Drawer>
    <Modal
      title='填写备注'
      confirmLoading={submitLoading}
      onCancel={() => setRemarkVisible(false)}
      onOk={async () => {
        await fetchRefundPointOrder({ remark, pointsGoodsOrderId: detailId });
        setRemarkVisible(false);
        actionRef?.current?.reload();
      }}
      visible={remarkVisible}
      forceRender={true}
      destroyOnClose={true}
    >
      <TextArea onChange={changeRemarkTextArea} placeholder={'请在退款前与用户、仓库、物流进行必要的沟通'} />
    </Modal>
  </div>;
};
export default PointOrder;
