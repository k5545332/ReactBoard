import styled from 'styled-components';

const TrTag = styled.tr`
  border-bottom: 1px dotted #000;
  @media (max-width:768px){
    display: block;
    margin-bottom: 20px;
    &:nth-child(odd){
      background: rgba(200,200,200,0.5);
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
