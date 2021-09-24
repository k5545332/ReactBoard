import styled from 'styled-components';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import InputText from '../component/Input/InputText';
import InputPassword from '../component/Input/InputPassword';
import InputSubmit from '../component/Input/InputSubmit';


const Login = ()=>{
  
  const [accountAndPassword,setAccountAndPassword] = useState({
    Account:"",
    Password:""
  })


  const submitlogin = ()=>{
    const url = "http://localhost:9001/login/submit";
    fetch(url,
    {
      method: "POST",
      body: JSON.stringify(accountAndPassword),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
      var apidata = response.text();
      return apidata;
    })
    .then((apidata)=>{
      if (apidata==="fail") {
        window.alert("登入失敗")
      }
      else if(apidata.length>10)
      {
        localStorage.setItem("LoginToken",apidata);
        window.location.href = "/"; 
      }
    })
  }

  return (
    <>
      <InputText title="帳號" id="Account" name="Account" setData={setAccountAndPassword}/>
      <InputPassword title="密碼" id="Password" name="Password" setData={setAccountAndPassword}/>
      <InputSubmit eventhandler={submitlogin} title="送出" />
    </>
  );
}

export default Login;