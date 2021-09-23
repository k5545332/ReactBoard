import InputDiv from './InputDiv';

function InputTextArea(props) {
  let {title,id,name,value,setData,...rest} = props;

  const handleChange = (e)=>{
    setData((preState)=>({
      ...preState,
      [name]:e.target.value,
    }));
  }

  return (
    <InputDiv id={id} title={title} {...rest}>
      <textarea cols="20" id={id} name={name} onChange={handleChange} value={value}></textarea>
    </InputDiv>
  );
}

export default InputTextArea;
