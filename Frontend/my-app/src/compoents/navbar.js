 // Navbar.js
// Navbar.js
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 24px;
`;

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const Li = styled.li`
  margin-right: 20px;
`;

const URL = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Logo>Blog Logo</Logo>
      <Ul>
        <Li>
          <Link to="/login">Login</Link>
        </Li>
        <Li>
          <Link to="/blog">Blog</Link>
        </Li>
        <Li>
          <Link to="/signup">Signup</Link>
        </Li>
      </Ul>
    </Nav>
  );
};

export default Navbar;
