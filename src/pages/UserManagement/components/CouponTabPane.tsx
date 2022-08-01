import React, { useRef } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel } from '@@/plugin-model/useModel';
import { Badge, Tag } from 'antd';
import { COUPON_SOURCE, COUPON_USED_STATUS, TIME_FORMAT } from '@/conf/conf';
import moment from 'moment';

export type InfoProps = {
  id?: number;
  phone?: string;
};
const CouponTabPane: React.FC<InfoProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const { fetchGetCouponList } = useModel('userModel');
  const columns: ProColumns<OrderAPI.CouponListData>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '优惠券名称',
      dataIndex: 'couponName',
      key: 'couponName',
    },
    {
      title: '优惠券来源',
      dataIndex: 'collectSource',
      key: 'collectSource',
      render: (source) => {
        return (COUPON_SOURCE.find(it => it.value === source) || {}).label;
      },
    },
    {
      title: '获取时间',
      dataIndex: 'createTime',
      key: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '过期时间',
      dataIndex: 'expireTime',
      key: 'expireTime',
      valueType: 'dateTime',
    },
    {
      title: '对应订单ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: '是否转赠',
      dataIndex: 'transferable',
      key: 'transferable',
      render: (status) => {
        return <Tag color={status === 10 ? 'green' : 'red'}>{status === 10 ? '可转赠' : '不可转赠'}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => {
        const { transferTime } = record;
        if (status === -1) {
          return `已转赠，转赠时间：${moment(transferTime).format(TIME_FORMAT.FULL)}`;
        }
        const item = COUPON_USED_STATUS.find(it => it.value === status) || {};
        return <div><Badge status={item.status} />{item.label}</div>;
      },
    },
    {
      title: '操作',
      key: 'couponOperation',
      valueType: 'option',
      width: 180,
      // render: (_, record: OrderAPI.BagListData) => {
      //   const { id } = record;
      //   return [
      //     <Button
      //       type={`link`}
      //       key={'detail'}
      //       size={'small'}
      //       onClick={() => {
      //       }}>
      //       书袋详情
      //     </Button>,
      //     <Button
      //       type={`link`}
      //       key={'relation'}
      //       size={'small'}
      //       onClick={() => {
      //
      //       }}>
      //       关联订单
      //     </Button>,
      //   ];
      // },
    },
  ];

  return <div>
    <ProTable<OrderAPI.CouponListData>
      toolBarRender={false}
      columns={columns}
      actionRef={actionRef}
      search={false}
      rowKey='id'
      request={(p) => fetchGetCouponList(p, props.id as number)}
    />
  </div>;
};
export default CouponTabPane;
