import React,{useContext} from 'react'
import { Button} from 'antd';
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/user/UserContext';
const Logout = () => {
  const navigate = useNavigate();
  const {logout} = useContext(UserContext);

  const handleLogout = () =>{
    logout();
    navigate("/signin");
  }
  return (
    <div>
      <Button type='button' onClick={handleLogout}> Salir del sistema</Button> 
    </div>
  )
}

export default Logout;