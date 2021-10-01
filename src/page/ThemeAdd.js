import InputSelect from '../component/Input/InputSelect';
import InputText from '../component/Input/InputText';
import InputTextArea from '../component/Input/InputTextArea';
import InputSubmit from '../component/Input/InputSubmit';
import InputEnabled from '../component/Input/InputEnabled';

import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Row } from 'react-grid-system';


function ThemeAdd() {
  const [themeCreateData , setThemeCreateData] = useState({
    Name:"",
    Enabled:false,
  });
  
  const Token = localStorage.getItem("LoginToken");


  const submitThemeCreateData = ()=>{
    const url = "https://localhost:5001/theme/add/submit";
    fetch(url,
    {
      method: "POST",
      body: JSON.stringify(themeCreateData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      }
    })
    .then((response)=>{
      var apidata = response;
      return apidata;
    })
    .then((apidata)=>{
      if (apidata.ok) {
        window.location.href = "/#/Theme"; 
      }else{
        window.alert("新增失敗")
      }
    })
  }


  return (
    <>
      <Row nogutter={true} justify="center">
        <h2>新增類別</h2>
      </Row>
      <Row nogutter={true}>
        <InputEnabled title="啟用" id="Enabled" name="Enabled" lg={12} setData={setThemeCreateData}/>
      </Row>
      <Row>
        <InputText title="名稱" id="Name" name="Name" setData={setThemeCreateData}/>
      </Row>
      <Row nogutter={true}>
        <InputSubmit eventhandler={submitThemeCreateData} title="資料存檔" />
      </Row>
    </>
    
  );
}



export default ThemeAdd;
