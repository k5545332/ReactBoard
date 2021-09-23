import InputDiv from './InputDiv';

function InputEnabled(props) {
  let {title,id,name,value,setData,...rest} = props;

  const handleChange = (e)=>{
    setData((preState)=>({
      ...preState,
      [name]:e.target.checked,
    }));
  }

  return (
    <InputDiv id={id} title={title} {...rest} style={{display:'flex',alignItems:"center"}}>
      <input name={name} type="checkbox" onChange={handleChange} checked={value} />
    </InputDiv>
  );
}

export default InputEnabled;
