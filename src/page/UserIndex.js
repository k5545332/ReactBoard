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

const option = {
  width: "15%",
};

function UserIndex() {
  const [data, setData] = useState({
    datas:[],
    showdatas:[],
    titles:["啟用","帳號","姓名","電話","權限","Email"]
  });

  const [confirmShow, setConfirmShow] = useState(false);
  const [delDataInfo, setDelDataInfo] = useState({
    id:"",
    title:""
  });
  const Token = localStorage.getItem("LoginToken");
  const GetData = useCallback(()=>{
    const GetUserListData = async()=>{
      return new Promise(resolve =>{
        const url = "https://localhost:5001/user/index";
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
            datas:apidata.UserDtos,
          }));
          return resolve();
        })
      })
    }
    GetUserListData();
  },[])

  const UserDeleteHandler = async(id)=>{
    await UserDelete(id);
    await GetData();
  }

  const UserDelete = async(id)=>{
    return new Promise(resolve =>{
      const url = `https://localhost:5001/user/delete/${id}`;
      
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

  return (
    <>
      <OwnButton text="新增人員" link="#/User/Add" color="red"/>
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
            <TrTag key={value.Userid}>
              <TdTag moblieTitle={data.titles[0]}>
                {value.Enabled ? "☑" : "☒"}
              </TdTag>
              <TdTag moblieTitle={data.titles[1]}>
                {value.Account}
              </TdTag>
              <TdTag moblieTitle={data.titles[2]}>
                {value.UserName}
              </TdTag>
              <TdTag moblieTitle={data.titles[3]}>
                {value.Tel}
              </TdTag>
              <TdTag moblieTitle={data.titles[4]}>
                {value.AccessLevelName}
              </TdTag>
              <TdTag moblieTitle={data.titles[5]}>
                {value.Email}
              </TdTag>
              <TdTag style={{ display:"flex", justifyContent:'space-around' }} moblieTitle="管理">
                <OwnButton text="編輯" link={`#/User/Update/${value.Userid}`} />
                <OwnButton text="刪除" link={void(0)} Userhandler={()=>{setConfirmShow(true);setDelDataInfo({id:value.Userid,title:value.Title})}} color="red" />
              </TdTag>
            </TrTag>
          ))}
        </tbody>
      </TableTag>
      <Pagination updatedatahandler={GetData} data={data.datas} setshowdata={setData} />
      
      <Confirm yes={()=>{UserDeleteHandler(delDataInfo.id);setConfirmShow(false)}} no={()=>{setConfirmShow(false)}} title={delDataInfo.title} style={{display: confirmShow ? "block" : "none"}} />
    </>
  );
}



export default UserIndex;
