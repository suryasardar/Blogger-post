import Navbar from './compoents/navbar';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './compoents/login';
import SIGNUP from './compoents/signup';
import Blog from './compoents/blog';
// import BLOGList from './compoents/bloglist';
// import BLOGList from './compoents/bloglist';
import Blogpage from './pages/Blogpage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
       <Routes>
          <Route exact path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SIGNUP />} />
        <Route path="/blog" element={<Blog />} />
        <Route path='/getblog/:uid' element={<Blogpage/>} />

        

        

        </Routes>
     </Router>
      
  );
}

export default App;
