import { Input, Select } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;
const { TextArea } = Input;
export type ReplyInfoProps = {
  dataSource: any,
  value?: any
  onChange?: (value: any ) => void
  defaultLabel?: string
}
const ReplyInfo: React.FC<ReplyInfoProps> = (props) => {
  const [selectValue, setSelectValue] = useState<string | undefined>(props?.defaultLabel);
  const changeSelect = (v: string) => {
    setSelectValue(v);
    props.onChange?.(v);
  };
  const changeTextArea = (v: any) => {
    const { value } = v.target;
    setSelectValue(value);
    props.onChange?.(value);
  };
  return <div>
    <Select onChange={changeSelect}>
      {
        props.dataSource.map((it: any) => (
          <Option value={it.label} key={it.value}>{it.label}</Option>
        ))
      }
    </Select>
    <TextArea value={selectValue} onChange={changeTextArea} />
  </div>;
};
export default ReplyInfo;
