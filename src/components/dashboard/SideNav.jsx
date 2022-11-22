import { NavLink } from "react-router-dom";



const SideNav = (props) => {
  return (
  <div className="sidenav">
    <ul>
      <li><NavLink to="/dashboard/statistics">Statistics</NavLink></li>
      <li><NavLink to="/dashboard/flights">Flights</NavLink></li>
      <li><NavLink to="/dashboard/airports">Airports</NavLink></li>
    </ul>
  </div>);
}

export default SideNav;