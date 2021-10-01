import styled from 'styled-components';

const TdTag = styled.td`
  padding: 20px 0 20px 10px;
  @media (max-width:768px){
    display: block;
    padding-left: 100px;
    position: relative;
    border: 1px solid #000;
    border-collapse: separate;
    &::before{
      content: "${props => props.moblieTitle}";
      position: absolute;
      width: 80px;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color:#1F7CE9;
      color:#fff;
      font-weight: bolder;
    }
  }
`;

function Td(props) {
  const { moblieTitle,...rest } = props
  return (
    <TdTag {...rest} moblieTitle={moblieTitle}>
      {props.children}
    </TdTag>
  );
}

export default Td;
