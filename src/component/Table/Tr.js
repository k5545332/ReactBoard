import styled from 'styled-components';

const TrTag = styled.tr`
  border-bottom: 1px dotted #000;
  @media (max-width:768px){
    display: block;
    margin-bottom: 20px;
    
    &:nth-child(even){
      background: rgba(255,255,255,0.8);
    }
    &:nth-child(odd){
      background: rgba(244,244,244,0.8);
    }
  }
`;

function Tr(props) {
  const { ...rest } = props
  return (
    <TrTag {...rest}>
      {props.children}
    </TrTag>
  );
}

export default Tr;
