import React from "react";
import LoadingIcon from "./LoadingIcon";

const PageLoader = (props) => {
    return (<div className="page-loader"><LoadingIcon /> {props.text}</div>);
}

PageLoader.defaultProps = {text: "Loading..."};

export default React.memo(PageLoader);