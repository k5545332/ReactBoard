import { css } from 'styled-components';
import OwnButton from '../component/Button/OwnButton';
import TrTag from '../component/Table/Tr';
import TitleTrTag from '../component/Table/TitleTr';
import TableTag from '../component/Table/Table';
import ThTag from '../component/Table/Th';
import TdTag from '../component/Table/Td';
import Confirm from '../component/Alert/Confirm';
import Pagination from '../component/Pagination/Pagination';
import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import CheckJwtToken from '../component/CheckJwtToken';

const option = {
  width: "15%",
};

function ThemeIndex() {
  const [data, setData] = useState({
    datas:[],
    showdatas:[],
    titles:["啟用","名稱","更新時間","更新人"]
  });

  const [confirmShow, setConfirmShow] = useState(false);
  const [delDataInfo, setDelDataInfo] = useState({
    id:"",
    title:""
  });
  const Token = localStorage.getItem("LoginToken");
  if (Token === null) {
    window.location.href = "/"; 
  }
  const GetData = useCallback(()=>{
    const GetThemeListData = async()=>{
      return new Promise(resolve =>{
        const url = "https://littlewhalecoreapiboard.herokuapp.com/theme/index";
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
          }
          var apidata = response.json();
          return apidata;
        })
        .then((apidata)=>{
          setData((preState)=>({
            ...preState,
            datas:apidata.ThemeDtos,
          }));
          return resolve();
        })
      })
    }
    GetThemeListData();
  },[])

  const ThemeDeleteHandler = async(id)=>{
    await ThemeDelete(id);
    await GetData();
  }

  const ThemeDelete = async(id)=>{
    return new Promise(resolve =>{
      const url = `https://littlewhalecoreapiboard.herokuapp.com/theme/delete/${id}`;
      
      fetch(url,
      {
        method: "Delete",
        body: "",
        headers: {
          'Authorization':`Bearer ${Token}`
        }
      })
      .then((response)=>{
        var apidata = response;
        return apidata;
      })
      .then((apidata)=>{
        if (apidata.ok) {
          window.alert("刪除成功")
        }else{
          window.alert("刪除失敗")
        }
        return resolve();
      })
    })
  }
  // useEffect(()=>{
  //   GetData();
  // },[GetData])
  useEffect(()=>{
    CheckJwtToken();
  },[])
  return (
    <>
      <OwnButton text="新增類別" link="#/Theme/Add" color="red"/>
      <TableTag>
        <tbody>
          <TitleTrTag>
          {data.titles.map(value=>(
            <ThTag key={value}>
            {value}
            </ThTag>
          ))}
           <ThTag style={option}>
              管理
            </ThTag>
          </TitleTrTag>
          
          {data.showdatas.map(value =>(
            <TrTag key={value.Themeid}>
              <TdTag moblieTitle={data.titles[0]}>
                {value.Enabled ? "☑" : "☒"}
              </TdTag>
              <TdTag moblieTitle={data.titles[1]}>
                {value.Name}
              </TdTag>
              <TdTag moblieTitle={data.titles[2]}>
                {value.UpdateTime}
              </TdTag>
              <TdTag moblieTitle={data.titles[3]}>
                {value.UserName}
              </TdTag>
              <TdTag style={{ display:"flex", justifyContent:'space-around' }} moblieTitle="管理">
                <OwnButton text="編輯" link={`#/Theme/Update/${value.Themeid}`} />
                <OwnButton text="刪除" link={void(0)} eventhandler={()=>{setConfirmShow(true);setDelDataInfo({id:value.Themeid,title:value.Title})}} color="red" />
              </TdTag>
            </TrTag>
          ))}
        </tbody>
      </TableTag>
      <Pagination updatedatahandler={GetData} data={data.datas} setshowdata={setData} />
      
      <Confirm yes={()=>{ThemeDeleteHandler(delDataInfo.id);setConfirmShow(false)}} no={()=>{setConfirmShow(false)}} title={delDataInfo.title} style={{display: confirmShow ? "block" : "none"}} />
    </>
  );
}



export default ThemeIndex;
