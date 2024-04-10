import Navbar from "./compoents/ navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./compoents/login";
import Blogpage from "./pages/Blogpage";
import "./App.css";
import { createContext, useState, useEffect } from "react";
import { lookInsession } from "./common/session";
import Editorpage from "./pages/Editorpage";

export const usercontext = createContext({});
function App() {
  const [userAuth, setuserAuth] = useState();

  useEffect(() => {
    let userInsession = lookInsession("user");
    userInsession
      ? setuserAuth(JSON.parse(userInsession))
      : setuserAuth({ token: null });
  }, []);

  return (
    <Router>
      <usercontext.Provider value={{ userAuth, setuserAuth }}>
        <Routes>
          <Route path="/editor" element={<Editorpage />} />
          <Route path="/" element={<Navbar />}/>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/login" element={<Login type="sign-in" />} />
            <Route path="/signup" element={<Login type="sign-up" />} />
         
        </Routes>
      </usercontext.Provider>
    </Router>
  );
}

export default App;
