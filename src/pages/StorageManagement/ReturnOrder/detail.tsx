import React, { useEffect, useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components';
import { RETURN_STATUS } from '@/conf/conf';

const ReturnOrderDetail: React.FC = () => {
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
              key: 'nickName',
              dataIndex: 'nickName',
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
              key: 'payTime',
              dataIndex: 'payTime',
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
              valueEnum: RETURN_STATUS
            },
          ]
        }
        column={2}
      />
    </ProCard>
  </PageContainer>;
};
export default ReturnOrderDetail;
