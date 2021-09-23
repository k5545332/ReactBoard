import styled from 'styled-components';
import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import { useLocation} from "react-router";
const NavDiv = styled.nav`
  border: 1px solid #000;
  width: 100%;
  background: #f2efee;
  display: flex;
  align-items: center;
  box-shadow: 10px 5px 5px #ccc;
  >div{
    width: 20%;
    height: 60px;
    border-left: 1px solid #999;
    border-right: 1px solid #999;
    border-bottom: 1px solid #999;
    &:hover{
      background: #1F7CE9;
      position: relative;
      a{
        color: #fff;
      }
      &::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 5px;
        background: rgb(250, 194, 11);
      }
    }
    @media (max-width:768px){
      width: 25%;
    }
  }
  a{
      width: 100%;
      height: 100%;
      font-size: 20px;
      font-weight: bolder;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
    }
    .active{
      background: #1F7CE9;
      position: relative;
      a{
        color: #fff;
      }
      &::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 5px;
        background: rgb(250, 194, 11);
      }
    }
`;

function NavBar() {
  const Token = localStorage.getItem("LoginToken");
  const LogOut = ()=>{
    localStorage.removeItem("LoginToken");
  }

  const [activePage,setActivePage] = useState("");

  const nowpage = useLocation();

  useEffect(()=>{
    setActivePage(nowpage.pathname.split("/")[1]);
  },[nowpage])


  return (
    <NavDiv>
      <div className={activePage === "" ? "active" : ""}>
        <Link to="/">首頁</Link>
      </div>
      {
        Token === ("" || null) ?
        (<></>):
        (
          <>
            <div className={activePage === "Theme" ? "active" : ""}>
              <Link to="/Theme">類別管理</Link>
            </div>
            <div className={activePage === "User" ? "active" : ""}>
              <Link to="/User">人員管理</Link>
            </div>
          </>
        )
      }
      {
        Token === ("" || null) ?
        (
          <div className={activePage === "Login" ? "active" : ""}>
            <Link to="/Login">登入</Link>
          </div>
        )
        :
        (
          <div>
            <Link to="/" onClick={()=>{LogOut();}}>登出</Link>
          </div>
        )
      }
      
    </NavDiv>
  );
}

export default NavBar;
