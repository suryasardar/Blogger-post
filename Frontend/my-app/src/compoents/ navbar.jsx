import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Blog from "../Images/logo.png";
// import { DarkModeSwitch } from 'react-toggle-dark-mode';

const Navbar = () => {
  const [logged, setLogged] = useState(false);
  const[searchvisibility,setsearchvisibility]=useState(false)

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
      <Link to="/" className="flex-none w-10 pl-2">
        <img src={Blog} alt="BLOG" className="w-full" />
      </Link>
      <div className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${searchvisibility ? "show" : "hide"}`}>
        

        <input
          type="text"
          placeholder="search"
          className="w-full md:w-auto bg-grey p-2 pl-6  pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
          />
        <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md-left-5 top-1/2 -translate-y-1/2 text:xl text-dark-grey"></i>
          
      </div>
      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <button className="md:hidden bg-grey w-11 h-11 rounded-full flex items-center justify-center" onClick={()=>{setsearchvisibility(currentvalue=>!currentvalue)}}>
        <i className="fi fi-rr-search text-xl"></i>
        </button>
        <Link to='/editor' className="hidden md:flex gap-2 link py-2">
        <i className="fi fi-rr-file-edit"></i>
          <p>write</p>
        </Link>
        <Link className="btn-dark py-2" to='/login'>
         Sign In
        </Link>
        <Link className="btn-light py-2" to='/login'>
         Sign In
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/blog">CreateBlog</Link>
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
            <Link to="/login">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
