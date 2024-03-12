
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Blog from "../Images/logo.png"
// import { DarkModeSwitch } from 'react-toggle-dark-mode';
 

const Navbar = () => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogged(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogged(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className=" w-10"  >
     <img src={Blog} alt="BLOG"/>
      </Link>
      <ul>
        <li>
          <Link to="/blog">
            CreateBlog
          </Link>
        </li>
        {logged ? (
          <li>
            <div onClick={handleLogout}>
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
          </li>
        ) : (
          <li>
            <Link to="/login">
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
