import React, { useContext, useState } from 'react'
import { usercontext } from '../App';
import { useNavigate } from "react-router-dom";
import Blogeditor from '../compoents/ Blogeditor';
import Publishform from '../compoents/Publishform';


const Editorpage = () => {
  
  const [editorstate, seteditorstate] = useState("editor");
    const Naviagate = useNavigate();
    const { userAuth } = useContext(usercontext);
    const token = userAuth && userAuth.data && userAuth.data.token;
  console.log(token, "surya");
  
  return (
    token==null ? Naviagate("/login"):editorstate == 'editor' ? <Blogeditor/>:<Publishform/>
  )
   
}

export default Editorpage;