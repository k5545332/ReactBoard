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
    <InputDiv style={{position: 'relative'}} {...rest}>
      <input type="text" onChange={handleChange} value={searchText} placeholder="搜尋標題" speech x-webkit-speech/>
      <span style={{position: 'absolute',right:'10px',top:0,bottom:0,margin:'auto',display:'flex',alignItems:'center',userSelect:'none',pointerEvents:'none'}}>🔍</span>
    </InputDiv>
  );
}

export default InputSearch;
