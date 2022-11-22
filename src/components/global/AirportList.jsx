const AirportList = (props) => {
  const { list } = props;

  return (
  <div className={`airport-list ${props.className}`}>
    <div className="airport-list-head">
      <p>Name</p>
      <p>City</p>
      <p>State</p>
      <p>Country</p>
    </div>
    {list.map((airport, index) => <div key={`airport-${airport._id}`}>
      <p>{airport.name}</p>
      <p>{airport.city}</p>
      <p>{airport.state}</p>
      <p>{airport.country}</p>
    </div>)}
  </div>);
}

export default AirportList;