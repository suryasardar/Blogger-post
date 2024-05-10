import React, { useContext } from 'react'
import { EditorContext } from '../pages/Editorpage';

function Tags({ tag }) {
    let {Blogger,Blogger:{tags},setBlogger} = useContext(EditorContext);

    const HandleDelete = () => {
        tags = tags.filter(t => t != tag);
        setBlogger({...Blogger,tags})
 }

  return (
      <div className='relative pt-2  mt-2 mr-2 px-4  bg-grey rounded-full inline-block hover:bg-opacity-50 '>
          <p className='outline-none' contentEditable="true">{tag}</p>
          <button className='mt-[2px] rounded-full absolute right-1 top-1/2  -translate-y-1/2'
          onClick={HandleDelete}>
          <i className="fi fi-rr-cross text-sm pointer-events-none"></i>
          </button>
      </div>
  )
}

export default Tags;