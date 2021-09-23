import styled from 'styled-components';
import React from 'react';
import NavBar from './Nav';
import Header from './Header';
import { ScreenClassProvider , Container , Row , Col } from 'react-grid-system';
import bg2 from '../img/bg02.png';

const NewContainer = styled(Container)`
  background: url(${bg2}) repeat 0 0 / 100%;
`;

const Content = styled.div`
  padding:20px;
  background:#fff;
  box-shadow: 10px 5px 5px #ccc;
  min-height:500px;
  @media (max-width:768px){
    background: url(${bg2}) repeat 0 0 / 100%;
  }
`;


function Wrapper(props) {
  return (
    <ScreenClassProvider>
      <NewContainer fluid style={{padding:0}}>
        <Row nogutter>
          <Col lg={12}>
            <Header />
          </Col>
        </Row>
        <Row justify="center" nogutter style={{marginTop:"-100px"}}>
          <Col lg={10}>
            <NavBar />
            <Content>
              {props.children}
            </Content>
          </Col>
        </Row>
      </NewContainer>
    </ScreenClassProvider>
  );
}

export default Wrapper;
