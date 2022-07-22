import { Space } from 'antd';
import Avatar from './AvatarDropdown';
import React from 'react';

const GlobalHeaderRight: React.FC = () => {
  return (
    <Space>
      <Avatar menu={false} />
    </Space>
  );
};
export default GlobalHeaderRight;
