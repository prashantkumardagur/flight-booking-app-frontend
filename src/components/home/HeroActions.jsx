import AirportPicker from "../global/AirportPicker";


const HeroActions = (props) => {

  const submitHandler = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd);
    props.onSubmit(data);
  }



  return (<div className="hero-actions mt-3 pb-6">
    <form className="d-grid" onSubmit={submitHandler}>
      <AirportPicker id="from" name="from" label="From" />
      <AirportPicker id="to" name="to" label="To" />
      <button className="btn primary justify-center">Search</button>
    </form>
  </div>);
}

export default HeroActions;