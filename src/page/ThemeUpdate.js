import InputSelect from '../component/Input/InputSelect';
import InputText from '../component/Input/InputText';
import InputTextArea from '../component/Input/InputTextArea';
import InputSubmit from '../component/Input/InputSubmit';
import InputEnabled from '../component/Input/InputEnabled';
import userInfoContext from './Login';
import React, { useState, useEffect, useCallback, useContext  } from 'react';
import { Row } from 'react-grid-system';
import CheckJwtToken from '../component/CheckJwtToken';


function ThemeUpdate(props) {
  const [themeData , setThemeData] = useState({
    Name:"",
    Enabled:false,
  });
  const Token = localStorage.getItem("LoginToken");
  if (Token === null) {
    window.location.href = "/"; 
  }
  const id = props.match.params.id;
  const GetData = useCallback(()=>{
    const GetThemeUpdateData = ()=>{
      const url = `https://littlewhalecoreapiboard.herokuapp.com/theme/update/${id}`;
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
        setThemeData(apidata)
      })
    }
    GetThemeUpdateData();
  },[])

  const submitThemeUpdateData = ()=>{
    const url = `https://littlewhalecoreapiboard.herokuapp.com/theme/update/${id}/submit`;
    fetch(url,
    {
      method: "Put",
      body: JSON.stringify(themeData),
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
        window.alert("編輯失敗")
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
        <h2>編輯類別</h2>
      </Row>
      <Row nogutter={true}>
        <InputEnabled title="啟用" id="Enabled" name="Enabled" lg={12} setData={setThemeData} value={themeData.Enabled} />
      </Row>
      <Row nogutter={true} gutterWidth={50}>
        <InputText title="標題" id="Name" name="Name" lg={12} setData={setThemeData} value={themeData.Name}/>
      </Row>
      <Row nogutter={true}>
        <InputSubmit eventhandler={submitThemeUpdateData} title="資料存檔" />
      </Row>
    </>
    
  );
}



export default ThemeUpdate;
