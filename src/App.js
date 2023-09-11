import {Route,Routes} from "react-router-dom"
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import MyNavBar from "./components/Navbar";
import ListingsPages from "./pages/List";
import HomePage from "./pages/Home";

function App() {
  
  return (
    <div>
      {/* <MyNavBar/> */}
      {/* <MyNavBar/> */}
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/bookme/list" element={<ListingsPages/>}/>
  </Routes>
  </div>
  )
}

export default App;
