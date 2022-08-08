import React, { useRef, useState } from 'react';
import {
  ActionType,
  ProColumns,
  ProDescriptions,
  ProForm,
  ProFormInstance,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Cascader, Drawer, Form, Input, Modal, Tag } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { checkBtnAuth } from '@/utils/utils';
import { EditOutlined } from '@ant-design/icons';
import cityOptions from '@/conf/address';
import { ROUTER_MAP } from '@/conf/conf';

const { confirm } = Modal;

export type InfoProps = {
  id?: number;
  phone?: string;
};

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
};

const BagTabPane: React.FC<InfoProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const {
    fetchGetBagList,
    fetchGetBagOrderDetail,
    fetchUpdateOverdueTime,
    fetchUpdateSubAddRemark,
    fetchCancelConfirm,
    fetchUpdateBagOrderAddress,
    fetchAnewReport,
    fetchGetLinkedOrderList,
    loading,
    subBagOrderList,
    bagOrderDetail,
    submitLoading,
    referList,
  } = useModel('userModel');
  //书袋详情drawer
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  //备注modal
  const [remarkModalVisible, setRemarkModalVisible] = useState<boolean>(false);
  //修改地址
  const [edit, setEdit] = useState<boolean>(false);
  //关联订单drawer
  const [relationVisible, setRelationVisible] = useState<boolean>(false);
  //绘本id
  const [subBookId, setSubBookId] = useState<number>();
  //Form-ref
  const [form, setForm] = useState<any>();
  //书袋id
  const [bagOrderId, setBagOrderId] = useState<number>();
  //书袋列表column
  const columns: ProColumns<OrderAPI.BagListData>[] = [
    {
      title: '书袋ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '书袋编码',
      dataIndex: 'orderCode',
      key: 'orderCode',
      copyable: true,
    },
    {
      title: '状态',
      dataIndex: 'statusStr',
      key: 'statusStr',
      render: (text) => {
        return <Tag>{text}</Tag>;
      },
    },
    {
      title: '书袋编码',
      dataIndex: 'sequence',
      key: 'sequence',
    },
    {
      title: '创建时间',
      dataIndex: 'createTimeMill',
      key: 'createTimeMill',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      key: 'bagOperation',
      valueType: 'option',
      width: 180,
      render: (_, record) => {
        const { id } = record;
        return [
          <Button
            type={`link`}
            key={'detail'}
            size={'small'}
            onClick={async () => {
              setDrawerVisible(true);
              setBagOrderId(id);
              await fetchGetBagOrderDetail(id as number);
            }}>
            书袋详情
          </Button>,
          <Button
            type={`link`}
            key={'relation'}
            size={'small'}
            onClick={async () => {
              setRelationVisible(true);
              await fetchGetLinkedOrderList(id as number);
            }}>
            关联订单
          </Button>,
        ];
      },
    },
  ];
  //绘本列表column
  const subOrderColumns: ProColumns<OrderAPI.BagSubOrderList>[] = [
    {
      title: '绘本ID',
      dataIndex: 'productId',
      key: 'productId',
      fixed: 'left',
      width: 50,
    },
    {
      title: '绘本名称',
      dataIndex: 'productName',
      key: 'productName',
      fixed: 'left',
    },
    {
      title: '是否已购买',
      dataIndex: 'bought',
      key: 'bought',
      render: (text) => (
        <Tag color={text ? 'red' : 'blue'}>{text ? '是' : '否'}</Tag>
      ),
    },
    {
      title: '绘本原价',
      dataIndex: 'marketPrice',
      key: 'marketPrice',
      valueType: 'money',
    },
    {
      title: '绘本售价',
      dataIndex: 'salePrice',
      key: 'salePrice',
      valueType: 'money',
    },
    {
      title: '成本价',
      dataIndex: 'costPrice',
      key: 'costPrice',
      valueType: 'money',

    },
    {
      title: '唯一码',
      dataIndex: 'productSequenceNo',
      key: 'productSequenceNo',
    },
    {
      title: '是否已报损',
      dataIndex: 'damageReported',
      key: 'damageReported',
      render: (text) => (
        <Tag color={text ? 'red' : 'blue'}>{text ? '是' : '否'}</Tag>
      ),
    },
    {
      title: '是否已追损',
      dataIndex: 'damaged',
      key: 'damaged',
      render: (text) => (
        <Tag color={text ? 'red' : 'blue'}>{text ? '是' : '否'}</Tag>
      ),
    },
    {
      title: '是否来自心原单',
      dataIndex: 'type',
      key: 'type',
      render: (text) => {
        let temp;
        switch (text) {
          case 1:
            temp = <Tag color={'red'}>心愿单</Tag>;
            break;
          case 3:
            temp = <Tag color={'green'}>换一换</Tag>;
            break;
          case 4:
            temp = <Tag color={'gold'}>预约</Tag>;
            break;
          default:
            break;
        }
        if (text === 2 || !text) {
          temp = <Tag color={'blue'}>系统推荐</Tag>;
        }
        return temp;
      },
    },
    {
      title: '备注',
      dataIndex: 'sellerRemark',
      key: 'sellerRemark',
      render: (text, record) => {
        const { id } = record;
        return (text !== '-' ?
            <Button
              type={`link`}
              onClick={() => {
                setRemarkModalVisible(true);
                setSubBookId(id);
                setTimeout(() => {
                  formRef?.current?.setFieldsValue(record);
                }, 100);
              }}>
              {text}
            </Button> :
            <Button
              type={`primary`}
              size={`small`}
              onClick={() => {
                setRemarkModalVisible(true);
                setSubBookId(id);
                setTimeout(() => {
                  formRef?.current?.setFieldsValue({ sellerRemark: '' });
                }, 100);
              }}>
              填写备注
            </Button>
        );
      },
    },
  ];
  //关联订单column
  const relationColumns: ProColumns<OrderAPI.LinkRelationData>[] = [
    { title: '订单ID', dataIndex: 'orderId', key: 'orderId' },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      render(text) {
        const item = Object.values(ROUTER_MAP).find(it => it.type === text);
        return item ? <Tag>{item.name}</Tag> : '--';
      },
    },
    {
      title: '订单编号',
      dataIndex: 'orderCode',
      key: 'orderCode',
      render: (text) => (
        <Button
          type='link'
          // onClick={() => this.toDetail(record.orderType, text, record.orderId)}
        >
          {text}
        </Button>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      valueType: 'dateTime',
    },
    { title: '订单状态', dataIndex: 'statusDes', key: 'statusDes' },
  ];

  /**
   * @description 重新报损
   */
  const confirmAnewReport = () => {
    confirm({
      title: '提醒',
      content: '是否允许用户重新报损？',
      okText: '确定',
      cancelText: ' 取消',
      onOk: async () => {
        await fetchAnewReport(bagOrderId as number);
        await fetchGetBagOrderDetail(bagOrderId as number);
      },
    });
  };

  /**
   * @description 更改待确认
   */
  const changeOrderStatus = () => {
    confirm({
      title: '提醒',
      content: '确认前，请先和用户、仓库、快递进行必要的沟通',
      okText: '确定',
      cancelText: ' 取消',
      onOk: async () => {
        await fetchCancelConfirm(bagOrderId as number);
        await fetchGetBagOrderDetail(bagOrderId as number);
      },
    });
  };

  /**
   * @description table子项
   * @param it
   * @param index
   */
  const expandedRowRender = (it: OrderAPI.BagListData, index: number) => {
    it.key = index;
    return (
      <ProTable
        columns={
          [{ title: '物流单号', dataIndex: 'trackingCode', key: 'trackingCode' },
            {
              title: '确认时间', dataIndex: 'confirmTimeMill', key: 'confirmTimeMill', valueType: 'dateTime',
            },
          ]}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={[it]}
        pagination={false}
      />
    );
  };

  /**
   * @description 关闭drawer
   */
  const close = () => {
    setDrawerVisible(false);
    setEdit(false);
  };

  /**
   * @description 更改地址
   * @param values
   */
  const submitAddressInfo = async (values: any) => {
    const { areaList } = values;
    const params = {
      ...values,
      province: areaList[0],
      city: areaList[1],
      county: areaList[2],
      bagOrderId: bagOrderId,
    };
    delete params.areaList;
    setEdit(false);
    await fetchUpdateBagOrderAddress(params, bagOrderId as number);
    // @ts-ignore
    form?.resetFields();
  };

  return <div>
    <ProTable<OrderAPI.BagListData>
      expandable={{ expandedRowRender }}
      toolBarRender={false}
      columns={columns}
      actionRef={actionRef}
      search={false}
      rowKey='id'
      request={(p) => fetchGetBagList(p, props.phone as string)}
    />
    <Drawer
      title={'书袋详情'}
      visible={drawerVisible}
      onClose={() => close()}
      width={900}
    >
      <div className='ant-descriptions-title' style={{ marginBottom: 10 }}>特殊操作</div>
      <div style={{ marginBottom: 15 }}>
        {
          checkBtnAuth('re_report_break') &&
          !loading &&
          < Button
            danger
            style={{ marginRight: 16 }}
            onClick={() => confirmAnewReport()}>
            重新报损
          </Button>
        }
        {
          checkBtnAuth('change_confirm') &&
          bagOrderDetail &&
          bagOrderDetail?.status > 5 &&
          bagOrderDetail?.status <= 50 &&
          !bagOrderDetail.nextStepFlag &&
          !loading &&
          <Button
            danger
            onClick={() => changeOrderStatus()}>
            更改为待确认
          </Button>
        }
      </div>
      <ProDescriptions
        title={'书袋信息'}
        loading={loading}
        dataSource={bagOrderDetail}
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
              key: 'createTimeMill',
              dataIndex: 'createTimeMill',
              valueType: 'dateTime',
            },
            {
              title: '订单编码',
              key: 'orderCode',
              dataIndex: 'orderCode',
              copyable: true,
            },
            {
              title: '预发货时间',
              key: 'preExpressTimeMill',
              dataIndex: 'preExpressTimeMill',
              valueType: 'dateTime',
            },
            {
              title: '订阅卡号',
              key: 'userCardNo',
              dataIndex: 'userCardNo',
              copyable: true,
            },
            {
              title: '书袋确认时间',
              key: 'confirmTimeMill',
              dataIndex: 'confirmTimeMill',
              valueType: 'dateTime',
            },
            {
              title: '书袋序号',
              key: 'sequence',
              dataIndex: 'sequence',
            },
            {
              title: '确认收货时间',
              key: 'completeTimeMill',
              dataIndex: 'completeTimeMill',
              valueType: 'dateTime',
            },
            {
              title: '金额',
              key: 'totalPrice',
              dataIndex: 'totalPrice',
              valueType: 'money',
            },
            {
              title: '书袋重量',
              key: 'weight',
              dataIndex: 'weight',
              render: (text) => `${text || '-'}克`,
            },
            {
              title: '运费',
              key: 'freight',
              dataIndex: 'freight',
              render: (text) => `¥${text}` || '¥12',
            },
            {
              title: '状态',
              key: 'statusStr',
              dataIndex: 'statusStr',
              render: (text) => <Tag>{text}</Tag>,
            },
          ]
        }
        column={2}
      />
      <ProDescriptions
        title={'物流信息'}
        loading={loading}
        dataSource={bagOrderDetail}
        columns={
          [
            {
              title: '物流公司',
              key: 'trackingName',
              dataIndex: 'trackingName',
            },
            {
              title: '推送仓库时间',
              key: 'shippingCreateTimeMill',
              dataIndex: 'shippingCreateTimeMill',
              valueType: 'dateTime',
            },
            {
              title: '物流单号',
              key: 'trackingNo',
              dataIndex: 'trackingNo',
              copyable: true,
            },
            {
              title: '仓库确认订单时间',
              key: 'shippingConfirmTimeMill',
              dataIndex: 'shippingConfirmTimeMill',
              valueType: 'dateTime',
            },
            {
              title: '发货时间',
              key: 'deliverTimeMill',
              dataIndex: 'deliverTimeMill',
              valueType: 'dateTime',
            },
            {
              title: '快递揽收时间',
              key: 'pickUpTimeMill',
              dataIndex: 'pickUpTimeMill',
              valueType: 'dateTime',
            },
            {
              title: '物流签收时间',
              key: 'receiveTimeMill',
              dataIndex: 'receiveTimeMill',
              valueType: 'dateTime',
            },
          ]
        }
        column={2}
      />
      {
        !edit && <ProDescriptions
          title={'收货信息'}
          loading={loading}
          dataSource={bagOrderDetail}
          columns={
            [
              {
                title: '收货人信息',
                key: 'contactName',
                dataIndex: 'contactName',
                render: (text, record) => {
                  const { contactPhone } = record;
                  return `${text || '--'} / ${contactPhone || '--'}`;
                },
              },
              {
                title: '收货人地址',
                key: 'province',
                dataIndex: 'province',
                render: (text, record) => {
                  const { city, county, address } = record;
                  return `${text || ''}${city || ''}${county || ''}${
                    address || ''
                  }`;
                },
              },
            ]
          }
          column={1}
        >
          {
            bagOrderDetail?.status === 5 &&
            <ProDescriptions.Item valueType='option'>
              <Button icon={<EditOutlined />} type={'link'} onClick={() => {
                setEdit(!edit);
              }}>更改地址</Button>
            </ProDescriptions.Item>
          }
        </ProDescriptions>
      }
      {
        edit && <>
          <div className='ant-descriptions-title' style={{ marginBottom: 20 }}>收货信息</div>
          <Form
            {...formItemLayout}
            initialValues={bagOrderDetail}
            ref={(f) => {
              setForm(f);
            }}
            onFinish={(v) => submitAddressInfo(v)}
          >
            <Form.Item
              name='contactName'
              label='收货人姓名'
              rules={[{ required: true, message: '请填写收货人姓名' }]}
            >
              <Input placeholder={'请填写收货人姓名'} />
            </Form.Item>
            <Form.Item
              name='contactPhone'
              label='收货人手机'
              rules={[{ required: true, message: '请填写收货人手机' }]}
            >
              <Input placeholder={'请填写收货人手机'} />
            </Form.Item>
            <Form.Item
              name='areaList' label={'省市区'}
              initialValue={
                bagOrderDetail?.province &&
                bagOrderDetail?.city &&
                bagOrderDetail?.county &&
                [bagOrderDetail?.province, bagOrderDetail?.city, bagOrderDetail?.county]
              }
              rules={[{ required: true, message: '请填写省市区' }]}
            >
              <Cascader options={cityOptions} placeholder=' 请填写省市区' />
            </Form.Item>
            <Form.Item
              name='address'
              label='地址'
              rules={[{ required: true, message: '请填写收货人地址' }]}
            >
              <Input placeholder={'请填写地址'} />
            </Form.Item>
            <Form.Item label={'操作'}>
              <Button type={'primary'} htmlType='submit' loading={submitLoading}>保存</Button>
            </Form.Item>
          </Form></>
      }

      <ProDescriptions
        title={'逾期操作'}
        loading={loading}
        dataSource={bagOrderDetail}
        columns={
          [
            {
              title: '逾期时间',
              key: 'overdueTimeMill',
              dataIndex: 'overdueTimeMill',
              valueType: 'dateTime',
            },
          ]
        }
        column={1}
        editable={{
          onSave: async (_, newInfo) => {
            const params = {
              bagOrderId: props.id,
              overdueDate: newInfo.overdueTimeMill,
            };
            await fetchUpdateOverdueTime(params);
            await fetchGetBagOrderDetail(bagOrderId as number);
            return true;
          },
        }}
      />
      <div className='ant-descriptions-title' style={{ marginBottom: 20 }}>绘本列表</div>
      <ProTable
        search={false}
        toolBarRender={false}
        dataSource={subBagOrderList}
        size={'small'}
        loading={loading}
        columns={subOrderColumns}
        scroll={{ x: 1300 }}
        rowKey={'id'}
      />
    </Drawer>

    {/*/-绘本填写备注-/*/}
    <Modal
      visible={remarkModalVisible}
      onCancel={() => {
        setRemarkModalVisible(false);
      }}
      footer={false}
    >
      <ProForm
        formRef={formRef}
        onFinish={async (values) => {
          const params = {
            remark: values.sellerRemark,
            subOrderId: subBookId,
          };
          await fetchUpdateSubAddRemark(params);
          setRemarkModalVisible(false);
          await fetchGetBagOrderDetail(bagOrderId as number);
        }}
      >
        <ProFormText
          width='md'
          name='sellerRemark'
          required
          label='备注'
          placeholder='请填写备注'
          rules={[{ required: true, message: '请填写备注' }]}
        />
      </ProForm>
    </Modal>

    <Drawer
      title={'关联订单'}
      visible={relationVisible}
      width={900}
      onClose={() => setRelationVisible(false)}
    >
      <ProTable<OrderAPI.LinkRelationData>
        search={false}
        toolBarRender={false}
        dataSource={referList}
        size={'small'}
        rowKey='orderId'
        loading={loading}
        columns={relationColumns}
      />
    </Drawer>
  </div>;
};
export default BagTabPane;
