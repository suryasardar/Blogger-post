// Login.js
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

//   const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/user/login", {
        email,
        password,
      });
        if (!response.data) {
            navigate('/');
        }
      console.log("Login successful:", response.data);
      // Add logic to handle successful login (e.g., redirect to another page)
    } catch (error) {
      console.error("Error logging in:", error);
    //   setError(error.response.data.message);
      // Add logic to handle login error (e.g., display error message)
    }
  };
  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <InputGroup>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <Button type="submit">Login</Button>
      </LoginForm>
    </Container>
  );
};

export default Login;
