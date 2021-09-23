import React from 'react';
import styled from 'styled-components';
import OwnButton from '../Button/OwnButton';

const ConfirmDiv = styled.div`
  width: 500px;
  max-width: 90%;
  background: #fff;
  border: 1px dashed #000;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 15px;
  box-shadow: 3px 2px 0px #ccc;
  >p{
    margin-bottom: 20px;
    line-height: 1.5;
  }
  >div{
    display: flex;
    justify-content: flex-end;
    text-align: center;

    a{
      margin: 0 10px;
    }
  }
`;

function Confirm(props) {
  const{ yes,no,title,...rest } = props;
  return (
    <ConfirmDiv {...rest}>
      <p>您確定要刪除</p>
      <p>{title}</p>
      <div>
        <OwnButton text="確認" link={void(0)} color="red" eventhandler={yes} />
        <OwnButton text="取消" link={void(0)} eventhandler={no} />
      </div>
    </ConfirmDiv>
  );
}

export default Confirm;
