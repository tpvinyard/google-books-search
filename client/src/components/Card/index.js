import React from "react";
import "./style.css";

export function Card(props) {
    return(
        <div className="card">
            <img alt={props.title} src={props.image} className="card-img-top"/>
            <div className="card-body">
                <h5 className="card-title">{props.title} by {props.author}</h5>
                <p className="card-text">{props.synopsis}</p>
                <a href={props.link} className="btn btn-primary">Visit</a>
            </div>
        </div>
    );
}

export default Card;