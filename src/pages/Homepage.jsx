import { useState } from "react";

import HeroSection from "../components/home/HeroSection";
import ResultBody from "../components/home/ResultBody";

import "./css/homepage.css";

import { findFlightsAPI } from "../api/public";




const Homepage = (props) => {

  const [searchData, setSearchData] = useState([]);




  const searchHandler = async (query) => {
    const res = await findFlightsAPI(query);
    if(res.status !== "success") return;
    setSearchData(res.data);
  };





  return (<div className="homepage">
    <HeroSection onSubmit={searchHandler} />
    <ResultBody list={searchData} />
  </div>);
}

export default Homepage;