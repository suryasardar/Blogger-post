// Login.js
import React, { useContext, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import google from "../Images/google.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "./InputBox";
import axios from "axios";
import Pageanimation from "../common/Pageanimation";
import { storeInsession } from "../common/session";
import { usercontext } from "../App";

const Login = ({ type }) => {
  const navigate = useNavigate();

  const DetailForm = useRef();
  // const DetailForm = document.querySelector("formElement");

  let { userAuth, setuserAuth } = useContext(usercontext);
  const token = userAuth && userAuth.data && userAuth.data.token;
  console.log(token, "token");

  const userAuthThroughserver = (serverRoute, formData) => {
    axios
      .post("http://localhost:4000/api/user" + serverRoute, formData)
      .then((data) => {
        storeInsession("user", JSON.stringify(data));
        setuserAuth(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const Handlesubmit = (e) => {
    e.preventDefault();

    let serverRoute = type === "sign-in" ? "/signin" : "/signup";
    console.log(serverRoute);

    let emailregrex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    let passwordregrex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    let form = new FormData(DetailForm.current);
    let formData = {};
    //it is created because to loop
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { Fullname, Email, Password } = formData;

    if (Fullname) {
      //in login the fullname will not be
      if (!formData.Fullname||Fullname.length < 3) {
        return toast.error("full name must be atleast 3 letters long");
      }
    }
    if (!formData.Email) {
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

  if (token) {
    navigate("/");
  }
  return (
    <>
      <Pageanimation keyValue={type}>
        <section className="h-cover flex items-center justify-center">
          <Toaster />
          <form  ref={DetailForm} className="w-[40%] max-w-[400px] ">
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
            {type === "sign-in" ? (
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
    </>
  );
};

export default Login;
