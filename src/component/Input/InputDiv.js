import styled from 'styled-components';
import { Col } from 'react-grid-system';

const NewCol = styled(Col)`
  margin-bottom:30px;
  label{
    font-weight:bolder;
  }
  > div{
    margin-top:10px;
  }
  input[type="text"],
  input[type="number"],
  input[type="email"],
  input[type="password"],
  select{
    width:100%;
    height:50px;
    border-radius:5px;
    border:1px solid #aaa;
    box-shadow:2px 2px 2px #ebebeb;
    padding-left:10px;
  }
  textarea{
    max-width:100%;
    min-width:100%;
    min-height:200px;
    border-radius:5px;
    border:1px solid #aaa;
    box-shadow:2px 2px 2px #ebebeb;
    padding-left:10px;
  }
`;

function InputDiv(props) {
  let {title,id,...rest} = props;

  return (
    <NewCol {...rest}>
      <label htmlFor={id}>{title}</label>
      <div>
        {props.children}
      </div>
    </NewCol>
  );
}

export default InputDiv;
