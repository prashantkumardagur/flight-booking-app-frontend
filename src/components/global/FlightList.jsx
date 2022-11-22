import { useContext } from 'react';

import Icon from '../ui/Icon/Icon';

import AuthContext from "../../store/AuthContext";




const FlightList = (props) => {

  const { isAdmin } = useContext(AuthContext);



  const { list } = props;
  let count = list.length;
  list.forEach(flight => {
    let t1= flight.departure;
    let t2= flight.arrival;
    let h1 = t1.split(":")[0];
    let h2 = t2.split(":")[0];
    let m1 = t1.split(":")[1];
    let m2 = t2.split(":")[1];
    let diff = (h2-h1)*60 + (m2-m1);
    let diffH = Math.floor(diff/60);
    let diffM = diff%60;
    flight.duration = diffH + "h " + diffM + "m";
  });


  return (<>
    <div className="flight-header py-2 px-4 txt-light">{count} flights found.</div>
    <div className={`flight-list mb-7 ${props.className}`}>
      {props.list.map((flight) => 
        <div key={`flight-${flight._id}`} className="flight">
          <div>
            <div>
              <span className='flight-name'>{flight.airline}</span><br />
              <span className='flight-number'>{flight.flightNumber}</span>
            </div>
          </div>
          <div className="justify-center flex-column">
            <div className='flight-time'>{flight.departure}</div><div className='flight-city'>{flight.from.city}</div>
          </div>
          <div className="justify-center flight-trip-time">{ flight.duration }</div>
          <div className="justify-center flex-column">
            <div className="flight-time">{flight.arrival}</div><div className='flight-city'>{flight.to.city}</div>
          </div>
          <div className="flight-price"><Icon icon="currency_rupee" />{flight.price}</div>
          { isAdmin ?
            <button className="btn black" onClick={() => {props.onDelete(flight._id)}}><Icon icon="delete" /></button> :
            <button className="btn primary">Book</button>
          } 
        </div>)}
    </div>
  </>);
}

export default FlightList;