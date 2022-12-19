import React, { useState } from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

export type BuyerRemarkProps = {
  value?: any,
  onChange?: (value: any) => void,
}
const ReCheckBuyerRemark: React.FC<BuyerRemarkProps> = (props) => {
  const [selectValue, setSelectValue] = useState('未通过');
  const changeSelect = (v: string) => {
    setSelectValue(v);
  };

  const changeInput = (e: any) => {
    const { value } = e.target;
    props.onChange?.(`${selectValue} ${value}`);
  };

  return <div style={{ display: 'flex' }}>
    <Select style={{ width: 120 }} value={selectValue} onChange={changeSelect}>
      <Option value={'未通过'}>未通过</Option>
      <Option value={''}>其他</Option>
    </Select>
    <Input onChange={changeInput} />
  </div>;

};
export default ReCheckBuyerRemark;
