import React, { createContext, useContext, useState } from 'react'
import { usercontext } from '../App';
import { useNavigate } from "react-router-dom";
import Blogeditor from '../compoents/ Blogeditor';
import Publishform from '../compoents/Publishform';

 export const EditorContext = createContext({});

const Editorpage = () => {
  const Blogstructure = {
    title: '',
    banner: '',
    content: '',
    tags: [],
    des: '',
    author:{personal_info:{}}
  }

  const [Blogger, setBlogger] = useState(Blogstructure);
  const [editorstate, seteditorstate] = useState("editor");
  const [textEditor, settextEditor] = useState({ isReady: false});

    const Naviagate = useNavigate();
    const { userAuth } = useContext(usercontext);
    const token = userAuth && userAuth.data && userAuth.data.token;
  console.log(token, "surya");
  
  return (
    <EditorContext.Provider value={{Blogger,setBlogger,editorstate,seteditorstate,textEditor,settextEditor}}>

      {token === null ? Naviagate("/login") : editorstate === 'editor' ? <Blogeditor /> : <Publishform />}
    </EditorContext.Provider>
  )
   
}

export default Editorpage;