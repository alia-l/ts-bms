import React, { useRef, useState } from 'react';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Cascader, Drawer, Form, Input, Modal, Space, Tag, Radio, Select } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import cityOptions from '@/conf/address';
import { EXPRESS_COMPANY } from '@/conf/conf';

const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const CheckDeliverOrder: React.FC = () => {
  const [form] = Form.useForm();

  const actionRef = useRef<ActionType>();
  const {
    fetchGetAuditBagList,
    fetchMarkUnusual,
    fetchGetAuditBagDetail,
    fetchSaveUserAddressInCheckDeliver,
    fetchConfirmAudit,
    submitLoading,
    loading,
    detail,
  } = useModel('checkDeliverModel');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [remark, setRemark] = useState<string>('');
  const [auditMode, setAuditMode] = useState<string>('auto');
  const [currentExpressCompany, setCurrentExpressCompany] = useState<number>(3);
  const [detailId, setDetailId] = useState<number>();
  const [remarkVisible, setRemarkVisible] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [auditModeLoading, setAuditModeLoading] = useState<boolean>(false);
  const [currentExpressCompanyModalVisible, setCurrentExpressCompanyModalVisible] = useState<boolean>(false);
  const columns: ProColumns<OrderAPI.CheckDeliverData>[] = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 100, hideInSearch: true },
    { title: '订单编码', dataIndex: 'orderCode', key: 'orderCode', width: 250 },
    { title: '书袋序号', dataIndex: 'sequence', key: 'sequence', width: 80 },
    { title: '商品数量', dataIndex: 'bookCount', key: 'bookCount', width: 100, hideInSearch: true },
    {
      title: '书袋状态',
      dataIndex: 'statusStr',
      key: 'statusStr',
      width: 120,
      render: (text) => {
        return <Tag>{text || ''}</Tag>;
      },
      hideInSearch: true,
    },
    {
      title: '审单状态',
      dataIndex: 'auditStatus',
      key: 'auditStatus',
      width: 120,
      render: (text) => {
        return <Tag>{text || '--'}</Tag>;
      },
      valueType: 'select',
      valueEnum: {
        5: { text: '待审单' },
        8: { text: '异常订单' },
        10: { text: '已审单（已审未推仓库）' },
      },
    },
    {
      title: '商品编码',
      dataIndex: 'bookNo',
      key: 'bookNo',
      hideInTable: true,
    },
    {
      title: '收货人姓名',
      dataIndex: 'contactName',
      key: 'contactName',
      hideInTable: true,
    },
    {
      title: '收货人电话',
      dataIndex: 'contactPhone',
      key: 'contactPhone',
      hideInTable: true,
    },
    {
      title: '收货地址',
      dataIndex: 'address',
      key: 'address',
      hideInTable: true,
    },
    {
      title: '物流',
      dataIndex: 'expressCom',
      key: 'expressCom',
      hideInSearch: true,
      width: 120,
      render: (text) => {
        if (!text) {
          return '未分配物流';
        }
        return <Tag>{text}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTimeRange',
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ createTimeStart: value[0], createTimeEnd: value[1] }),
      },
      hideInTable: true,
    },
    {
      title: '确认时间',
      dataIndex: 'confirmTime',
      key: 'confirmTimeRange',
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ confirmStart: value[0], confirmEnd: value[1] }),
      },
      hideInTable: true,
    },
    {
      title: '确认时间',
      dataIndex: 'confirmTime',
      key: 'confirmTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'sellerRemark',
      key: 'sellerRemark',
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
          status,
          id,
          contactName,
          province,
          city,
          county,
          contactPhone,
          address,
          company,
          sellerRemark,
        } = record;
        return <>
          <Button type={`link`} onClick={async () => {
            setDrawerVisible(true);
            await fetchGetAuditBagDetail(id);
            form.setFieldsValue({
              contactName,
              contactPhone,
              area: province && city && county && [province, city, county],
              address,
              company,
              sellerRemark,
            });
            setDetailId(id);
          }}>查看</Button>
          {
            status >= 5 && status < 8 && <Button type={'primary'} danger size={'small'} onClick={async () => {
              setDetailId(id);
              setRemarkVisible(true);
            }}>标记异常</Button>
          }
        </>;
      },
    },
    {
      title: '重量',
      dataIndex: 'overThreeKg',
      key: 'overThreeKg',
      hideInTable: true,
    },
  ];
  const subColumns: ProColumns<OrderAPI.CheckDeliverDetailData_bookVoList>[] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '绘本名称', dataIndex: 'saleTitle', key: 'saleTitle' },
    { title: '商品编码', dataIndex: 'bookNo', key: 'bookNo' },
    { title: 'ISBN', dataIndex: 'isbn', key: 'isbn' },
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


  const expandedRowRender = (it: OrderAPI.CheckDeliverData) => {
    const { contactName, contactPhone, province, country, city, address } = it;
    return (
      <div
        style={{ marginLeft: 70 }}>收货地址：{`${contactName || '-'} / ${contactPhone || '-'} / ${province || ''}${city || ''}${country || ''}${address || ''}`}</div>
    );
  };

  const submitAddress = async () => {
    const values: OrderAPI.SaveUserAddressInCheckDeliverParams = await form.validateFields();
    const { company, contactName, contactPhone, sellerRemark, address, area } = values;
    const [province, city, county] = area;
    const params = {
      company,
      county,
      city,
      contactName,
      contactPhone,
      province,
      sellerRemark,
      address,
      bagOrderId: detailId as number,
    };
    confirm({
      title: '是否要保存该地址？',
      onOk: async () => {
        await fetchSaveUserAddressInCheckDeliver(params);
        actionRef.current?.reload();
        setDrawerVisible(false);
        form.resetFields();
      },
    });
  };

  const submitInfo = async () => {
    const values: OrderAPI.SaveUserAddressInCheckDeliverParams = await form.validateFields();
    const { area } = values;
    const [province, city, county] = area;
    const params: OrderAPI.SaveUserAddressInCheckDeliverParams = {
      ...values,
      county,
      city,
      province,
      bagOrderId: detailId as number,
    };
    delete params.area;
    if (auditMode === 'auto') {
      params.company = '';
    }
    confirm({
      title: '是否确认审单？',
      onOk: async () => {
        await fetchConfirmAudit(params);
        actionRef.current?.reload();
        setDrawerVisible(false);
        form.resetFields();
      },
    });
  };


  return <div className={'unusual-order-wrapper'}>
    <PageContainer
      header={{
        title: '发货审单',
        breadcrumb: {},
      }}
    >
      <ProTable<OrderAPI.CheckDeliverData>
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandAllRows: true }}
        actionRef={actionRef}
        scroll={{ x: 2000 }}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a>批量处理</a>
            </Space>
          );
        }}
        toolBarRender={() => [
          <>
            默认快递：{auditMode === 'auto' ? '默认分配' : EXPRESS_COMPANY.find((it) => it.value === currentExpressCompany).name}
            {
              auditMode === 'normal' && <Button
                type='primary'
                onClick={() => {
                  setCurrentExpressCompanyModalVisible(true);
                }}
                style={{ marginLeft: '10px' }}>
                修改
              </Button>
            }
            <Button
              type={`primary`}
              key='add'
              loading={auditModeLoading}
              onClick={() => {
                setAuditModeLoading(true);
                setTimeout(() => {
                  setAuditMode(auditMode === 'auto' ? 'normal' : 'auto');
                  setAuditModeLoading(false);
                }, 1000);
              }}
            >
              {auditMode === 'auto' ? '切换手动模式' : '切换自动模式'}
            </Button>
          </>,

        ]}
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
        request={fetchGetAuditBagList}
      />
    </PageContainer>
    <Modal
      title='填写备注'
      confirmLoading={submitLoading}
      onCancel={() => setRemarkVisible(false)}
      onOk={async () => {
        await fetchMarkUnusual({ sellerRemark: remark, bagOrderId: detailId });
        setRemarkVisible(false);
        actionRef?.current?.reload();
      }}
      visible={remarkVisible}
      forceRender={true}
      destroyOnClose={true}
    >
      <TextArea onChange={changeRemarkTextArea} />
    </Modal>
    <Drawer
      title={`${detail?.orderCode || '--'}的详情`}
      visible={drawerVisible}
      onClose={() => {
        setDrawerVisible(false);
        form.resetFields();
      }}
      width={650}
      destroyOnClose={true}
    >
      <ProDescriptions
        title={'书袋信息'}
        dataSource={detail}
        loading={loading}
        columns={
          [
            {
              title: '书袋ID:',
              key: 'id',
              dataIndex: 'id',
            },
            {
              title: '创建时间',
              key: 'createTime',
              dataIndex: 'createTime',
              valueType: 'dateTime',
            },
            {
              title: '书袋编码',
              key: 'orderCode',
              dataIndex: 'orderCode',
              copyable: true,
            },
            {
              title: '确认时间',
              key: 'confirmTime',
              dataIndex: 'confirmTime',
              valueType: 'dateTime',
            },
            {
              title: '预计发货时间',
              key: 'preExpressTime',
              dataIndex: 'preExpressTime',
              valueType: 'dateTime',
            },
            {
              title: '书袋重量',
              key: 'weight',
              dataIndex: 'weight',
              render: (text) => {
                return `${text || '0'}克`;
              },
            },
            {
              title: '书袋状态',
              key: 'statusStr',
              dataIndex: 'statusStr',
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
        {
          auditMode === 'auto' ?
            <Form.Item label={'物流公司'}>
              系统自动分配（当前物流：{
              (EXPRESS_COMPANY.find((i) => i.value === detail?.company) || {})
                .name || '暂未分配'}）
            </Form.Item>
            :
            <Form.Item label={'物流公司'} name='company'>
              <Select>
                {EXPRESS_COMPANY.map((it) => (
                  <Option value={it.value} key={it.value}>
                    {it.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
        }
        <Form.Item label={'备注'} name={'sellerRemark'}>
          <Input />
        </Form.Item>
        <Form.Item label={'操作'}>
          <Button size={'small'} onClick={() => submitAddress()} type={'primary'}>保存地址</Button>
        </Form.Item>
      </Form>
      <div className='ant-descriptions-title' style={{ marginBottom: 20 }}>绘本信息</div>
      <ProTable<OrderAPI.CheckDeliverDetailData_bookVoList>
        columns={subColumns}
        actionRef={actionRef}
        search={false}
        rowKey='id'
        loading={loading}
        dataSource={detail?.bookVoList}
        pagination={false}
        toolBarRender={false}
      />
      {
        detail && (detail.status >= 5 && detail.status < 1) &&
        <Button type={'primary'} style={{ marginTop: 16 }} onClick={() => submitInfo()}>确认审单</Button>
      }
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
  </div>;
};
export default CheckDeliverOrder;
