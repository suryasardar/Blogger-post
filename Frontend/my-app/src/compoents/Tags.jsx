import React, { useContext } from 'react'
import { EditorContext } from '../pages/Editorpage';

function Tags({ tag,tagindex }) {
    let {Blogger,Blogger:{tags},setBlogger} = useContext(EditorContext);

    const HandleTagedit = (e) => {
        if (e.keyCode == 13 || e.keyCode== 188) {
            e.preventDefault();
            let currentTag = e.target.innerText;
            tags[tagindex] = currentTag;
            setBlogger({ ...Blogger, tags });
            e.target.setAttribute("contentEditable", false);
    }
}
    const addEditable = (e) => {
        e.target.setAttribute("contentEditable", true);
        e.target.focus();
}
    
    const HandleDelete = () => {
        tags = tags.filter(t => t != tag);
        setBlogger({...Blogger,tags})
 }

  return (
      <div className='relative pt-2  mt-2 mr-2 px-4  bg-grey rounded-full inline-block hover:bg-opacity-50 '>
          <p className='outline-none' onKeyDown={HandleTagedit}  onClick={addEditable}>{tag}</p>
          <button className='mt-[2px] rounded-full absolute right-1 top-1/2  -translate-y-1/2'
          onClick={HandleDelete}>
          <i className="fi fi-rr-cross text-sm pointer-events-none"></i>
          </button>
      </div>
  )
}

export default Tags;