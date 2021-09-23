import styled from 'styled-components';
import React from 'react';
import bg1 from '../img/bg01.jpg';
// import {Link} from "react-router-dom";

const HeaderTag = styled.header`
  background: url(${bg1}) no-repeat 0 0 / 100%;;
  height: 300px;
  border-bottom: 10px solid #1F7CE9;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    background-size: auto;
    height: 250px;
  }
  h1{
    font-size: 72px;
    margin-top:-50px;
    @media (max-width: 768px) {
      font-size: 36px;
    }
  }
`;

function Header() {
  return (
    <HeaderTag>
      <h1>
        Little Whale's 佈告欄
      </h1>
    </HeaderTag>
  );
}

export default Header;
