import FlightList from "../global/FlightList";




const ResultBody = (props) => {

  let list = props.list.sort((a,b) => a.price - b.price )


  return (
  <div className="result-body container mt-6">
    <FlightList list={list} />
  </div>);
}

export default ResultBody;