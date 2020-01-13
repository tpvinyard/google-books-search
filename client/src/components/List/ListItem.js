import React from "react";
import "./List.css";

export const ListItem = props => (
  <li className="list-group-item" style={{marginBottom: 10}}>
    {props.children}
  </li>
);