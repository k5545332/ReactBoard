import InputDiv from './InputDiv';

function InputSelect(props) {
  let {datas,title,id,name,value,setData,...rest} = props;

  const handleChange = (e)=>{
    setData((preState)=>({
      ...preState,
      [name]:parseInt(e.target.value,10),
    }));
  }

  return (
    <InputDiv id={id} title={title} {...rest}>
      <select id={id} name={name} onChange={handleChange} defaultValue={"Default"} value={value}>
        <option value="Default" key="" disabled style={{ display:"none" }}>請選擇</option>
        {datas.map( item =>(
          <option value={item.id} key={item.id} style={{ fontSize:"20px" }}>{item.name}</option>
        ))}
      </select>
    </InputDiv>
  );
}

export default InputSelect;
