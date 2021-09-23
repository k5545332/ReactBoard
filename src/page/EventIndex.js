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

function EventIndex() {
  const [data, setData] = useState({
    datas:[],
    showdatas:[],
    titles:["主題分類","更新時間","文章標題","作者","點閱數"]
  });

  const [confirmShow, setConfirmShow] = useState(false);
  const [delDataInfo, setDelDataInfo] = useState({
    id:"",
    title:""
  });
  const Token = localStorage.getItem("LoginToken");
  const GetData = useCallback(()=>{
    const GetEventListData = async()=>{
      return new Promise(resolve =>{
        const url = "https://localhost:5001/event/index";
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
          setData((preState)=>({
            ...preState,
            datas:apidata.EventDtos,
          }));
          return resolve();
        })
      })
    }
    GetEventListData();
  },[])

  const EventDeleteHandler = async(id)=>{
    await EventDelete(id);
    await GetData();
  }

  const EventDelete = async(id)=>{
    return new Promise(resolve =>{
      const url = `https://localhost:5001/event/delete/${id}`;
      
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
      {
        Token === ("" || null) ?
        (<></>):
        (
          <OwnButton text="新增文章" link="#/EventAdd" color="red"/>
        )
      }
      <TableTag>
        <tbody>
          <TitleTrTag>
          {
            Token === ("" || null) ?
            (<></>):
            (
              <ThTag>
                啟用
              </ThTag>
            )
          }
          {data.titles.map(value=>(
            <ThTag key={value}>
            {value}
            </ThTag>
          ))}
          {
            Token === ("" || null) ?
            (<></>):
            (
              <ThTag style={option}>
                管理
              </ThTag>
            )
          }
          </TitleTrTag>
          
          {data.showdatas.map(value =>(
            <TrTag key={value.Eventid}>
              {
                Token === ("" || null) ?
                (<></>):
                (
                  <TdTag moblieTitle="啟用">
                    {value.Enabled ? "☑" : "☒"}
                  </TdTag>
                )
              }
              <TdTag moblieTitle={data.titles[0]}>
                {value.Theme}
              </TdTag>
              <TdTag moblieTitle={data.titles[1]}>
                {value.UpdateTime}
              </TdTag>
              <TdTag moblieTitle={data.titles[2]}>
                <Link to={`/EventDetail/${value.Eventid}`}>{value.Title}</Link>
              </TdTag>
              <TdTag moblieTitle={data.titles[3]}>
                {value.UserName}
              </TdTag>
              <TdTag moblieTitle={data.titles[4]}>
                {value.Views}
              </TdTag>
              {
                Token === ("" || null) ?
                (<></>):
                (
                  <TdTag style={{ display:"flex", justifyContent:'space-around' }} moblieTitle="管理">
                    <OwnButton text="編輯" link={`#/EventUpdate/${value.Eventid}`} />
                    <OwnButton text="刪除" link={void(0)} eventhandler={()=>{setConfirmShow(true);setDelDataInfo({id:value.Eventid,title:value.Title})}} color="red" />
                  </TdTag>
                )
              }
            </TrTag>
          ))}
        </tbody>
      </TableTag>
      <Pagination updatedatahandler={GetData} data={data.datas} setshowdata={setData} />
      
      <Confirm yes={()=>{EventDeleteHandler(delDataInfo.id);setConfirmShow(false)}} no={()=>{setConfirmShow(false)}} title={delDataInfo.title} style={{display: confirmShow ? "block" : "none"}} />
    </>
  );
}



export default EventIndex;
