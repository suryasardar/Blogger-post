
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
      <p>Blog logo</p>
      <ul>
        <li>
          <Link to="/blog" style={{ color: "black" }}>
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
            <Link to="/login" style={{ color: "black" }}>
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
