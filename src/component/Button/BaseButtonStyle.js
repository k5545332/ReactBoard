import {css} from 'styled-components';

const BaseButtonStyle = css`
width: 80px;
height: 40px;
background: #1F7CE9;
border: none;
border-radius: 5px;
font-size: 18px;
cursor: pointer;
font-weight: 700;
box-shadow: 2px 2px 2px 1px rgb(0 0 0 / 30%);
display: flex;
justify-content: center;
align-items: center;
margin: 20px 0;
color: #fff;
:hover{
  transform: translate(1px,1px);
  box-shadow:1px 1px 2px 1px rgba(0, 0, 0, 0.3);
}
`;

export default BaseButtonStyle;
