import { useState, useContext, useEffect } from "react";

import GlobalLoader from "../ui/Loaders/GlobalLoader";
import AirportList from "../global/AirportList";
import LoadingIcon from "../ui/Loaders/LoadingIcon";

import AuthContext from "../../store/AuthContext";
import { getAirportsAPI } from "../../api/public";
import { addAirportAPI } from "../../api/admin";



const Airports = (props) => {

  const { token } = useContext(AuthContext);

  const [airports, setAirports] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const getAirports = async () => {
      const res = await getAirportsAPI();
      if(res.status === "success"){
        setAirports(res.data);
      }
      setIsLoading(false);
    };

    getAirports();
  }, []);



  const newAirportHandler = async (e) => {
    e.preventDefault();
    setFeedback(<span><LoadingIcon />Please wait...</span>);
    const fd = new FormData(e.target);
    const data = {
      name: fd.get("airport-name"),
      city: fd.get("airport-city"),
      state: fd.get("airport-state"),
      country: fd.get("airport-country"),
    };
    
    const res = await addAirportAPI(token, data);
    if(res.status !== "success") return;

    let newAirport = res.data;
    setAirports(prev => [...prev, newAirport]);
    e.target.reset();
    setFeedback(<span>Added successfully</span>);
  }

  const changeHandler = (e) => {
    setFeedback(null);
  }




  if(isLoading) return <GlobalLoader />;

  return (<div className="airports-page">
    <h2 className="mb-4">Airports</h2>

    <form className="airport-form bg-accent-light rounded-20 p-4 mb-6" onSubmit={newAirportHandler} onChange={changeHandler}>
      <h5>Add new airport</h5>
      <section>
        <label htmlFor="airport-name">Airport Name</label>
        <input type="text" id="airport-name" name="airport-name" required />
      </section>
      <div className="d-grid-3 gap-2">
        <section>
          <label htmlFor="airport-city">City</label>
          <input type="text" id="airport-city" name="airport-city" required />
        </section>
        <section>
          <label htmlFor="airport-state">State</label>
          <input type="text" id="airport-state" name="airport-state" required />
        </section>
        <section>
          <label htmlFor="airport-country">Country</label>
          <input type="text" id="airport-country" name="airport-country" required />
        </section>
      </div>
      <div>
        <button className="btn primary large mt-4">Add Airport</button>
        {feedback && <p className="feedback d-inblock ml-3">{feedback}</p>}
      </div>
    </form>

    <AirportList list={airports} />
  </div>);
}

export default Airports;