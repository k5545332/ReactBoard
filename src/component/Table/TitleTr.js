import styled from 'styled-components';

const TitleTrTag = styled.tr`
  background:#4683de;
  @media (max-width:768px){
    display: none;
  }
`;

function TitleTr(props) {
  const { ...rest } = props
  return (
    <TitleTrTag {...rest}>
      {props.children}
    </TitleTrTag>
  );
}

export default TitleTr;
