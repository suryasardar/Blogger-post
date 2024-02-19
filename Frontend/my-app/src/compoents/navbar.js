
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import { DarkModeSwitch } from 'react-toggle-dark-mode';

const Nav = styled.nav`
  background-color: #141010;
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
  & > a {
    /* Select the anchor tag inside Li */
    color: white; /* Set color to white */
    text-decoration: none;
  }
`;

const Navbar = () => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogged(true);
    }
  }, []);

  const handlelocal = () => {
    localStorage.removeItem("token");
    setLogged(false);
  };

  return (
    <Nav>
      <Logo>Blog Logo</Logo>
      <Ul>
        <Li>
          <Link to="/blog" style={{ color: "white" }}>
            CreateBlog
          </Link>
        </Li>
        {logged ? (
          <Li>
            <div onClick={handlelocal}>
              <Link
                to="/login"
                style={{
                  color: "white",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Logout
              </Link>
            </div>
          </Li>
        ) : (
            <Li>
              {/* <div onClick={handlelogout}> */}
            <Link to="/login" style={{ color: "white" }}>
              Sign In
            </Link>
              {/* </div> */}
          </Li>
        )}
      </Ul>
    </Nav>
  );
};

export default Navbar;
