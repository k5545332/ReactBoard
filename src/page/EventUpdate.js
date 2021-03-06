import InputSelect from '../component/Input/InputSelect';
import InputText from '../component/Input/InputText';
import InputTextArea from '../component/Input/InputTextArea';
import InputSubmit from '../component/Input/InputSubmit';
import InputEnabled from '../component/Input/InputEnabled';
import userInfoContext from './Login';
import React, { useState, useEffect, useCallback, useContext  } from 'react';
import { Row } from 'react-grid-system';
import CheckJwtToken from '../component/CheckJwtToken';


function EventUpdate(props) {
  const [ThemeData , setThemeData] = useState([]);
  const [ArticalData , setArticalData] = useState({
    Eventid:"",
    Themeid:"",
    Title:"",
    Enabled:false,
    ContentDes:"",
  });
  const Token = localStorage.getItem("LoginToken");
  if (Token === null) {
    window.location.href = "/"; 
  }
  const id = props.match.params.id;
  const GetData = useCallback(()=>{
    const GetEventUpdateData = ()=>{
      const url = `https://littlewhalecoreapiboard.herokuapp.com/event/update/${id}`;
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
        setThemeData(
          apidata.ThemeDtos.map(x=>{
            return{
              id:x.Themeid,
              name:x.Name
            }
          })
        );
        setArticalData(apidata.UpdateEventDto)
      })
    }
    GetEventUpdateData();
  },[])

  const submitEventUpdateData = ()=>{
    const url = `https://littlewhalecoreapiboard.herokuapp.com/event/update/${id}/submit`;
    fetch(url,
    {
      method: "Put",
      body: JSON.stringify(ArticalData),
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
        window.alert("????????????")
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
        <h2>????????????</h2>
      </Row>
      <Row nogutter={true}>
        <InputEnabled title="??????" id="Enabled" name="Enabled" lg={12} setData={setArticalData} value={ArticalData.Enabled} />
      </Row>
      <Row nogutter={true} gutterWidth={50}>
        <InputSelect datas={ThemeData} title="??????" id="Themeid" name="Themeid" lg={6} sm={12} setData={setArticalData} value={ArticalData.Themeid}/>
        <InputText title="??????" id="Title" name="Title" lg={6} sm={12} setData={setArticalData} value={ArticalData.Title}/>
      </Row>
      <Row>
        <InputTextArea title="??????" id="ContentDes" name="ContentDes" setData={setArticalData} value={ArticalData.ContentDes}/>
      </Row>
      <Row nogutter={true}>
        <InputSubmit eventhandler={submitEventUpdateData} title="????????????" />
      </Row>
    </>
    
  );
}



export default EventUpdate;
