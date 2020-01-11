import React from "react";

const SaveBtn = props => (
  <button className={`btn btn-sm btn-${props.btntype}`} {...props}>
    {props.children}
  </button>
);

export default SaveBtn;