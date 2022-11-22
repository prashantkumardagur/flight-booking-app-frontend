const Icon = (props) => {
  return (
  <span className={`material-symbols-outlined ${props.className}`} style={{color: props.color, fontSize: "1.4em"}}>
    {props.icon}
  </span>);
}

export default Icon;