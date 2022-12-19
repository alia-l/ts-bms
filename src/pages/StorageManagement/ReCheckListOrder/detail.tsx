import React, { useEffect, useState } from 'react';
import { EditableProTable, ProCard, ProColumns, ProDescriptions } from '@ant-design/pro-components';
import { useModel } from '@@/plugin-model/useModel';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { OSS_DIR } from '@/conf/conf';
import ReplyInfo from '@/components/ReplyInfo';
import 'react-photo-view/dist/react-photo-view.css';
import { Button, Space } from 'antd';
import OSSUpLoad from '@/components/OssUpLoad';
import ReCheckBuyerRemark from '@/components/ReCheckBuyerRemark';

const replyInfo = [
  { value: 1, label: '您好，您归还的绘本中存在污渍，如有疑问请在"我的"处联系在线客服哦~' },
  { value: 2, label: '您好，您归还的绘本中存在书页损坏，如有疑问请在"我的"处联系在线客服哦~' },
  { value: 3, label: '您好，您归还的绘本中存在书页被涂鸦，如有疑问请在"我的"处联系在线客服哦~' },
  { value: 4, label: '您好，您仍有同书袋绘本未被归还，如有疑问请在"我的"处联系在线客服哦~' },
];

const ReCheckOrderDetail: React.FC = (props) => {
  const {
    fetchGetReCheckDetail,
    fetchSubmitReCheck,
    detail,
    loading,
  } = useModel('reCheckListOrderModel');
  const [detailId, setDetailId] = useState<number>();
  const [detailParams, setDetailParams] = useState<any>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);


  const columns: ProColumns<OrderAPI.ReCheckOrderData_subOrderList>[] = [
    {
      title: '损坏(点击看大图)',
      dataIndex: 'imgList',
      width: 300,
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
      renderFormItem: () => {
        return <OSSUpLoad listType={'picture-card'} path={OSS_DIR.orderCheck} type={'img'}
                          max={10} />;
      },
    },
    {
      title: '复核操作',
      dataIndex: 'type',
      key: 'type',
      valueType: 'select',
      valueEnum: {
        1: { text: '追损' },
        2: { text: '入残损仓' },
        3: { text: '入库' },
      },
      width: 120,
    },
    {
      title: '仓库备注',
      dataIndex: 'buyerRemark',
      key: 'buyerRemark',
      width: 350,
      renderFormItem: () => {
        return <ReCheckBuyerRemark />;
      },
    },
    {
      title: '用户备注',
      dataIndex: 'staffRemark',
      key: 'staffRemark',
      width: 350,
      renderFormItem: (text: any) => {
        const { entity } = text;
        const { staffReply } = entity;
        return <ReplyInfo dataSource={replyInfo} defaultLabel={staffReply} />;
      },
    },
    {
      title: '名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 80,
      editable: false,
    },
    {
      title: '编码',
      dataIndex: 'productNo',
      key: 'productNo',
      editable: false,
    },
    {
      title: ' 生成复核时间',
      dataIndex: 'inspectionTime',
      key: 'inspectionTime',
      editable: false,
      valueType: 'dateTime',
    },
    {
      title: ' 质检复核时间',
      dataIndex: 'reCheckTime',
      key: 'reCheckTime',
      editable: false,
      valueType: 'dateTime',
    },
    {
      title: ' 追损复核时间',
      dataIndex: 'confirmTime',
      key: 'confirmTime',
      editable: false,
      valueType: 'dateTime',
    },
    {
      title: ' 质检视频',
      dataIndex: 'checkVideoUrl',
      key: 'checkVideoUrl',
      editable: false,
    },
    {
      title: ' 质检视频时长',
      dataIndex: 'checkVideoDuration',
      key: 'checkVideoDuration',
      editable: false,
    },
    {
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      width: 120,
      render: (text, record, _, action) => {
        const { id } = record;
        return [
          <Button
            key='reply'
            type={'link'}
            onClick={() => {
              action?.startEditable?.(id);
            }}
          >
            编辑
          </Button>,
        ];
      },
    },
  ];


  useEffect(() => {
    // @ts-ignore
    const { id, status } = props.match.params;
    const params = {
      goodsInOrderId: id,
      status: status,
    };
    setDetailId(id * 1);
    setDetailParams(params);
    fetchGetReCheckDetail(params);
  }, []);


  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const submitInfo = async (data: any) => {
    const { buyerRemark, imgList, type, staffRemark, id } = data;
    const params = {
      goodsInOrderId: detailId as number,
      submitReCheckSubReqList: [
        {
          buyerRemark,
          imgList,
          type,
          goodsInOrderSubId: id,
          remark: staffRemark,
        },
      ],
    };

    await fetchSubmitReCheck(params);
    await fetchGetReCheckDetail(detailParams);
    history.back();
  };


  return <div>
    <ProCard style={{ marginBottom: 16 }} loading={loading}>
      <ProDescriptions
        title={'基础信息'}
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
              title: '书袋编码',
              key: 'bagOrderCode',
              dataIndex: 'bagOrderCode',
              copyable: true,
            },
            {
              title: '创建时间',
              key: 'createTime',
              dataIndex: 'createTime',
              valueType: 'dateTime',
            },
            {
              title: '书袋序号',
              key: 'sequence',
              dataIndex: 'sequence',
            },
            {
              title: '订单编码',
              key: 'orderCode',
              dataIndex: 'orderCode',
              copyable: true,
            },
            {
              title: '状态',
              key: 'status',
              dataIndex: 'status',
            },
          ]
        }
      />
    </ProCard>
    <EditableProTable<OrderAPI.ReCheckOrderData_subOrderList>
      rowKey='id'
      headerTitle={'复核商品'}
      columns={columns}
      scroll={{ x: 3000 }}
      value={detail?.subOrderList}
      recordCreatorProps={false}
      loading={loading}
      style={{ marginBottom: 16 }}
      editable={{
        onSave: async (_, data) => submitInfo(data),
        actionRender: (row, config, defaultDom) => {
          return [
            defaultDom.save,
            defaultDom.cancel,
          ];
        },
      }}
      rowSelection={{
        selectedRowKeys,
        onChange: onSelectChange,
      }}
      tableAlertOptionRender={() => {
        return (
          <Space size={16}>
            {/*<a onClick={() => setRefundModalVisible(true)}>批量质检复核</a>*/}
          </Space>
        );
      }}
    />


  </div>;
};

export default ReCheckOrderDetail;
