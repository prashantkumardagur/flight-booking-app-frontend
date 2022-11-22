const DataChip = (props) => {
  return (
  <div className={`data-chip ${props.type} ${props.className}`}>
    {props.text}
  </div>);
}

export default DataChip;