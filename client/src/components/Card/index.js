import React from "react";
import "./style.css";

export function Card(props) {
    return(
        <div className="card">
            <img src={props.image} className="card-img-top"/>
            <div className="card-body">
            <h5 class="card-title">{props.title} by {props.author}</h5>
                <p class="card-text">{props.synopsis}</p>
                <a href={props.link} class="btn btn-primary">Visit</a>
            </div>
        </div>
    );
}