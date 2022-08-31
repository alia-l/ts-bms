import React, { useEffect, useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { ProCard, ProColumns, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { Input, Modal, Space, Tag } from 'antd';
import { PURCHASE_SUB_STATUS } from '@/conf/conf';

const PurchaseOrderDetail: React.FC = (props) => {
  const {
    fetchGetPurchaseDetail,
    fetchRefundPurchaseSubOrder,
    detail,
    loading,
    submitLoading,
  } = useModel('purchaseOrderModel');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [remark, setRemark] = useState<string>('');
  const [purchaseOrderId, setPurchaseOrderId] = useState<number>();
  const columns: ProColumns<OrderAPI.PurchaseOrderDetail_subOrderList>[] = [
    { title: '商品ID', dataIndex: 'productId', key: 'productId' },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return <Tag>{
          PURCHASE_SUB_STATUS.find((it) => it.value === text).label || `--`
        }</Tag>;
      },
    },
    { title: '商品编码', dataIndex: 'productNo', key: 'productNo' },
    { title: 'isbn', dataIndex: 'isbn', key: 'isbn' },
    { title: '商品名称', dataIndex: 'productName', key: 'productName' },
    { title: '售价', dataIndex: 'salePrice', key: 'salePrice', valueType: 'money' },
    { title: '原价', dataIndex: 'marketPrice', key: 'marketPrice', valueType: 'money' },
  ];

  useEffect(() => {
    // @ts-ignore
    const { id } = props.match.params;
    setPurchaseOrderId(id);
    fetchGetPurchaseDetail(id);
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const changeInput = (e: any) => {
    const { value } = e.target;
    setRemark(value);
  };

  const submitInfo = async () => {
    const params: OrderAPI.RefundPurchaseSubOrderParams = {
      purchaseSubOrderIds: [...selectedRowKeys] as number[],
      staffRemark: remark,
    };
    await fetchRefundPurchaseSubOrder(params);
    setModalVisible(false);
    setSelectedRowKeys([])
    fetchGetPurchaseDetail(purchaseOrderId as number);

  };

  return <div>
    <ProCard style={{ marginBottom: 16 }} gutter={8} ghost>
      <ProCard colSpan='50%'>
        <ProDescriptions
          title={'订单信息'}
          loading={loading}
          dataSource={detail}
          columns={
            [
              {
                title: '用户信息',
                key: 'nickname',
                dataIndex: 'nickname',
                render: (text, record) => {
                  const { phone } = record;
                  return `${text || '--'} / ${phone || '--'}`;
                },
              },
              {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
                valueType: 'dateTime',
              },
              {
                title: '书袋序号',
                key: 'sequence',
                dataIndex: 'sequence',
              },
              {
                title: '购买数量',
                key: 'goodsQuantity',
                dataIndex: 'goodsQuantity',
              },
              {
                title: '状态',
                key: 'status',
                dataIndex: 'status',
                render: (text) => {
                  return <Tag> {(PURCHASE_SUB_STATUS.find((it) => it.value === text) || {}).label}</Tag>;
                },
              },
              {
                title: '总金额',
                key: 'amount',
                dataIndex: 'amount',
                valueType: 'money',
              },
            ]
          }
          column={2}
        >
        </ProDescriptions>
        <ProDescriptions
          dataSource={detail}
          column={1}
          columns={[
            {
              title: '书袋编码',
              key: 'bagOrderCode',
              dataIndex: 'bagOrderCode',
              copyable: true,
            },
            {
              title: '订单编码',
              key: 'orderCode',
              dataIndex: 'orderCode',
              copyable: true,
            },
          ]}
        />
      </ProCard>
      <ProCard>
        <ProDescriptions
          title={'支付信息'}
          loading={loading}
          dataSource={detail}
          columns={
            [
              {
                title: '折扣金额',
                key: 'discountAmount',
                dataIndex: 'discountAmount',
              },
              {
                title: '实付金额',
                key: 'payAmount',
                dataIndex: 'payAmount',
                valueType: 'money',
              },
              {
                title: '支付时间',
                key: 'paidTime',
                dataIndex: 'paidTime',
                valueType: 'dateTime',
              },
              {
                title: '留书券ID',
                key: 'couponId',
                dataIndex: 'couponId',
              },
              {
                title: '留书券名称',
                key: 'couponName',
                dataIndex: 'couponName',
              },
              {
                title: '备注信息',
                key: 'sellerRemark',
                dataIndex: 'sellerRemark',
              },
            ]
          }
          column={2}
        />
        <ProDescriptions
          dataSource={detail}
          column={1}
          columns={[
            {
              title: '流水号',
              key: 'outTradeNo',
              dataIndex: 'outTradeNo',
              copyable: true,
            },
            {
              title: '',
              key: '',
              dataIndex: '',
            },
          ]}
        />
      </ProCard>
    </ProCard>
    <ProTable<OrderAPI.PurchaseOrderDetail_subOrderList>
      headerTitle={'购买商品详情'}
      search={false}
      columns={columns}
      dataSource={detail?.subOrderList}
      rowKey='id'
      rowSelection={{
        selectedRowKeys,
        onChange: onSelectChange,
        getCheckboxProps: record => ({
          disabled: record.status < 10,
        }),
      }}
      tableAlertOptionRender={() => {
        return (
          <Space size={16} onClick={() => {
            setModalVisible(true);
          }
          }>
            <a>批量处理</a>
          </Space>
        );
      }}
    />
    <Modal
      title={'退款'}
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      onOk={() => submitInfo()}
      destroyOnClose={true}
      confirmLoading={submitLoading}
    >
      <Input placeholder={'确认前，请先和用户、仓库、快递进行必要的沟通'} onChange={changeInput} />

    </Modal>
  </div>;
};
export default PurchaseOrderDetail;
