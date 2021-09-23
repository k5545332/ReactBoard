import InputDiv from './InputDiv';

function InputText(props) {
  let {title,id,name,value,setData,...rest} = props;

  const handleChange = (e)=>{
    setData((preState)=>({
      ...preState,
      [name]:e.target.value,
    }));
  }

  return (
    <InputDiv id={id} title={title} {...rest}>
      <input id={id} name={name} type="text" onChange={handleChange} value={value} />
    </InputDiv>
  );
}

export default InputText;
