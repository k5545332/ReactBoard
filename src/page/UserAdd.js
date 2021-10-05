import InputSelect from '../component/Input/InputSelect';
import InputText from '../component/Input/InputText';
import InputTextArea from '../component/Input/InputTextArea';
import InputSubmit from '../component/Input/InputSubmit';
import InputEnabled from '../component/Input/InputEnabled';

import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Row } from 'react-grid-system';
import CheckJwtToken from '../component/CheckJwtToken';


function UserAdd() {
  const [accessLevel , setAccessLevel] = useState([]);
  const [userCreateData , setUserCreateData] = useState({
    Account:"",
    Password:"",
    UserName:"",
    Tel:"",
    AccessLevelid:"",
    Enabled:false,
    Email:"",
  });
  
  const Token = localStorage.getItem("LoginToken");
  if (Token === null) {
    window.location.href = "/"; 
  }
  const GetData = useCallback(()=>{
    const GetUserCreateData = ()=>{
      const url = "https://littlewhalecoreapiboard.herokuapp.com/user/add";
      fetch(url,
        {
          method: "GET",
          headers: {
            'Authorization':`Bearer ${Token}`
          }
        })
      .then((response)=>{
        var apidata = response.json();
        return apidata;
      })
      .then((apidata)=>{
        setAccessLevel(
          apidata.AccessLevelDtos.map(x=>{
            return{
              id:x.AccessLevelid,
              name:x.Name
            }
          })
        );
      })
    }
    GetUserCreateData();
  },[])

  const submitUserCreateData = ()=>{
    const url = "https://littlewhalecoreapiboard.herokuapp.com/user/add/submit";
    fetch(url,
    {
      method: "POST",
      body: JSON.stringify(userCreateData),
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
        window.location.href = "/#/User"; 
      }else{
        window.alert("新增失敗")
      }
    })
  }

  useEffect(() => {
    GetData();
  },[GetData])
  useEffect(()=>{
    CheckJwtToken();
  },[])

  return (
    <>
      <Row nogutter={true} justify="center">
        <h2>新增人員</h2>
      </Row>
      <Row nogutter={true}>
        <InputEnabled title="啟用" id="Enabled" name="Enabled" lg={12} setData={setUserCreateData}/>
      </Row>
      <Row nogutter={true} gutterWidth={50}>
        <InputText title="帳號" id="Account" name="Account" lg={6} sm={12} setData={setUserCreateData}/>
        <InputText title="密碼" id="Password" name="Password" lg={6} sm={12} setData={setUserCreateData}/>
      </Row>
      <Row nogutter={true} gutterWidth={50}>
        <InputSelect datas={accessLevel} title="權限" id="AccessLevelid" name="AccessLevelid" lg={6} sm={12} setData={setUserCreateData}/>
        <InputText title="姓名" id="UserName" name="UserName" lg={6} sm={12} setData={setUserCreateData}/>
      </Row>
      <Row nogutter={true} gutterWidth={50}>
        <InputText title="電話" id="Tel" name="Tel" lg={6} sm={12} setData={setUserCreateData}/>
        <InputText title="Email" id="Email" name="Email" lg={6} sm={12} setData={setUserCreateData}/>
      </Row>
      <Row nogutter={true}>
        <InputSubmit eventhandler={submitUserCreateData} title="資料存檔" />
      </Row>
    </>
    
  );
}



export default UserAdd;
