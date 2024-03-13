// Login.js
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";
import Input from "./InputBox";

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// const LoginForm = styled.form`
//   background-color: #f9f9f9;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;

// const InputGroup = styled.div`
//   margin-bottom: 20px;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 5px;
//   font-weight: bold;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

const Login = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        {
          email: email.trim(),
          password: password.trim(),
        }
      );
      localStorage.setItem("token", response.data.token);

      console.log("Login successful:", response.data);
      setLoading(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error logging in:", error);
      setLoading(false);
      setError("Password or email is incorrect");
    }
  };
console.log(type,"ok");
  return (
    <section className="h-cover flex items-center justify-center">
      <form className="w-[40%] max-w-[400px] ">
        <h1 className="text-4xl font-gelasio capitalize text-center mb-5">
          {type === "sign-in" ? "Welcome Back" : "Join Us Today"}
        </h1>
        {
          type !=="sign-in"? <Input name='Fullname' type='text' placeholder='Fullname' icon='fi-rr-user'/>: ""
        }

        <Input name='Email' type='email' placeholder='Email' icon='fi-rr-envelope' />
        <Input name='Password' type='Password' placeholder='Password' icon='fi-rr-lock' />
        <button className="btn-dark center mt-14" type="submit">{type.replace("-"," ")}</button>
      </form>
    </section>

    // <Container>
    //   <LoginForm onSubmit={handleSubmit}>
    //     <h2>Login</h2>
    //     <InputGroup>
    //       <Label>Email</Label>
    //       <Input
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </InputGroup>
    //     <InputGroup>
    //       <Label>Password</Label>
    //       <Input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </InputGroup>
    //     <Button type="submit" disabled={loading}>
    //       {loading && <Spinner>Loading...</Spinner>}
    //       Login
    //     </Button>
    //     <p style={{ fontWeight: "bold" }}>
    //       Didn't signup<Link to="/signup">click Here</Link>
    //     </p>
    //     {error && <div style={{ color: "red" }}>{error}</div>}
    //   </LoginForm>
    // </Container>
  );
};

export default Login;
