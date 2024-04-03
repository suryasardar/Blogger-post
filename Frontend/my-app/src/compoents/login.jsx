// Login.js
import React, { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import google from "../Images/google.svg";
import { Link} from "react-router-dom";
import Input from "./InputBox";
import Pageanimation from "../common/Pageanimation";

const Login = ({ type }) => {
  const DetailForm = useRef();


const userAuthThroughserver = (serverRoute, formData) => {
  
}



  const Handlesubmit = (e) => {
    e.preventDefault();

   let serverRoute=type=="sign-in" ? "/signin":"/signup"

    let emailregrex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let passwordregrex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    let form = new FormData(DetailForm.current); 
    let formData = {};
    //it is created because to loop
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
    console.log(formData);

    let { Fullname, Email, Password } = formData;
    
     

    if (Fullname) {
      //in login the fullname will not be
      if (Fullname.length < 3) {
        return toast.error("full name must be atleast 3 letters long");
      }
    }
    if (!Email) {
      return toast.error("Enter Email");
    }
    if (!emailregrex.test(Email)) {
      return toast.error("Email is Invalid");
    }
    if (!passwordregrex.test(Password)) {
      return toast.error(
        "Password must be 6 to 20 characters long with a number,1 lowercase and 1 uppercase letters"
      );
    }
    userAuthThroughserver(serverRoute, formData);
  };
  return (
    <Pageanimation keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form ref={DetailForm} className="w-[40%] max-w-[400px] ">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-5">
            {type === "sign-in" ? "Welcome Back" : "Join Us Today"}
          </h1>
          {type !== "sign-in" ? (
            <Input
              name="Fullname"
              type="text"
              placeholder="Fullname"
              icon="fi-rr-user"
            />
          ) : (
            ""
          )}

          <Input
            name="Email"
            type="email"
            placeholder="Email"
            icon="fi-rr-envelope"
          />
          <Input
            name="Password"
            type="Password"
            placeholder="Password"
            icon="fi-rr-lock"
          />
          <button
            onClick={Handlesubmit}
            className="btn-dark center mt-6"
            type="submit"
          >
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full  flex items-center gap-2 my-3 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 my-1 border-b-red" />
            <p className=" text-black  my-1">or</p>
            <hr className="w-1/2 my-1 border-black" />
          </div>
          <button className="btn-dark center flex items-center justify-center gap-3   w-[80%]">
            <img src={google} alt="google" className="w-6" />
            Continue with Google
          </button>
          {type == "sign-in" ? (
            <p className=" text-center text-dark-grey mt-3">
              Dont have an account ?
              <Link to="/signup" className="text-black">
                Sign Up Here
              </Link>
            </p>
          ) : (
            <p className="text-center text-dark-grey mt-3">
              Already a member ?
              <Link to="/login" className="text-black">
                Sign In Here
              </Link>
            </p>
          )}
        </form>
      </section>
    </Pageanimation>
  );
};

export default Login;
