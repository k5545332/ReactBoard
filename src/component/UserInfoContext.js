import { createContext, useState ,} from 'react';

export const UserInfoContext = createContext({
  jwtToken:"",
  setJwtToken:()=>{}
});

const UserInfoContextProvider = (props)=>{
  const [Token,setToken] = useState()

  return (
    <UserInfoContext.Provider
    value={{Token,setToken}}
    >
      {props.children}
    </UserInfoContext.Provider>
  )
}
export default UserInfoContextProvider