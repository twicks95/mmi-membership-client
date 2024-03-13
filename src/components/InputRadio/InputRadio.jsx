import React, { useState } from 'react';
import { Radio } from 'antd';

function InputRadio({ data, setFormData }) {

  function onChange(e) {
    console.log('radio checked', e.target.value);
    setFormData((prev) => ({...prev, gender: e.target.value}))
}

return (
  <Radio.Group className="drop-shadow-none" onChange={onChange} value={data.gender}>
    <Radio value={"male"}>Male</Radio>
    <Radio value={"female"}>Female</Radio>
  </Radio.Group>
);
}

export default InputRadio;
