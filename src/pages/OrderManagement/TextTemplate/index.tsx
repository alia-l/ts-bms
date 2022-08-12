import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { PlusOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 14 },
};

const TextTemplateManagement: React.FC = () => {
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();
  const { fetchGetSendInfoList, fetSendSmsInfo, submitLoading } = useModel('textTemplateModel');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const columns: ProColumns<UserAPI.TextTemplateData>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      copyable: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        1: { text: '等在回执', status: 'Processing' },
        2: {
          text: '发送失败',
          status: 'Error',
        },
        10: {
          text: '发送成功',
          status: 'Success',
        },
      },
      hideInSearch: true,
    },
    {
      title: '短信内容',
      dataIndex: 'keyword',
      key: 'keyword',
      hideInTable: true,
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
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择创建时间',
          },
        ],
      },
    },
    {
      title: '短信内容',
      dataIndex: 'content',
      key: 'content',
      width: 400,
      hideInSearch: true,
      copyable: true,
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      key: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作人',
      dataIndex: 'staffName',
      key: 'staffName',
      hideInSearch: true,
    },
  ];

  const submitInfo = async () => {
    const values = await form.validateFields();
    console.log(values);
    const { phone, remark, expressNumber, expressPhone } = values;
    const p = {
      phone,
      remark,
      params: {
        number: expressNumber,
        phone: expressPhone,
      },
    };
    await fetSendSmsInfo(p);
    setModalVisible(false);
    form.resetFields();
    actionRef.current?.reload();
  };

  return <PageContainer
    header={{
      title: '短息模版',
      breadcrumb: {},
    }}
  >
    <ProTable<UserAPI.TextTemplateData>
      columns={columns}
      actionRef={actionRef}
      search={{
        labelWidth: 80,
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
      rowKey='id'
      request={fetchGetSendInfoList}
      toolBarRender={() => [
        <Button key='button' icon={<PlusOutlined />} type='primary' onClick={() => setModalVisible(true)}>
          发送短信
        </Button>,
      ]}
    />
    <Modal
      title={'发送短信'}
      visible={modalVisible}
      destroyOnClose={true}
      onCancel={() => {
        setModalVisible(false);
        form.resetFields();
      }}
      onOk={() => submitInfo()}
      confirmLoading={submitLoading}
      forceRender={true}
    >
      <Form
        {...formItemLayout}
        form={form}
      >
        <Form.Item
          name='phone'
          label={`需要发送的短信的电话`}
          rules={[{ required: true, message: '请填输入用户手机号' }]}
        >
          <Input placeholder={'请填输入用户手机号'} />
        </Form.Item>
        <Form.Item
          name='expressNumber'
          label={`快递单号`}
          rules={[{ required: true, message: '请输入快递单号' }]}
        >
          <Input placeholder={'请输入快递单号'} />
        </Form.Item>
        <Form.Item
          name='expressPhone'
          label={`快递员电话号码`}
          rules={[{ required: true, message: '请输入快递员手机号码' }]}
        >
          <Input placeholder={'请输入快递员手机号码'} />
        </Form.Item>
        <Form.Item
          name='remark'
          label={`备注`}
        >
          <Input placeholder={'请输入备注'} />
        </Form.Item>
      </Form>
    </Modal>
  </PageContainer>;
};
export default TextTemplateManagement;
