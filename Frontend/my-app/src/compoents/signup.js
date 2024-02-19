// Signup.js
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

const SignupForm = styled.form`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const FormGroup = styled.div`
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

const SIGNUP = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Initialize error states
  const history = useNavigate(); // Get the history object from React Router

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username||!email||!password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/user/signup", {
        username,
        email,
        password,
      });
      console.log("Signup successful:", response.data);
      // if (response.ok) {
        history('/login');
      // }

      // Add logic to handle successful signup (e.g., redirect to another page)
    } catch (error) {
      console.error("Error signing up:", error);
      // setError(error.response.data.message); // Set error state
      // Add logic to handle signup error (e.g., display error message)
    }
  };

  return (
    <Container>
      <SignupForm onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <FormGroup>
          <Label>Username</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" >Sign Up</Button>
        {error && <div style={{ color: "red" }}>{error}</div>}

       </SignupForm>
    </Container>
  );
};

export default SIGNUP;
