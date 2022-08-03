import React, { useRef } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel } from '@@/plugin-model/useModel';
import { Button } from 'antd';
export type InfoProps = {
  id?: number;
  phone?: string;
};
const LotteryDrawTabPane: React.FC<InfoProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const { fetchGetLotteryCountList } = useModel('userModel');
  const columns: ProColumns<UserAPI.LotteryCountData>[] = [
    {
      title: '总可用次数',
      dataIndex: 'activeCount',
      key: 'activeCount'
    },
    {
      title: '总抽检次数  ',
      dataIndex: 'totalCount',
      key: 'totalCount'
    },
    {
      title: '操作',
      key: 'bagOperation',
      valueType: 'option',
      width: 180,
      render: () => {
        // const { id } = record;
        return [
          <Button
            type={`link`}
            key={'detail'}
            size={'small'}
            onClick={() => {
            }}>
            扣减
          </Button>,
          <Button
            type={`link`}
            key={'relation'}
            size={'small'}
            onClick={() => {

            }}>
            中奖记录详情
          </Button>,
        ];
      },
    },
  ];

  return <div>
    <ProTable<UserAPI.LotteryCountData>
      toolBarRender={false}
      columns={columns}
      actionRef={actionRef}
      search={false}
      rowKey='id'
      request={(p) => fetchGetLotteryCountList(p, props.id as number)}
    />
  </div>;
};
export default LotteryDrawTabPane;
