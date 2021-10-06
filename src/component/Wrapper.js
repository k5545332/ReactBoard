import styled from 'styled-components';
import React from 'react';
import NavBar from './Nav';
import Header from './Header';
import { ScreenClassProvider , Container , Row , Col } from 'react-grid-system';
import bg2 from '../img/oceanbg.jpg';

const NewContainer = styled(Container)`
  background: url(${bg2}) repeat 0 0 / 100%;
`;

const Content = styled.div`
  padding:20px;
  box-shadow: 3px 3px 3px #ccc;
  min-height:500px;
  background: rgba(255,255,255,0.9);

  @media (max-width:768px){
    background: url(${bg2}) repeat 0 0 / 100%;
    >div{
      background: rgba(255,255,255,0.9);
      border-radius: 15px;
      padding:10px;
    }
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
              <div>
                <a href='https://.pngtree.com/free-backgrounds' style={{display:'none'}}>來自的免費背景照片 .pngtree.com/</a>
                {props.children}
              </div>
            </Content>
          </Col>
        </Row>
      </NewContainer>
    </ScreenClassProvider>
  );
}

export default Wrapper;
