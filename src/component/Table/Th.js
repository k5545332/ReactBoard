import styled from 'styled-components';

const ThTag = styled.th`
  vertical-align: middle;
  padding: 20px 0 20px 10px;
  font-weight: bolder;
  text-align: start;
  color: #fff;
  @media (max-width:768px){
    display: block;
  }
`;

function Th(props) {
  const { ...rest } = props
  return (
    <ThTag {...rest}>
      {props.children}
    </ThTag>
  );
}

export default Th;
