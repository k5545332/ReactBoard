import InputSelect from '../component/Input/InputSelect';
import InputText from '../component/Input/InputText';
import InputTextArea from '../component/Input/InputTextArea';
import InputSubmit from '../component/Input/InputSubmit';
import InputEnabled from '../component/Input/InputEnabled';

import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Row } from 'react-grid-system';


function EventAdd() {
  const [ThemeData , setThemeData] = useState([]);
  const [ArticalCreateData , setArticalCreateData] = useState({
    Themeid:"",
    Title:"",
    Enabled:false,
    ContentDes:"",
  });
  
  const Token = localStorage.getItem("LoginToken");

  const GetData = useCallback(()=>{
    const GetEventCreateData = ()=>{
      const url = "https://littlewhalecoreapiboard.herokuapp.com/event/add";
      fetch(url,
        {
          method: "GET",
          headers: {
            'Authorization':`Bearer ${Token}`
          }
        })
      .then((response)=>{
        if (!response.ok) {
          localStorage.removeItem("LoginToken");
          window.location.href = "/"; 
        }
        var apidata = response.json();
        return apidata;
      })
      .then((apidata)=>{
        setThemeData(
          apidata.ThemeDtos.map(x=>{
            return{
              id:x.Themeid,
              name:x.Name
            }
          })
        );
      })
    }
    GetEventCreateData();
  },[])

  const submitEventCreateData = ()=>{
    const url = "https://littlewhalecoreapiboard.herokuapp.com/event/add/submit";
    fetch(url,
    {
      method: "POST",
      body: JSON.stringify(ArticalCreateData),
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
        window.location.href = "/"; 
      }else{
        window.alert("新增失敗")
      }
    })
  }

  useEffect(() => {
    GetData();
  },[GetData])


  return (
    <>
      <Row nogutter={true} justify="center">
        <h2>新增文章</h2>
      </Row>
      <Row nogutter={true}>
        <InputEnabled title="啟用" id="Enabled" name="Enabled" lg={12} setData={setArticalCreateData}/>
      </Row>
      <Row nogutter={true} gutterWidth={50}>
        <InputSelect datas={ThemeData} title="分類" id="Themeid" name="Themeid" lg={6} sm={12} setData={setArticalCreateData}/>
        <InputText title="標題" id="Title" name="Title" lg={6} sm={12} setData={setArticalCreateData}/>
      </Row>
      <Row>
        <InputTextArea title="內容" id="ContentDes" name="ContentDes" setData={setArticalCreateData}/>
      </Row>
      <Row nogutter={true}>
        <InputSubmit eventhandler={submitEventCreateData} title="資料存檔" />
      </Row>
    </>
    
  );
}



export default EventAdd;
