import React from "react";
import background from "./images/books-background.jpg"

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 300, clear: "both", paddingTop: 90, textAlign: "center" , backgroundImage: `url(${background})`, backgroundSize: "cover"}}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;