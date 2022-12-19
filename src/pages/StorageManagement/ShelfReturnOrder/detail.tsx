import React, { useEffect, useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { PageContainer, ProCard, ProColumns, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { GOODS_IN_STATUS, RETURN_STATUS, SHIPPING_STATUS } from '@/conf/conf';
import { Alert, Button, Divider, Input, Modal, Space, Tag } from 'antd';
import GoBack from '@/components/GoBack';

const { confirm } = Modal;

const ShelfOrderDetail: React.FC = (props) => {
  const {
    fetchGetReturnOrderDetail,
    fetchManualSignIn,
    fetchAddGoodsIn,
    fetchCancelAppointment,
    fetchCancelReturnOrderForce,
    detail,
    submitLoading,
    loading,
  } = useModel('returnOrderModel');
  const [detailId, setDetailId] = useState<number>();
  const [confirmModalVisible, setConfirmModalVisible] = useState<boolean>(false);
  const [remark, setRemark] = useState<string>('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: ProColumns<OrderAPI.ReturnOrderDetailData_goodsList>[] = [
    { title: '商品编码', dataIndex: 'bookNo', key: 'bookNo' },
    { title: '商品名称', dataIndex: 'saleTitle', key: 'saleTitle' },
    { title: 'isbn', dataIndex: 'isbn', key: 'isbn' },
    { title: '原价', dataIndex: 'marketPrice', key: 'marketPrice', valueType: 'money' },
    { title: '售价', dataIndex: 'salePrice', key: 'salePrice', valueType: 'money' },
    { title: '入库编码', dataIndex: 'goodsSequenceNo', key: 'goodsSequenceNo' },
    { title: '备注', dataIndex: 'remark', key: 'remark' },

  ];

  useEffect(() => {
    // @ts-ignore
    const { id } = props.match.params;
    setDetailId(id);
    fetchGetReturnOrderDetail(id);
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const changeInput = (e: any) => {
    const { value } = e.target;
    setRemark(value);
  };

  const submitConfirm = async () => {
    const params: OrderAPI.ManualSignInParams = {
      returnOrderId: detailId as number,
      remark,
    };
    await fetchManualSignIn(params);
    setConfirmModalVisible(false);
    await fetchGetReturnOrderDetail(detailId as number);
  };

  return <PageContainer content={<GoBack path={'/storage/returnOrder'} />}>
    <ProCard loading={loading}>
      <ProDescriptions
        title={'基础信息'}
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
              title: '订单编码',
              key: 'orderCode',
              dataIndex: 'orderCode',
              copyable: true,
            },
            {
              title: '支付时间',
              key: 'createTime',
              dataIndex: 'createTime',
              valueType: 'dateTime',
            },

            {
              title: '书袋编码',
              key: 'bagOrderCode',
              dataIndex: 'bagOrderCode',
              copyable: true,
            },
            {
              title: '预约取件时间',
              key: 'pickupTime',
              dataIndex: 'pickupTime',
              valueType: 'dateTime',
            },
            {
              title: '书袋序号',
              key: 'sequence',
              dataIndex: 'sequence',
            },
            {
              title: '状态',
              key: 'returnStatus',
              dataIndex: 'returnStatus',
              valueEnum: RETURN_STATUS,
            },
          ]
        }
        column={2}
      />
      <Divider />
      <ProDescriptions
        dataSource={detail}
        columns={[
          {
            title: '联系人姓名',
            dataIndex: 'contactName',
            key: 'contactName',
            render: (text, record) => {
              return `${text || '-'}/${record.contactPhone || '-'}`;
            },
          },
          {
            title: '取件信息',
            key: 'address',
            dataIndex: 'address',
            render: (text, record) => {
              const { province, city, county } = record;
              return `${province}${city}${county}${text}`;
            },
          },
          {
            title: '订单备注',
            key: 'sellerRemark',
            dataIndex: 'sellerRemark',
          },
        ]}
        column={1}
      />
    </ProCard>
    <ProCard ghost gutter={16}>
      <ProCard style={{ marginTop: 16 }} colSpan='50%' loading={loading}>
        <ProDescriptions
          title={'物流信息'}
          dataSource={detail}
          columns={[
            {
              title: '物流公司',
              key: 'expressCompany',
              dataIndex: 'expressCompany',
            },
            {
              title: '到仓时间',
              key: 'shippingReceiveTime',
              dataIndex: 'shippingReceiveTime',
              valueType: 'dateTime',
            },
            {
              title: '物流单号',
              key: 'expressNo',
              dataIndex: 'expressNo',
            },
            {
              title: '快递揽收时间',
              key: 'shippingDeliverTime',
              dataIndex: 'shippingDeliverTime',
              valueType: 'dateTime',
            },
            {
              title: '物流状态',
              key: 'shippingStatus',
              dataIndex: 'shippingStatus',
              render: (text) => {
                return (
                  SHIPPING_STATUS.find((it) => it.value === text) ||
                  {}
                ).name || '--';
              },
            },
          ]}
          column={2}
        />
      </ProCard>
      <ProCard style={{ marginTop: 16, marginBottom: 16, paddingBottom: 80 }} loading={loading}>
        <ProDescriptions
          title={'报损信息'}
          dataSource={detail}
          columns={[
            {
              title: '报损订单',
              dataIndex: 'damageReportCode',
              key: 'damageReportCode',
              render: (text) => {
                return text ?
                  <Button type='link' onClick={() => {

                  }
                  }>{text}</Button> : <Tag>无报损</Tag>;
              },
            },
          ]}
        />
      </ProCard>
    </ProCard>
    {
      detail && ((detail?.status >= 10 && detail?.status < 50) || detail?.status === -2) && <Alert
        showIcon
        message={
          <div>
            当前包裹系统物流状态为未签收，是否已经实际到仓已签收?
            <Button
              type='link'
              size={'small'}
              onClick={() => setConfirmModalVisible(true)}
            >
              确认到仓
            </Button>
          </div>
        }
        type='info'
      />
    }
    <ProTable<OrderAPI.ReturnOrderDetailData_goodsList>
      headerTitle={'回收单内容'}
      search={false}
      columns={columns}
      dataSource={detail?.goodsList}
      rowKey='id'
      loading={loading}
      pagination={false}
      rowSelection={{
        selectedRowKeys,
        onChange: onSelectChange,
        getCheckboxProps: record => ({
          disabled: record.status !== 0 && record.status !== 3 && record.bookNo.indexOf('BOX') === -1,
        }),
      }}
      tableAlertOptionRender={() => {
        return (
          <Space size={16}>
            <a onClick={() => {
              confirm({
                title: '是否要验收回收单',
                onOk: async () => {
                  const params: OrderAPI.AddGoodsInParams = {
                    productIdList: selectedRowKeys as number[],
                    goodsInOrderId: detail?.goodsInOrder.id || '',
                    returnOrderId: detail?.id as number,
                  };
                  await fetchAddGoodsIn(params);
                  await fetchGetReturnOrderDetail(detailId as number);
                  setSelectedRowKeys([]);
                },
              });
            }
            }>验收通过</a>
            <a style={{ color: '#ff4d4f' }}>复核</a>
          </Space>
        );
      }}
    />
    <ProCard ghost gutter={16}>
      <ProCard style={{ marginTop: 16 }} loading={loading} colSpan='50%'>
        <ProDescriptions
          title={'关联订单'}
          dataSource={detail?.goodsInOrder}
          column={2}
          columns={[
            {
              title: '订单',
              dataIndex: 'orderCode',
              key: 'orderCode',
            },
            {
              title: '入库编码',
              dataIndex: 'wmsOrderCode',
              key: 'wmsOrderCode',
            },
            {
              title: '状态',
              dataIndex: 'status',
              key: 'status',
              valueEnum: GOODS_IN_STATUS,
            },
          ]}
        />
      </ProCard>
      <ProCard title={'特殊操作'} style={{ marginTop: 16, paddingBottom: 50 }}>
        <Button type={'primary'} style={{ marginRight: 16 }} onClick={() => {
          confirm({
            title: '提醒',
            content: '是否要取消回收单',
            okText: '确定',
            cancelText: ' 取消',
            onOk: async () => {
              await fetchCancelAppointment(detail?.orderCode as string);
              await fetchGetReturnOrderDetail(detailId as number);
            },
          });
        }}>取消预约</Button>
        <Button type={'primary'} danger ghost onClick={() => {
          confirm({
            title: '提醒',
            content: '是否要取消快递预约',
            okText: '确定',
            cancelText: ' 取消',
            onOk: async () => {
              await fetchCancelReturnOrderForce({
                code: detail?.bagOrderCode, type: 1,
              });
              await fetchGetReturnOrderDetail(detailId as number);
            },
          });
        }}>取消快递预约</Button>
      </ProCard>
    </ProCard>


    <Modal
      title={'填写手动签收备注'}
      visible={confirmModalVisible}
      destroyOnClose={true}
      onOk={() => submitConfirm()}
      confirmLoading={submitLoading}
    >
      <Input placeholder={'备注'} onChange={changeInput} />
    </Modal>


  </PageContainer>;
};
export default ShelfOrderDetail;
