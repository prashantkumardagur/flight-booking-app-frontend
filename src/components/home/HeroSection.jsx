import HeroActions from "./HeroActions";



const HeroSection = (props) => {
  return (<div className="hero-section container text-center bg-accent-light">
    <h1 className="pt-6">Book your flights</h1>
    <p className="txt-light py-3 px-7">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, quasi unde? Doloremque totam 
      nobis quaerat repellat voluptates sunt dolores architecto aliquam rem unde. Similique, blanditiis fugit quidem quia nemo placeat.</p>

      <HeroActions onSubmit={props.onSubmit} />
  </div>);
}

export default HeroSection;