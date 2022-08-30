import React, { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import {
  ActionType,
  EditableProTable,
  PageContainer,
  ProCard,
  ProColumns,
  ProDescriptions,
} from '@ant-design/pro-components';
import GoBack from '@/components/GoBack';
import { CHASE_DAMAGE_STATUS, OSS_DIR, PROCESS_DAMAGE_STATUS } from '@/conf/conf';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Button, Form, Input, Modal, Select, Space } from 'antd';
import 'react-photo-view/dist/react-photo-view.css';
import OSSUpLoad from '@/components/OssUpLoad';

const { TextArea } = Input;
const { confirm } = Modal;
const { Option } = Select;

const ChaseDamageOrderDetail: React.FC = (props) => {
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();
  const {
    fetchGetDamageInfoDetail,
    fetchUpdateDamageInfo,
    fetchRefundDamageSubOrder,
    detail,
    fetchCancelDamageSubOrder,
  } = useModel('chaseDamageOrderModel');
  const [detailId, setDetailId] = useState<number>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [refundModalVisible, setRefundModalVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [refundRemark, setRefundRemark] = useState<string>('');
  const columns: ProColumns<OrderAPI.ChaseDamageDetailData_subOrderList>[] = [
    {
      title: '报损图片(点击看大图)',
      dataIndex: 'imgList',
      width: isEdit ? 400 : 200,
      key: 'imgList',
      render: (_, record) => {
        const { imgList } = record;
        return <PhotoProvider maskOpacity={0.5}>
          {
            (imgList || []).map((it) => (
              <PhotoView src={it} key={it}>
                <img src={it} alt={''} width={50} height={50} style={{ margin: 5 }} />
              </PhotoView>
            ))
          }
        </PhotoProvider>;
      },
      renderFormItem: (_, { isEditable }) => {
        setIsEdit(isEditable as boolean);
        return <OSSUpLoad listType={'picture-card'} path={OSS_DIR.damageImg} type={'img'}
                          max={10} />;
      },
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      editable: false,
      width: 80,
    },
    {
      title: '绘本名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 250,
      editable: false,
    },
    {
      title: '绘本编号',
      dataIndex: 'productNo',
      key: 'productNo',
      editable: false,
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      editable: false,
      width: 170,
      valueEnum: {
        '-20': { text: '客服追损复核驳回', status: 'Error' },
        '-15': { text: '已退款', status: 'Error' },
        '-10': { text: '运营取消订单', status: 'Error' },
        0: { text: '待支付', status: 'Default' },
        10: { text: '已支付', status: 'Success' },
        50: { text: '已完成', status: 'Success' },
      },
    },
    {
      title: '总价',
      dataIndex: 'amount',
      key: 'amount',
      editable: false,
      valueType: 'money',
      width: 100,
    },
    {
      title: '售价',
      dataIndex: 'salePrice',
      key: 'salePrice',
      editable: false,
      valueType: 'money',
      width: 100,
    },
    {
      title: ' 支付金额',
      dataIndex: 'payAmount',
      key: 'payAmount',
      editable: false,
      valueType: 'money',
      width: 100,
    },
    {
      title: '用户备注',
      dataIndex: 'sellerRemark',
      key: 'sellerRemark',
      renderFormItem: () => {
        return <TextArea rows={4} />;
      },
    },
    {
      title: '仓库备注',
      dataIndex: 'buyerRemark',
      key: 'buyerRemark',
      renderFormItem: () => {
        return <TextArea rows={4} />;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      width: 200,
      render: (_, record, text, action) => {
        const { id, status } = record;
        return [
          <Button type={'link'} key={'edit'} size={'small'} onClick={() => {
            action?.startEditable?.(id);
          }}>
            修改备注
          </Button>,
          <Button
            danger
            type={'primary'}
            key={'cancel'}
            size={'small'}
            disabled={
              (detail?.subOrderList || []).length === 1 ||
              status !== 0 ||
              detail?.status !== 0
            }
            onClick={async () => {
              confirm({
                title: '是否要取消该绘本的追损',
                okText: '确定',
                cancelText: ' 取消',
                onOk: async () => {
                  await fetchCancelDamageSubOrder(id);
                  actionRef?.current?.reload();
                },
              });
            }}
          >取消追损</Button>,
        ];
      },
    },
  ];
  useEffect(() => {
    // @ts-ignore
    const { id } = props.match.params;
    setDetailId(id);
    fetchGetDamageInfoDetail(id);
  }, []);


  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const changeRefundTextArea = (e: any) => {
    const { value } = e.target;
    setRefundRemark(value);
  };

  /**
   * @description 验收
   */
  const submitInfo = async () => {
    const values = await form.validateFields();
    const params: OrderAPI.UpdateDamageInfoParams = {
      id: detailId as number,
      ...values,
    };
    await fetchUpdateDamageInfo(params);
    await fetchGetDamageInfoDetail(detailId as number);
  };

  /**
   * @description 更新信息
   */
  const submitUpdateInfo = async (data: OrderAPI.ChaseDamageDetailData_subOrderList) => {
    const { id, imgList, sellerRemark, buyerRemark } = data;
    const params: OrderAPI.UpdateDamageInfoParams = {
      id: detailId as number,
      subOrderList: [
        {
          id,
          imgList: imgList,
          sellerRemark,
          buyerRemark,
        },
      ],
    };
    await fetchUpdateDamageInfo(params);
    await fetchGetDamageInfoDetail(detailId as number);
  };

  /**
   * @description 批量退款
   */
  const submitRefundInfo = async () => {
    const params: OrderAPI.RefundDamageParams = {
      orderCode: detail?.orderCode as string,
      staffRemark: refundRemark,
      damageSubOrderIds: selectedRowKeys as number[],
    };
    await fetchRefundDamageSubOrder(params);
    await fetchGetDamageInfoDetail(detailId as number);
  };


  return <PageContainer
    content={<GoBack path={'/storage/ChaseDamageOrder'} />}>
    <ProCard>
      <ProDescriptions<OrderAPI.ChaseDamageDetailData>
        title={'订单信息'}
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
              title: '状态',
              dataIndex: 'status',
              key: 'status',
              valueEnum: CHASE_DAMAGE_STATUS,
            },
            {
              title: '订单编码',
              key: 'orderCode',
              dataIndex: 'orderCode',
              copyable: true,
            },
            {
              title: '书袋序号',
              key: 'sequence',
              dataIndex: 'sequence',
            },
            {
              title: '书袋编码',
              key: 'bagOrderCode',
              dataIndex: 'bagOrderCode',
              copyable: true,
            },
            {
              title: '追损退款金额',
              key: 'amount',
              dataIndex: 'amount',
              valueType: 'money',
            },
            {
              title: '创建时间',
              key: 'createTime',
              dataIndex: 'createTime',
              valueType: 'dateTime',
            },
            {
              title: '质检人',
              key: 'staffName',
              dataIndex: 'staffName',
            },
          ]
        }
        column={2}
      />
    </ProCard>
    <ProCard style={{ marginTop: 16, marginBottom: 16 }}>
      <ProDescriptions<OrderAPI.ChaseDamageDetailData>
        title={'支付信息'}
        dataSource={detail}
        column={2}
        columns={[
          {
            title: '流水号',
            key: 'outTradeNo',
            dataIndex: 'outTradeNo',
          },
          {
            title: '应付金额',
            key: 'payAmount',
            dataIndex: 'payAmount',
            valueType: 'money',
          },
          {
            title: '支付时间',
            key: 'paidTime',
            dataIndex: 'paidTime',
            valueType: 'dateTime',
          },
          {
            title: '实付金额',
            key: 'paidAmount',
            dataIndex: 'paidAmount',
            valueType: 'money',
          },
          {
            title: '折扣金额',
            key: 'discountAmount',
            dataIndex: 'discountAmount',
            valueType: 'money',
          },
        ]}
      />
    </ProCard>
    <EditableProTable<OrderAPI.ChaseDamageDetailData_subOrderList>
      actionRef={actionRef}
      rowKey='id'
      headerTitle={
        <Space>
          <span>追损内容</span>
          <Button size={'small'} type={'primary'} onClick={() => setModalVisible(true)}>验收</Button>
        </Space>
      }
      rowSelection={{
        selectedRowKeys,
        onChange: onSelectChange,
        getCheckboxProps: (record) => ({
          disabled: record.status !== 10
        })
      }}
      tableAlertOptionRender={() => {
        return (
          <Space size={16}>
            <a onClick={() => setRefundModalVisible(true)}>批量退款</a>
          </Space>
        );
      }}
      scroll={{ x: 2000 }}
      value={detail?.subOrderList}
      columns={columns}
      recordCreatorProps={false}
      editable={{
        onSave: async (_, data) => submitUpdateInfo(data),
        actionRender: (row, config, defaultDom) => {
          return [
            defaultDom.save,
            defaultDom.cancel
          ];
        },
      }}
    />
    <Modal
      title={'追损验收'}
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      forceRender={true}
      onOk={() => submitInfo()}
    >
      <Form form={form}>
        <Form.Item label={'验收状态'} name={'status'}>
          <Select>
            {
              PROCESS_DAMAGE_STATUS.map((it) => (
                <Option value={it.value} key={it.value}>{it.name}</Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item label={'验收备注'} name={'sellerRemark'}>
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
    <Modal
      title={'退款说明'}
      visible={refundModalVisible}
      onCancel={() => setRefundModalVisible(false)}
      destroyOnClose={true}
      onOk={() => submitRefundInfo()}
    >
      <TextArea onChange={changeRefundTextArea} />
    </Modal>
  </PageContainer>;
};
export default ChaseDamageOrderDetail;
