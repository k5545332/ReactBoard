import React, { useState } from 'react';
import InputDiv from './InputDiv';

function InputSearch(props) {
  let {setData,...rest} = props;
  const [searchText,setSearchText ] = useState("");


  const handleChange = (e)=>{
    setSearchText(e.target.value);
    setData(e.target.value);
  }

  return (
    <InputDiv {...rest}>
      <input type="text" onChange={handleChange} value={searchText} />
    </InputDiv>
  );
}

export default InputSearch;
