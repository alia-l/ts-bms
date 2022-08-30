import { EditableProTable, PageContainer, ProCard, ProColumns, ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { DAMAGE_TYPE } from '@/conf/conf';
import ReplyInfo from '@/components/ReplyInfo';
import { Button, Form, Input, Modal, Radio } from 'antd';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import GoBack from '@/components/GoBack';


const replyInfo = [
  { value: 1, label: '您好，书角挤压或已修复过的破损，不属于损坏，无需报损。' },
  { value: 2, label: '报损成功，该部分破损在绘本归还时不再统计' },
  { value: 3, label: '实在抱歉，给您带来了不好的体验。客服为您特殊申请补偿您10积分，7个工作日到账，请注意查收。' },
  { value: 4, label: '您好，您的报损因【未上传破损图】报损失败，需要您联系在线客服给您重新开通报损' },
];

const damageCheckType: any[] = [
  { value: 5, label: '快递原因导致' },
  { value: 10, label: '仓库质检遗漏' },
];

const { TextArea } = Input;

const ReportDamageOrderDetail: React.FC = (props) => {
  const [form] = Form.useForm();
  const [damageForm] = Form.useForm();
  const {
    fetchGetReportDetail,
    fetchSubReportReply,
    fetchSubReportPointCompensation,
    fetchSubReportDamageClassify,
    fetchDamageReportV2,
    reportDetail,
    staffRemark,
    setStaffRemark,
    submitLoading,
  } = useModel('reportDamageOrderModel');
  const [detailId, setDetailId] = useState<number>();
  const [subReportId, setSubReportId] = useState<number>();
  const [pointStatus, setPointsStatus] = useState<number>();
  const [item, setItem] = useState<OrderAPI.ReportDamageDetailData_subReportVos>();
  const [pointModalVisible, setPointModalVisible] = useState<boolean>(false);
  const [damageModalVisible, setDamageModalVisible] = useState<boolean>(false);
  const columns: ProColumns<OrderAPI.ReportDamageDetailData_subReportVos>[] = [
    {
      title: '报损图片(点击看大图)',
      dataIndex: 'imgArr',
      key: 'imgArr',
      width: 200,
      fixed: 'left',
      render: (_, record) => {
        const { imgArr } = record;
        return <PhotoProvider maskOpacity={0.5}>
          {
            (imgArr || []).map((it, index) => (
              <PhotoView src={it} key={index}>
                <img src={it} alt={''} width={50} height={50} style={{ margin: 5 }} />
              </PhotoView>
            ))
          }
        </PhotoProvider>;
      },
      editable: false,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      editable: false,
    },
    {
      title: '绘本名称',
      dataIndex: 'productName',
      key: 'productName',
      editable: false,
    },
    {
      title: '用户留言',
      dataIndex: 'userRemark',
      key: 'userRemark',
      editable: false,
    },
    {
      title: '报损类型',
      dataIndex: 'damageType',
      key: 'damageType',
      render: (text) => {
        return (
          <span>
            {(DAMAGE_TYPE.find((it) => it.value === text) || {}).name || '--'}
          </span>
        );
      },
      editable: false,
    },
    {
      title: '回复内容',
      dataIndex: 'staffReply',
      key: 'staffReply',
      width: 350,
      renderFormItem: (text: any) => {
        const { entity } = text;
        const { staffReply } = entity;
        return <ReplyInfo dataSource={replyInfo} defaultLabel={staffReply} />;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      width: 220,
      render: (text, record, _, action) => {
        const { id, staffReply, pointsCompensationStatus, damageClassify } = record;
        return [
          <Button
            key='reply'
            type={'link'}
            onClick={() => {
              action?.startEditable?.(id);
            }}
            disabled={staffReply}
          >
            {staffReply ? '已回复' : '回复'}
          </Button>,
          <a
            key='point'
            onClick={() => {
              setPointModalVisible(true);
              setSubReportId(id);
              setItem(record);
              setPointsStatus(pointsCompensationStatus);
            }}
          >
            {
              pointsCompensationStatus === 10 ?
                <span style={{ color: '#8c8c8c' }}>积分未发放</span> : pointsCompensationStatus === 50 ?
                <span style={{ color: '#73d13d' }}>积分已发放</span> : '积分补偿'
            }
          </a>,
          <a
            key='damage'
            onClick={() => {
              setItem(record);
              setDamageModalVisible(true);
            }}
          >
            {
              damageClassify ?
                <span
                  style={{ color: '#8c8c8c' }}>
                  {(damageCheckType.find((it) => it.value === damageClassify) || {}).label}
                </span> : '报损原因分类'
            }
          </a>,
        ];
      },
    },
  ];

  useEffect(() => {
    // @ts-ignore
    const { id } = props.match.params;
    setDetailId(id);
    fetchGetReportDetail(id);
  }, []);


  const changeStaffRemark = (e: any) => {
    const { value } = e.target;
    setStaffRemark(value);
  };


  const submitStaffReply = async (id: any, it: OrderAPI.ReportDamageDetailData_subReportVos) => {
    const { staffReply } = it;
    console.log(it);
    const params = {
      reply: staffReply,
      subReportId: id,
    };
    await fetchSubReportReply(params);
    await fetchGetReportDetail(detailId as number);
  };

  const submitPointInfo = async () => {
    const values = await form.validateFields();
    const params: OrderAPI.PointCompensationParams = {
      subReportId,
      remark: values.pointsRemark,
      points: values.pointsAmount,
    };
    await fetchSubReportPointCompensation(params);
    await fetchGetReportDetail(detailId as number);
    setPointModalVisible(false);
    form.resetFields();
  };

  const submitDamageInfo = async () => {
    const values = await damageForm.validateFields();
    const params: OrderAPI.DamageTypeParams = {
      subReportId: item?.id,
      damageClassify: values.damageClassify,
      remark: values.damageRemark,
    };
    await fetchSubReportDamageClassify(params);
    await fetchGetReportDetail(detailId as number);
    setDamageModalVisible(false);
    damageForm.resetFields();
  };

  const submitStaffRemark = async () => {
    const params: OrderAPI.StaffReportParams = {
      id: reportDetail?.id,
      staffRemark,
      status: 10,
    };
    await fetchDamageReportV2(params);
    await fetchGetReportDetail(detailId as number);

  };


  return <PageContainer content={<GoBack path={'/storage/reportDamageOrder'} />}
  >
    <ProCard style={{ marginBottom: 16 }}>
      <ProDescriptions
        title={'基础信息'}
        dataSource={reportDetail}
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
              key: 'reportCode',
              dataIndex: 'reportCode',
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
              title: '状态',
              key: 'status',
              dataIndex: 'status',
              valueEnum: {
                0: { text: '报损未处理', status: 'Default' },
                10: { text: '报损已处理', status: 'Success' },
              },
            },
          ]
        }
        column={2}
      />
    </ProCard>
    <EditableProTable<OrderAPI.ReportDamageDetailData_subReportVos>
      rowKey='id'
      headerTitle={'报损内容'}
      columns={columns}
      scroll={{ x: 1500 }}
      value={reportDetail?.subReportVos}
      recordCreatorProps={false}
      style={{ marginBottom: 16 }}
      editable={{
        onSave: async (rowKey, data) => submitStaffReply(rowKey, data),
        actionRender: (row, config, defaultDom) => {
          return [
            defaultDom.save,
            defaultDom.cancel
          ];
        },
      }}
    />
    <ProCard title={'仓库备注回复'}>
      <TextArea rows={4} onChange={changeStaffRemark} value={staffRemark} />
      <Button type={'primary'} className='mTop' onClick={() => submitStaffRemark()} loading={submitLoading}>保存</Button>
    </ProCard>

    <Modal
      title={'积分补偿'}
      visible={pointModalVisible}
      onCancel={() => setPointModalVisible(false)}
      destroyOnClose={true}
      forceRender={true}
      onOk={() => submitPointInfo()}
      confirmLoading={submitLoading}
      okButtonProps={{ disabled: pointStatus === 10 || pointStatus === 50 }}
    >
      <Form
        form={form}
      >
        <Form.Item label={'补偿积分'} name={'pointsAmount'}
                   rules={[{ required: true, message: '请填写积分' }]}
        >
          {
            pointStatus === 10 || pointStatus === 50 ? item?.pointsAmount || '' : <Input placeholder={'10积分=1元'} />
          }
        </Form.Item>
        <Form.Item label={'积分备注'} name={'pointsRemark'}>
          {
            pointStatus === 10 || pointStatus === 50 ? item?.pointsRemark || '' : <Input />
          }
        </Form.Item>
      </Form>
    </Modal>
    <Modal
      title={'损坏原因分类'}
      visible={damageModalVisible}
      onCancel={() => setDamageModalVisible(false)}
      forceRender={true}
      destroyOnClose={true}
      confirmLoading={submitLoading}
      okButtonProps={{ disabled: item?.damageClassify }}
      onOk={() => submitDamageInfo()}
    >
      <Form
        form={damageForm}
      >
        <Form.Item label={'损坏原因分类'} name={'damageClassify'}
                   rules={[{ required: true, message: '请选择损坏原因' }]}
        >
          {
            item?.damageClassify ? (damageCheckType.find((it) => it.value === item?.damageClassify) || {}).label :
              <Radio.Group>
                {
                  damageCheckType.map((it) => (
                    <Radio value={it.value} key={it.value}>{it.label}</Radio>
                  ))
                }
              </Radio.Group>
          }

        </Form.Item>
        <Form.Item label={'损坏原因备注'} name={'damageRemark'}>
          {
            item?.damageClassify ? item?.damageClassifyRemark : <Input />
          }
        </Form.Item>
      </Form>
    </Modal>
  </PageContainer>;
};

export default ReportDamageOrderDetail;

