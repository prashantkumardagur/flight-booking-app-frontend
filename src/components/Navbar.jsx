import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import Icon from "./ui/Icon/Icon";

import AuthContext from "../store/AuthContext";




const Navbar = (props) => {

  const { isLoggedIn, logout, isAdmin } = useContext(AuthContext);


  return (<nav className="d-flex bg-accent-light width-100 align-center pad5">
    <Link to="/"><h1 className="txt-black">Flights App</h1></Link>
    <ul className="navlinks d-flex align-center">
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/about-us">About</NavLink></li>
      <li><NavLink to="/auth/admin">Admin</NavLink></li>
    </ul>
    { isLoggedIn ?
      isAdmin ?
      <div className="d-flex align-center">
        <Link to="/dashboard" className="btn primary mr-2">Dashboard</Link>
        <button onClick={logout} className="btn black d-inflex align-center"><Icon icon="logout" /></button>
      </div> :
      <div className="d-flex align-center">
        <Link to="/profile" className="btn primary mr-2">Profile</Link>
        <button onClick={logout} className="btn black d-inflex align-center"><Icon icon="logout" /></button>
      </div> :
      <Link to="/auth/login" className="btn primary">Log In</Link>
    }
  </nav>);
}

export default Navbar;