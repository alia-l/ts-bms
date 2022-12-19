import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { Button, Col, Input, Modal, Row, Space, Table } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { history } from '@@/core/history';

const GrantCard: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const {
    fetchPhysicalCardList,
    fetchUpdateOrderExpressCode
  } = useModel('entityCardModel');
  const [searchForm, setSearchForm] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<OrderAPI.GrantCardData[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [expressCode, setExpressCode] = useState<string>('');

  const columns: ProColumns<OrderAPI.GrantCardData>[] = [
    {
      title: '真实姓名/电话',
      dataIndex: 'realName',
      key: '　realName',
      render: (text, record) => {
        const { mobile } = record;
        return `${text}/${mobile}`;
      },
      hideInSearch: true,
    },
    {
      title: '收货地址',
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => {
        const { province, city, county } = record;
        return `${province}${city}${county}${text}` || '暂无收货地址';
      },
      hideInSearch: true,
    },
    {
      title: '实体卡数量',
      dataIndex: 'quantity',
      key: 'quantity',
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
      title: '支付时间',
      dataIndex: 'paidTime',
      key: 'paidTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '快递单号',
      dataIndex: 'expressNo',
      key: 'expressNo',
      width: 100,
      render: (text) => {
        return text || '暂无单号';
      },
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      valueEnum: {
        10: { text: '已支付', status: 'success' },
        20: { text: '已发货', status: 'Processing' },
        50: { text: '已完成', status: 'Default' },
      },
      initialValue: '10',
    },
    {
      title: '用户Id',
      dataIndex: 'userId',
      key: 'userId',
      hideInTable: true,
    },
    {
      title: '收货手机号',
      dataIndex: 'phone',
      key: 'phone',
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => {
        const { id } = record;
        return <Button type={`link`} onClick={async () => {
          // @ts-ignore
          history.push(`/reCheckListOrder/detail/${id}/${searchForm.status}`);
        }}>详情</Button>;
      },
    },
  ];
  const subColumns = [
    {
      title: '真实姓名',
      dataIndex: 'realName',
      key: '　realName',
    },
    {
      title: '订单编号',
      dataIndex: 'orderCodes',
      key: 'orderCodes',
    },
    {
      title: '快递单号',
      dataIndex: 'expressNo',
      key: 'expressNo',
      render: (text: any, _: any, index: number) => {
        return <Input style={{ width: 200 }} onChange={(e) => {
          const { value } = e.target;
          selectedRows[index].expressNo = value;
          setSelectedRows([...selectedRows]);
        }} />;
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[], rows: OrderAPI.GrantCardData[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const list: OrderAPI.GrantCardData[] = rows.map((i) => ({
      orderCodes: i.orderCode,
      expressNos: i.expressNo,
      realName: i.realName,
      mobile: i.mobile,
    }));
    setSelectedRows(list);
  };

  const submitInfo = () => {
    const params = {
      expressCode,
      orderCodes:selectedRows.map((it)=>it.orderCode).join(','),
      expressNos:selectedRows.map((it)=>it.expressNo).join(','),
    }
    console.log(params);

  };


  return <div className={'grant-card'}>
    <ProTable<OrderAPI.GrantCardData>
      actionRef={actionRef}
      columns={columns}
      beforeSearchSubmit={(params) => {
        setSearchForm(params);
        return params;
      }}
      rowSelection={{
        selectedRowKeys,
        onChange: onSelectChange,
      }}
      tableAlertOptionRender={() => {
        return (
          <Space size={16} onClick={() => {
            setModalVisible(true);
          }}>
            <a>批量导入</a>
          </Space>
        );
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
            }}
          >
            {searchConfig.searchText}
          </Button>,
        ],
      }}
      rowKey='id'
      request={fetchPhysicalCardList}
    />
    <Modal
      width={600}
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      onOk={() => submitInfo()}
    >
      <Row>
        <Col span={3}>
          <div style={{ marginTop: 8, marginLeft: 8 }}>快递编码:</div>
        </Col>
        <Col span={10}><Input placeholder={`请输入快递编码`} onChange={(e) => setExpressCode(e.target.value)} /></Col>
      </Row>
      <Table
        columns={subColumns}
        dataSource={selectedRows}
        rowKey={(_, index) => index + ''}
        pagination={false}
      />
    </Modal>
  </div>;
};
export default GrantCard;
