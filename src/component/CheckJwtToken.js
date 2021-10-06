import jwt_decode from "jwt-decode";

const CheckJwtToken = ()=>{
  const Token = localStorage.getItem("LoginToken");
  if (Token!=null) {
    var decoded = jwt_decode(Token);
    var expire = decoded.exp*1000;
    if (expire <= Date.now()) {
      localStorage.removeItem("LoginToken");
    }
  }
}

export default CheckJwtToken;