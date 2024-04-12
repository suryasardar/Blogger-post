import React, { useContext, useEffect } from "react";
import Blog from "../Images/logo.png";
import { Link } from "react-router-dom";
import PageAnimation from "../common/Pageanimation";
import defaultimage from "../Images/blogbanner.jpg";
import aws from "../common/aws";
import toast from "react-hot-toast";
import EditorJS from '@editorjs/editorjs';
import { EditorContext } from "../pages/Editorpage";
import { tools } from "./tool";

const Blogeditor = () => {
  let {
    Blogger,
    Blogger: { title, banner, content, tags, des },
    setBlogger,
  } = useContext(EditorContext);
  // console.log(blogger);

  useEffect(() => {
    let editor = new EditorJS({
      holderId: "textEditor",
      data: '',
      tools:tools,
      placeholder:"lets write an awesome story"
    })
  }, [])
  

  const Handletitlekeydown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };


  const Handlechangetext = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlogger({ ...Blogger, title: input.value });
  };


  const Handlechange = (e) => {
    let imgs = e.target.files[0];
    if (imgs) {
      let loadingToast = toast.loading("uploading..");
      aws(imgs)
        .then((url) => {
          if (url) {
            toast.dismiss(loadingToast);
            toast.success("uploaded");
            setBlogger({ ...Blogger, banner: url });
          }
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          return toast.error(err);
        });
    }
  };
  return (
    <>
      <nav className="navbar items-center">
        <Link to="/" className=" ml-1 flex-none w-10">
          <img src={Blog} alt="logo" />
        </Link>

        <div className="flex gap-4 ml-auto">
          <p className="max-md:hidden text-black line-clamp-1 w-full m-2 mr-auto ">
            {" "}
            {title.length ? title : "New Blog"}
          </p>
          <button className="btn-dark py-2 ">publish</button>
          <button className="btn-light py-2 "> save Draft</button>
        </div>
      </nav>
      <PageAnimation>
        <section>
          <div className="max-auto  max-w-[900px] w-full">
            <div className=" relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner" className="h-full">
                <img
                  src={banner ? banner : defaultimage}
                  alt="Blogimg"
                  className="z-20 "
                />
                <input
                  type="file"
                  id="uploadBanner"
                  accept=".png,.jpeg,.jpg"
                  hidden
                  onChange={Handlechange}
                />
              </label>
            </div>
            <textarea
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 resize-none mt-10 outline-none leading-tight placeholder:opacity-40"
              onKeyDown={Handletitlekeydown}
              onChange={Handlechangetext}
            ></textarea>
            <hr className="w-full opacity-10 my-4" />
            <div className="font-gelasio" id="textEditor">

               
            </div>
          </div>
        </section>
      </PageAnimation>
    </>
  );
};

export default Blogeditor;
