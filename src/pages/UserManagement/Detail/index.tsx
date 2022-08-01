import { ProCard } from '@ant-design/pro-components';
import { Divider, Statistic, Tag } from 'antd';
import React, { useEffect } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import Info from '@/components/Info';

const UserDetail: React.FC = (props) => {
  const {
    detailInfoLoading,
    fetchGetUserDetail,
    detail,
  } = useModel('userModel');

  useEffect(() => {
    const { id } = props.match.params;
    fetchGetUserDetail(id);
  }, []);

  return <div>
    <ProCard gutter={12} ghost loading={detailInfoLoading}>
      <ProCard.Group title={'基本信息'}>
        <ProCard>
          <Info title={'id'} content={detail?.id} />
          <Info title={'角色'} content={detail?.roleValue} />
          <Info title={'昵称'} content={`${detail?.nickname}/${detail?.phone}`} />
        </ProCard>
        <ProCard>
          <Info title={'订阅服务'} content={detail?.serviceName} />
          <Info title={'绑定关系'} content={
            <>
              <Tag></Tag>
            </>
          } />
          <Info title={'绑定状态'} content={detail?.referStatusValue} />
        </ProCard>
      </ProCard.Group>
      <ProCard colSpan='400px' title={'其他信息'}>
        <ProCard>
          <Info title={'当前积分'} content={detail?.userPoints} />
          <Info title={'宝宝'} content={'id'} />
        </ProCard>
      </ProCard>
    </ProCard>
  </div>;
};

export default UserDetail;
