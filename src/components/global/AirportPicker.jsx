import { useState, useEffect } from "react";

import { searchAirportsAPI } from "../../api/public";



const AirportPicker = (props) => {

  const [airports, setAirports] = useState([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const [airport, setAirport] = useState(null);
  const [feedback, setFeedback] = useState(false);



  const searchHandler = async (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    setAirports([]);
    const myTimeout = setTimeout(async () => {
      if(search.length < 3) return;
      const res = await searchAirportsAPI(search);
      if(res.status !== "success") return;
      setAirports(res.data);
    }, 500);

    return () => clearTimeout(myTimeout);
  }, [search]);




  const selectHandler = (id) => {
    const airport = airports.find(a => a._id === id);
    setAirport(airport);
    setValue(airport._id);
    setFeedback(true);
    setAirports([]);
  }





  return (
  <div className="airport-picker">
    <section className="d-none">
      <label htmlFor={props.name}>{props.label}</label>
      <input type="text" name={props.name} id={props.name} value={value} readOnly required />
    </section>

    <section className="p-relative">
      <div>
        { feedback ?
          <div className="result-feedback" onClick={() => {setFeedback(false)}}>
            <label>{props.label}</label>
            <div>
              <article className="result-feedback-name">{airport.name}</article>
              <span>{airport.city}, {airport.state}, {airport.country}</span>
            </div>
          </div> :
          <div>
            <label>{props.label}</label>
            <input type="text" onChange={searchHandler} />
          </div>
        }
      </div>
      { airports.length > 0 &&
      <div className="airport-search-results">
        {/* <div className="airport-search-result">
          <p className="airport-result-name">Airport Name</p>
          <span className="airport-result-city"> Airport city,</span>
          <span className="airport-result-state"> Airport state,</span> 
          <span className="airport-result-country"> Airport country </span>
        </div> */}
        {airports.map(airport => 
            <div className="airport-search-result" key={`airport-result-${airport._id}`} onClick={() => selectHandler(airport._id)}>
              <p className="airport-result-name">{airport.name}</p>
              <span className="airport-result-city"> {airport.city},</span>
              <span className="airport-result-state"> {airport.state},</span>
              <span className="airport-result-country"> {airport.country} </span>
            </div>
        )}
      </div>
      }
    </section>
  </div>);
}

export default AirportPicker;