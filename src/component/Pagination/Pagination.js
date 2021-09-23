import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import { useState , useEffect } from 'react';
const MyPagination = styled.div`
  .pagination{
    display: flex;
    padding: 20px 0;
  }
  .previous{
    user-select:none;
  }
  .next{
    user-select:none;
  }
  li{
    list-style: none;
    border: 1px solid #999;
    display: flex;
    justify-content: center;
    align-items: center;
    a{
      padding: 10px 15px;
      cursor: pointer;
    }
  }
  .active{
    background: #1F7CE9;
    a{
      color:#fff;
    }
  }
`;

function Pagination(props) {
  const {updatedatahandler,data,setshowdata, ...rest } = props

  const [pageInfo, setPageInfo] = useState({
    pageRows:5,
    activePage:0
  });

  const PageChangeHandler = (pagedata)=>{
    setPageInfo((preState)=>({
      ...preState,
      activePage:pagedata.selected
    }))
  }
  useEffect(()=>{
    //要先抓資料再篩選資料
    if (pageInfo.activePage === 0) {
      updatedatahandler();
    }

    setshowdata((preState)=>({
      ...preState,
      showdatas: preState.datas.slice((pageInfo.pageRows)*(pageInfo.activePage),(pageInfo.pageRows)*(pageInfo.activePage)+(pageInfo.pageRows))
    }))

  },[pageInfo.activePage])

  useEffect(()=>{
    setshowdata((preState)=>({
      ...preState,
      showdatas: preState.datas.slice((pageInfo.pageRows)*(pageInfo.activePage),(pageInfo.pageRows)*(pageInfo.activePage)+(pageInfo.pageRows))
    }))
  },[data])


  return (
    <MyPagination>
      <ReactPaginate { ...rest }
        containerClassName={'pagination'}
        activeClassName={'active'}
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        pageCount={data.length/pageInfo.pageRows}
        onPageChange={PageChangeHandler}
      />
    </MyPagination>
  );
}

export default Pagination;
