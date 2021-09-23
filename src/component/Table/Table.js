import styled from 'styled-components';

const TableTag = styled.table`
  width:100%;
`;

function ArticalTable(props) {
  const { ...rest } = props
  return (
    <TableTag {...rest}>
      {props.children}
    </TableTag>
  );
}

export default ArticalTable;
