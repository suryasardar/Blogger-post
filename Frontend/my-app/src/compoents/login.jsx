// Login.js
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import google from "../Images/google.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "./InputBox";

const Login = ({ type }) => {
  // const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!email.trim() || !password.trim()) {
  //     setError("All fields are required");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const response = await axios.post(
  //       "http://localhost:4000/api/user/login",
  //       {
  //         email: email.trim(),
  //         password: password.trim(),
  //       }
  //     );
  //     localStorage.setItem("token", response.data.token);

  //     console.log("Login successful:", response.data);
  //     setLoading(false);
  //     navigate("/");
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //     setLoading(false);
  //     setError("Password or email is incorrect");
  //   }
  // };

  return (
    <section className="h-cover flex items-center justify-center">
      <form className="w-[40%] max-w-[400px] ">
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
        <button className="btn-dark center mt-14" type="submit">
          {type.replace("-", " ")}
        </button>

        <div className="relative w-full  flex items-center gap-2 my-7 opacity-10 uppercase text-black font-bold">
          <hr className="w-1/2 border-b-red" />
          <p className=" text-black">or</p>
          <hr className="w-1/2 border-black" />
        </div>
        <button className="btn-dark center flex items-center justify-center gap-3 w-[80%]">
          <img src={google} alt="google" className="w-5" />
          Continue with Google
        </button>
        {type == "sign-in" ? 
          <p className=" text-center text-dark-grey mt-3">
            
            Dont have an account ?
            <Link to="/signup" className="text-black">Sign Up Here</Link>
          </p>
         : 
          <p className="text-center text-dark-grey mt-3">
          3
            Already a member ?
            <Link to="/login" className="text-black">Sign In Here</Link>
          </p>
        }
      </form>
    </section>
  );
};

export default Login;
