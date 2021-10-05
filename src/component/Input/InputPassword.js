import InputDiv from './InputDiv';

function InputPassword(props) {
  let {title,id,name,value,setData,eventhandler,...rest} = props;

  const handleChange = (e)=>{
    setData((preState)=>({
      ...preState,
      [name]:e.target.value,
    }));
  }
  const handler = (e)=>{
    if(e.key === 'Enter'){
      eventhandler();
    }
  }

  return (
    <InputDiv id={id} title={title} {...rest}>
      <input id={id} name={name} type="password" onChange={handleChange} value={value} onKeyPress={handler}/>
    </InputDiv>
  );
}

export default InputPassword;
