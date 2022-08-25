import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { history } from 'umi';

export type InfoProps = {
  path: string
}

const GoBack: React.FC<InfoProps> = (props) => {
  const goBack = () => {
    history.push(`${props.path}?back=success`);
  };
  return <div style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => goBack()}>
    <LeftOutlined className='mRight' />
    返回上一页
  </div>;
};

export default GoBack;
