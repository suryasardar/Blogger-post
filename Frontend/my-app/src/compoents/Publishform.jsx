import React, { useContext } from "react";
import PageAnimation from "../common/Pageanimation";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/Editorpage";
import Tags from "./Tags";

const Publishform = () => {
  const {
    Blogger,
    Blogger: { title, banner, content, tags, des },
    seteditorstate,
    setBlogger,
  } = useContext(EditorContext);

  let character = 200;
  let taglimit = 10;
  const Handlechange=(e) => {
    let input = e.target;
    setBlogger({...Blogger,title:input.value})
  }
  const handleclose = () => {
    seteditorstate("editor");
  };
  const handlechangenumber = (e) => {
    let input = e.target;
    setBlogger({...Blogger,des:input.value})
  }
  const Handletitlekeydown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  const Handletags = (e) => {
    if (e.keyCode == 13 || e.keyCode == 188) {
      e.preventDefault();
      let val = e.target.value;
      console.log(val);
      if (tags.length < taglimit) {
        if (!tags.includes(val)&& val.length) {
          setBlogger({ ...Blogger, tags: [...tags, val] })
        }
      } else {
        toast.error("You can add max limit")
      }
      e.target.value = "";
    }
  }

  return (
    <PageAnimation>
      <section className="w-screen min-h-screen grid item-center lg:grid-cols-2 py-16 lg:gap-4">
        <Toaster />
        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
          onClick={handleclose}
        >
          <i className="fi fi-rr-cross"></i>
        </button>


        <div className= "mt-24">
          <p className="text-dark-grey mb-1">preview</p>
          <div className="w-full aspect-video   rounded-lg overflow-hidden bg-grey mt-4">
            <img src={banner} />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}k
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {des}
          </p>
        </div>
        

          <div className="border-grey lg:border-1 lg:pl-8 mt-24">
            <p className="text-dark-grey mb-2 mt-9"> Blog Title</p>
            <input type="text" placeholder="Blog Title" defaultValue={title} className="input-box pl-4"  onChange={Handlechange}/>
            <p className="text-dark-grey mb-2 mt-9">Short Description about your Blog</p>
             
            <textarea
              maxLength={character}
              defaultValue={des}
              className="h-40 resize-none leading-7 input-box pl-4"
              onChange={handlechangenumber}
              onKeyDown={Handletitlekeydown}
            >
            </textarea>
            <p className="mt-1 text-dark-grey text-sm text-right">{character - des.length} characters left</p>
            <p  className="text-dark-grey mb-2 mt-9">Topics-(Helps in searching and ranking your post)</p>
            <div className="relative input-box bg-white pl-2 py-2 pb-4">
              <input type="text" placeholder="Topic" className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white "  onKeyDown={Handletags}/>
              {/* <Tags tag="testing tag"/> */}
              {
                tags.map((val,i) => {
                 return <Tags tag={val} tagindex={i} key={i}/>
                })
              }
            </div>
            <p className="mt-1 mb-4 text-dark-grey text-right">{taglimit - tags.length}</p>
            <button className="btn-dark px-8 ">Publish</button>
          
        </div>

      </section>
    </PageAnimation>
  );
};

export default Publishform;
