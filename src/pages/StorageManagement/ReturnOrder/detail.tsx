import React, { useEffect, useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components';
import { RETURN_STATUS, SHIPPING_STATUS } from '@/conf/conf';
import { Divider } from 'antd';

const ReturnOrderDetail: React.FC = (props) => {
  const { fetchGetReturnOrderDetail, detail } = useModel('returnOrderModel');
  const [detailId, setDetailId] = useState<number>();

  useEffect(() => {
    // @ts-ignore
    const { id } = props.match.params;
    setDetailId(id);
    fetchGetReturnOrderDetail(id);
  }, []);
  return <PageContainer>
    <ProCard>
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
    <ProCard style={{ marginTop: 16 }}>
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
  </PageContainer>;
};
export default ReturnOrderDetail;
