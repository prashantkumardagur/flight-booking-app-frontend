import { useState, useContext, useEffect } from "react";

import GlobalLoader from "../ui/Loaders/GlobalLoader";
import LoadingIcon from "../ui/Loaders/LoadingIcon";
import FlightList from "../global/FlightList";
import AirportPicker from "../global/AirportPicker";

import AuthContext from "../../store/AuthContext";
import { getFlightsAPI } from "../../api/public";
import { addFlightAPI, deleteFlightAPI } from "../../api/admin";




const Flights = (props) => {

  const { token } = useContext(AuthContext);

  const [flights, setFlights] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(true);




  useEffect(() => {
    const getFlights = async () => {
      const res = await getFlightsAPI();
      if(res.status === "success"){
        setFlights(res.data);
      }
      setIsLoading(false);
    };

    getFlights();
  }, []);





  const newFlightHandler = async (e) => {
    e.preventDefault();
    setFeedback(<span><LoadingIcon />Please wait...</span>);

    const fd = new FormData(e.target);
    const data = {
      from: fd.get("from"),
      to: fd.get("to"),
      airline: fd.get("airline"),
      flightNumber: fd.get("flight-number"),
      departure: fd.get("departure"),
      arrival: fd.get("arrival"),
      price: fd.get("price"),
      seats: fd.get("seats"),
    };

    const res = await addFlightAPI(token, data);
    if(res.status !== "success") return setFeedback(<span>{res.message}</span>);
    let newFlight = res.data;
    setFlights(prev => [...prev, newFlight]);
    setFeedback(<span>Added successfully</span>);
  }




  const flightDeleteHandler = async (id) => {
    const res = await deleteFlightAPI(token, id);
    if(res.status !== "success") return;
    setFlights(prev => prev.filter(flight => flight._id !== id));
    console.log("Deleted successfully");  
  }




  const formChangeHandler = (e) => {
    setFeedback(null);
  }





  if(isLoading) return <GlobalLoader />;

  return (
  <div className="flights-page">
    <h2 className="mb-5">Flights</h2>

    <form className="bg-accent-light my-6 rounded-20 p-4" onSubmit={newFlightHandler} onChange={formChangeHandler}>
      <h5>Add new flight</h5>
      <div className="d-grid-2 gap-2">
        <AirportPicker label="From" name="from" />
        <AirportPicker label="To" name="to" id="to" />
      </div>
      <div className="d-grid flight-form-data">
        <section>
          <label htmlFor="flight-number">Flight Number</label>
          <input type="text" name="flight-number" id="flight-number" required />
        </section>
        <section>
          <label htmlFor="airline">Airline</label>
          <input type="text" name="airline" id="airline" required />
        </section>
        <section>
          <label htmlFor="departure">Departure</label>
          <input type="time" name="departure" id="departure" required />
        </section>
        <section>
          <label htmlFor="arrival">Arrival</label>
          <input type="time" name="arrival" id="arrival" required />
        </section>
        <section>
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" required min={0} />
        </section>
        <section>
          <label htmlFor="seats">Seats</label>
          <input type="number" name="seats" id="seats" required min={0} />
        </section>
      </div>
      <div>
        <button className="btn primary mt-4">Add Flight</button>
        {feedback && <span className="feedback ml-3">{feedback}</span>}
      </div>
    </form>

    <FlightList list={flights} onDelete={flightDeleteHandler} />
  </div>);
}

export default Flights;