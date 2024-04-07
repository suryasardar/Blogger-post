import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Blog from "../Images/logo.png";
import { usercontext } from "../App";
import Naviagation from "./Naviagation";
// import { DarkModeSwitch } from 'react-toggle-dark-mode';

const Navbar = () => {
   
  const [navigationopen, navigationclose] = useState(false);
  const [searchvisibility, setsearchvisibility] = useState(false);
  const { userAuth } = useContext(usercontext);
  const token = userAuth && userAuth.data && userAuth.data.token;
  const profile_img = userAuth && userAuth.data && userAuth.data.profile_img;

 

 
  const Handlesidebar = () => {
    navigationclose(currentvalue => !currentvalue);
  }
  const Handleblur = () => {
    setTimeout(() => {
      navigationclose(false);
    }, 200);
     
   }

  return (
    <nav className="navbar">
      <Link to="/" className="flex-none w-10 pl-2">
        <img src={Blog} alt="BLOG" className="w-full" />
      </Link>
      <div
        className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${
          searchvisibility ? "show" : "hide"
        }`}
      >
        <input
          type="text"
          placeholder="search"
          className="w-full md:w-auto bg-grey p-2 pl-6  pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
        />
        <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md-left-5 top-1/2 -translate-y-1/2 text:xl text-dark-grey"></i>
      </div>
      <div className="flex items-center gap-3 md:gap-6 ml-auto mr-3">
        <button
          className="md:hidden bg-grey w-11 h-11 rounded-full flex items-center justify-center"
          onClick={() => {
            setsearchvisibility((currentvalue) => !currentvalue);
          }}
        >
          <i className="fi fi-rr-search text-xl"></i>
        </button>
        
        {token ? (
          <>
            <Link to="">
              <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
              <i class="fi fi-rr-bell text-2xl block mt-1"></i>
              </button>
            </Link>
            <div className="relative" onClick={Handlesidebar} onBlur={Handleblur}>
              <button className="h-12 w-12 mt-2">
              <img src={profile_img}   className=" w-full h-full object-cover rounded-full" />
              </button>
              {
                navigationopen ?<Naviagation/>:""
             }  
            </div>
          </>
        ) : (
          <>
            <Link className="btn-dark py-2" to="/login">
              Sign In
            </Link>
            <Link className="btn-light  py-2 hidden md:block" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
