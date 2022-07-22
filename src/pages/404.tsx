import { Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => (
  <Result status="404" title="页面错误" subTitle="跑到哪里去了～" />
);

export default NoFoundPage;
