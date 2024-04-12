import React, { useRef } from "react";
import Blog from "../Images/logo.png";
import { Link } from "react-router-dom";
import PageAnimation from "../common/Pageanimation";
import defaultimage from "../Images/blogbanner.jpg"
import aws from "../common/aws";
import toast from "react-hot-toast";


const Blogeditor = () => {
  let blogbanner = useRef();
    const Handlechange = (e) => {
        let imgs = e.target.files[0];
      if (imgs){
        let loadingToast=toast.loading("uploading..")
        aws(imgs).then((url) => {
          if (url) {
            toast.dismiss(loadingToast)
            blogbanner.current.src = url;
          }
        })
      }

    }
  return (
    <>
      <nav className="navbar">
        <Link className=" ml-1 flex-none w-10">
          <img src={Blog} />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {" "}
          New Blog
        </p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2 ">publish</button>
          <button className="btn-light py-2 "> save Draft</button>
        </div>
          </nav>
          <PageAnimation>
              <section>
                  <div className="max-auto  max-w-[900px] w-full">
                      <div className=" relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
                          <label htmlFor="uploadBanner" className="h-full">
                <img ref={blogbanner} src={defaultimage}  alt="BlogBanner" className="z-20 "/>
                              <input
                                  type="file"
                                  id="uploadBanner"
                                  accept=".png,.jpeg,.jpg"
                                  hidden
                                  onChange={Handlechange}
                              />
                          </label>
                      </div>
                  </div>
          </section>
          </PageAnimation>  
    </>
  );
};

export default Blogeditor;
