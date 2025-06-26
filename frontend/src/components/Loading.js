import React from "react";
import "./Loading.css"
const Loading = () => {
  return (
    <div className="load-center">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
