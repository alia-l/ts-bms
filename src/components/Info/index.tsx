import React from 'react';

export type InfoProps = {
  title?: string;
  content?: any;
};
const Info: React.FC<InfoProps> = (props) => {
  return <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
    <div style={{
      fontSize: 14,
      fontWeight: 600,
      color: '#333',
      marginRight: 10,
    }}>{props.title}:
    </div>
    <div>{props.content}</div>
  </div>;
};
export default Info;
