import React, { useRef, useState } from 'react';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Input, Modal, Tag } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { history } from 'umi';

const { TextArea } = Input;

const ReportDamageOrderManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const {
    fetchGetDamageReportList,
    fetchCompletePointsCompensation,
    fetchExportPointsApply,
    fetchExportSubReport,
    submitLoading,
  } = useModel('reportDamageOrderModel');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [bagOrderCodeList, setBagOrderCodeList] = useState<string>('');
  const [searchForm, setSearchForm] = useState({});
  const columns: ProColumns<OrderAPI.ReportDamageOrderListData>[] = [
    {
      title: '用户手机号',
      dataIndex: 'phone',
      key: 'phone',
      hideInTable: true,
    },
    { title: 'ID', dataIndex: 'id', key: 'id', hideInSearch: true, width: 80 },
    {
      title: '用户信息',
      dataIndex: 'nickname',
      key: 'nickname',
      render: (text, record) => {
        return <span
          style={{ color: '#1890ff', cursor: 'pointer' }}
          onClick={() => {
          }}
        >
          {`${text || '-'}/${record.phone || '-'}`}</span>;
      },
      hideInSearch: true,
    },
    {
      title: '订单编码',
      dataIndex: 'reportCode',
      key: 'reportCode',
      copyable: true,
      width: 280,
    },
    {
      title: '书袋编码',
      dataIndex: 'bagOrderCode',
      key: 'bagOrderCode',
      copyable: true,
      width: 280,
    },
    {
      title: '书袋序号',
      dataIndex: 'sequence',
      key: 'sequence',
      width: 80,
      hideInSearch: true,
    },
    {
      title: '包装破损',
      dataIndex: 'packageBroken',
      key: 'packageBroken',
      width: 80,
      render: (text) => {
        return text ? <Tag color={'red'}>是</Tag> : <Tag>否</Tag>;
      },
      hideInSearch: true,
    },
    {
      title: '包装破损',
      dataIndex: 'isPackageBroken',
      key: 'isPackageBroken',
      valueEnum: {
        true: { text: '是' },
        false: { text: '否' },
      },
      hideInTable: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        0: { text: '报损未处理', status: 'Default' },
        10: { text: '报损已处理', status: 'Success' },
        '-10': { text: '无效', status: 'Default' },
      },
    },
    {
      title: '积分补偿状态',
      dataIndex: 'pointsCompensationStatus',
      key: 'pointsCompensationStatus',
      valueEnum: {
        0: { text: '未标记', status: 'Default' },
        10: { text: '已标记未发放', status: 'Processing' },
        50: { text: '已发放', status: 'Success' },
      },
    },
    {
      title: '报损时间',
      dataIndex: 'paidTimeDateRange',
      key: 'paidTimeDateRange',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
    },
    {
      title: '报损时间',
      dataIndex: 'createTime',
      key: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: (_, record) => {
        const { id } = record;
        return <Button type={`link`} onClick={async () => {
          history.push(`/reportDamage/detail/${id}`);
        }}>详情</Button>;
      },
    },
  ];


  const changeTextArea = (e: any) => {
    const { value } = e.target;
    setBagOrderCodeList(value);
  };

  const submitInfo = async () => {
    await fetchCompletePointsCompensation(bagOrderCodeList);
    setModalVisible(false);
    actionRef.current?.reload();
  };

  return <div>
    <PageContainer
      header={{
        title: '报损订单',
        breadcrumb: {},
      }}
    >
      <ProTable<OrderAPI.ReportDamageOrderListData>
        columns={columns}
        scroll={{ x: 1800 }}
        actionRef={actionRef}
        beforeSearchSubmit={(params) => {
          setSearchForm(params);
          return params;
        }}
        search={{
          labelWidth: 100,
          collapsed: false,
          collapseRender: () => null,
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
        toolBarRender={() => [
          <Button key='finish' type='primary' ghost onClick={() => setModalVisible(true)}>
            完成积分补偿
          </Button>,
          <Button key='pointExport' type='primary' onClick={async () => await fetchExportPointsApply(searchForm)}>
            积分订单导出
          </Button>,
          <Button key='subExport' type='primary' onClick={async () => await fetchExportSubReport(searchForm)}>
            子订单导出
          </Button>,
        ]}
        rowKey='id'
        request={fetchGetDamageReportList}
        manualRequest
      />
    </PageContainer>
    <Modal
      title={'填写已经完成积分补偿的书袋编码，用英文,分隔'}
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      destroyOnClose={true}
      confirmLoading={submitLoading}
      onOk={() => submitInfo()}
    >
      <TextArea onChange={changeTextArea} />
    </Modal>
  </div>;
};
export default ReportDamageOrderManagement;
