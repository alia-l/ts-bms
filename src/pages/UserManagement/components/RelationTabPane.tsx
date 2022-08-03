import React from 'react';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel } from '@@/plugin-model/useModel';
import { Tag } from 'antd';
import { LEAD_LEVEL, REFER_STATUS } from '@/conf/conf';

export type InfoProps = {
  id?: number;
  phone?: string;
};
const RelationTabPane: React.FC<InfoProps> = (props) => {
  const { fetchGetUserReferList } = useModel('userModel');
  const columns: ProColumns<UserAPI.UserReferListData>[] = [
    {
      title: '绑定人',
      dataIndex: 'referNickname',
      key: 'referNickname',
      render: (text, record) => {
        const { referLevel, referPhone } = record;
        return <>
          <Tag color={'blue'}>{(LEAD_LEVEL.find((it) => it.value === referLevel) || {}).label}</Tag>
          <span>{`${text || '--'}/${referPhone || '--'}`}</span>
        </>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '订单编码',
      dataIndex: 'orderCode',
      key: 'orderCode',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (text) => {
        return <Tag>{(REFER_STATUS.find((it) => it.value === text) || {}).label}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return text === 10 ? '有效' : '无效';
      },
    },
  ];


  return <div>
    <ProTable<UserAPI.UserReferListData>
      toolBarRender={false}
      columns={columns}
      search={false}
      rowKey='id'
      request={(p) => fetchGetUserReferList(p, props.id as number)}
    />
  </div>;
};
export default RelationTabPane;
