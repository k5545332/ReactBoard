import InputSelect from '../component/Input/InputSelect';
import InputText from '../component/Input/InputText';
import InputPassword from '../component/Input/InputPassword';
import InputTextArea from '../component/Input/InputTextArea';
import InputSubmit from '../component/Input/InputSubmit';
import InputEnabled from '../component/Input/InputEnabled';
import userInfoContext from './Login';
import React, { useState, useEffect, useCallback, useContext  } from 'react';
import { Row } from 'react-grid-system';
import CheckJwtToken from '../component/CheckJwtToken';


function UserUpdate(props) {
  const [accessLevel , setAccessLevel] = useState([]);
  const [userData , setUserData] = useState({
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
  const id = props.match.params.id;
  const GetData = useCallback(()=>{
    const GetUserUpdateData = ()=>{
      const url = `https://littlewhalecoreapiboard.herokuapp.com/user/update/${id}`;
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
        setUserData(apidata.UpdateUserDto)
      })
    }
    GetUserUpdateData();
  },[])

  const submitUserUpdateData = ()=>{
    const url = `https://littlewhalecoreapiboard.herokuapp.com/user/update/${id}/submit`;
    fetch(url,
    {
      method: "Put",
      body: JSON.stringify(userData),
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
        <h2>編輯人員</h2>
      </Row>
      <Row nogutter={true}>
        <InputEnabled title="啟用" id="Enabled" name="Enabled" lg={12} setData={setUserData}   value={userData.Enabled}/>
      </Row>
      <Row nogutter={true} gutterWidth={50}>
        <InputText title="帳號" id="Account" name="Account" lg={6} sm={12} setData={setUserData}  value={userData.Account}/>
        <InputPassword title="密碼" id="Password" name="Password" lg={6} sm={12} setData={setUserData}  value={userData.Password}/>
      </Row>
      <Row nogutter={true} gutterWidth={50}>
        <InputSelect datas={accessLevel} title="權限" id="AccessLevelid" name="AccessLevelid" lg={6} sm={12} setData={setUserData}  value={userData.AccessLevelid}/>
        <InputText title="姓名" id="UserName" name="UserName" lg={6} sm={12} setData={setUserData}  value={userData.UserName}/>
      </Row>
      <Row nogutter={true} gutterWidth={50}>
        <InputText title="電話" id="Tel" name="Tel" lg={6} sm={12} setData={setUserData}  value={userData.Tel}/>
        <InputText title="Email" id="Email" name="Email" lg={6} sm={12} setData={setUserData}  value={userData.Email}/>
      </Row>
      <Row nogutter={true}>
        <InputSubmit eventhandler={submitUserUpdateData} title="資料存檔" />
      </Row>
    </>
    
  );
}



export default UserUpdate;
