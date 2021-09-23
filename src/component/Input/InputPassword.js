import InputDiv from './InputDiv';

function InputPassword(props) {
  let {title,id,name,value,setData,...rest} = props;

  const handleChange = (e)=>{
    setData((preState)=>({
      ...preState,
      [name]:e.target.value,
    }));
  }

  return (
    <InputDiv id={id} title={title} {...rest}>
      <input id={id} name={name} type="password" onChange={handleChange} value={value} />
    </InputDiv>
  );
}

export default InputPassword;
