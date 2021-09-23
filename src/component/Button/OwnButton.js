import React from 'react';
import styled from 'styled-components';
import BaseButtonStyle from './BaseButtonStyle';

const OwnButtonTag = styled.a`
  ${BaseButtonStyle}
  background-color: ${props => props.color === 'red' ? '#f00' : ''};
`;

function OwnButton(props) {
  let {text,link,eventhandler} = props;
  return <OwnButtonTag href={link} color={props.color} onClick={eventhandler}>{text}</OwnButtonTag>;
}

export default OwnButton;
