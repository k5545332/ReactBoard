import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Row, Col} from 'react-grid-system';
import '../component/Input/ckeditorContextStyle.css';


const NewRow = styled(Row)`
  margin-bottom: 50px;
`;

const TitleTag = styled.p`
  font-size: 36px;
  span{
    font-size: 36px;
    color: #4782DB;
  }
`;

const PTag = styled.p`
  font-size: 20px;
`;

const ContentDesTag = styled.p`
  border: 1px solid #999;
  padding: 20px;
  border-radius:15px;
  white-space: pre-line;
  min-height:200px;
`;

function EventDetail(props) {
  const [data, setData] = useState({
    Theme:"",
    Title:"",
    ContentDes:"",
    UserName:"",
    UpdateTime:"",
    Views:""
  });
  const id = props.match.params.id;

  const GetData = useCallback(()=>{
    const GetEventData = ()=>{
      const url = `https://littlewhalecoreapiboard.herokuapp.com/event/detail/${id}`;
      fetch(url,
        {
          method: "GET",
        })
      .then((response)=>{
        var apidata = response.json();
        return apidata;
      })
      .then((apidata)=>{
        setData(apidata);
      })
    }
    GetEventData();
  },[])
  
  useEffect(() => {
    GetData();
  },[GetData])

  return (
    <>
      <NewRow nogutter={true}>
        <Col lg={12}>
          <TitleTag><span>標題 : </span> {data.Title}</TitleTag>
        </Col>
      </NewRow>
      <NewRow nogutter={true}>
        <Col lg={3}>
          <PTag>分類 : {data.Theme}</PTag>
        </Col>
        <Col lg={3}>
          <PTag>作者 : {data.UserName}</PTag>
        </Col>
        <Col lg={3}>
          <PTag>更新時間 : {data.UpdateTime}</PTag>
        </Col>
        <Col lg={3}>
          <PTag>瀏覽數:{data.Views}</PTag>
        </Col>
      </NewRow>
      <NewRow nogutter={true}>
        <Col lg={12}>
          <ContentDesTag dangerouslySetInnerHTML={{__html:data.ContentDes}} className="ck-content"/>
        </Col>
      </NewRow>
    </>
  );
}



export default EventDetail;
