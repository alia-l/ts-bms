import React from 'react';
import { Tabs } from 'antd';
import GrantCard from './Components/GrantCard';
import MakeUpCard from '@/pages/StorageManagement/EntityCard/Components/MakeUpCard';

const { TabPane } = Tabs;
const EntityCard: React.FC = () => {
  return <div>
    <Tabs>
      <TabPane tab={'实体卡分发'} key='1'>
        <GrantCard />
      </TabPane>
      <TabPane tab={'实体卡制作'} key={'2'}>
        <MakeUpCard/>
      </TabPane>
    </Tabs>

  </div>;
};

export default EntityCard;
