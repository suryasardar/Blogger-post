import React, { useContext } from "react";
import PageAnimation from "../common/Pageanimation";
import { Link } from "react-router-dom";
import { usercontext } from "../App";
 import { removeInsession } from "../common/session";


function Naviagation() {
  const { userAuth,setuserAuth } = useContext(usercontext);
  const username = userAuth && userAuth.data && userAuth.data.username;

  const Signoutuser = () => {
    removeInsession("user");
    const token=userAuth && userAuth.data && userAuth.data.token;
    setuserAuth(null);
  }
  return (
    <PageAnimation
      className="absolute right-0  z-50"
      transition={{ duration: 0.2 }}
    >
      <div className=" bg-white  absolute right-0 border border-grey w-60   duration-200">
        <Link to="/editor" className="flex   link gap-2 pt-2 pb-1 pl-0  ">
          <i className="fi fi-rr-file-edit"></i>
          <p>write</p>
        </Link>
        <Link to={`/user/${username}`} className="link py-2 pl-0 ">
          profile
        </Link>
        <Link to="/dashboard/blogs" className="link py-2 pl-0">
          <p>Dashboard</p>
        </Link>
        <Link to="settings" className="link py-2 pl-0">
          <p>Settings</p>
        </Link>
        <span className="absolte border-t border-grey  w-[100%]"></span>
        <button className="text-left w-full py-2 hover:bg-grey" onClick={Signoutuser}>
          <h6 className="font-bold text-xl mg-1">Signout</h6>
          <p>@{username}</p>
        </button>
      </div>
    </PageAnimation>
  );
}

export default Naviagation;
