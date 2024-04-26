import React, { useContext } from "react";
import PageAnimation from "../common/Pageanimation";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/Editorpage";

const Publishform = () => {
  const {
    Blogger,
    Blogger: { title, banner, content, tags, des },
    seteditorstate,
    setBlogger,
  } = useContext(EditorContext);

  const Handlechange=(e) => {
    let input = e.target;
    setBlogger({...Blogger,title:input.value})
  }
  const handleclose = () => {
    seteditorstate("editor");
  };
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
        <div className="max-w-[550px] center">
          <p className="text-dark-grey mb-1">preview</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={banner} />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {des}
          </p>
          <div className="border-grey lg:border-1 lg:pl-8">
            <p className="text-dark-grey mb-2 mt-9"> Blog Title</p>
            <input type="text" placeholder="Blog Title" defaultValue={title} className="input-box pl-4"  onChange={Handlechange}/>
            <p className="text-dark-grey mb-2 mt-9">Short Description about your Blog</p>
             
          </div>
        </div>
      </section>
    </PageAnimation>
  );
};

export default Publishform;
