import React from "react";

const SaveBtn = props => (
  <button className={`btn btn-sm`} {...props}>
    {props.children}
  </button>
);

export default SaveBtn;