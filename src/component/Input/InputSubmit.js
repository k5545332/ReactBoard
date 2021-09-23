import InputDiv from './InputDiv';
import OwnButton from '../Button/OwnButton';
function InputSubmit(props) {
  let { eventhandler,title } = props;
 
  const handler = ()=>{
    eventhandler();
  }

  return (
    <InputDiv>
      <OwnButton text={title} link={void(0)} color="red" eventhandler={handler} />
    </InputDiv>
  );
}

export default InputSubmit;
