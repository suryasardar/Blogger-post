import React, { useState } from "react";

function Input({ name, type, id, value, placeholder, icon }) {
    const [passvisibility, setpassvisibility] = useState(false);

  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={type=="Password" ? passvisibility ?"text":"password":type}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="input-box"
      />
      <i className={"fi " + icon + " input-icon"}></i>

      {
        type === "Password" ? 
          <i className={"fi fi-rr-eye"+ (!passvisibility ? "-crossed" : "")+ " input-icon left-auto right-4 cursor-pointer"} onClick={()=>{setpassvisibility(value=>!value)}}></i>
         : 
          ""
        
      }
    </div>
  );
}

export default Input;
