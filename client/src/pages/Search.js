import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";

class Search extends Component {
  state = {
    title: "",
    toBooks: false,
    results: []
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      const title = this.state.title.trim();
      API.searchBooks(title)
        .then(res => {
          this.setState({
            toBooks: true,
            results: res.data.items
          });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    if (this.state.toBooks) {
      return <Redirect to={{
        pathname: "/books",
        data: { results: this.state.results }
      }} />
    }
    return (
      <div>
        <Jumbotron>
            <h1 style={{color: "white"}}>Google Books Search with React.js</h1>
            <p className="lead">
            <Link className="btn btn-dark btn-lg" to="/" role="button">New Search</Link>
            <Link className="btn btn-dark btn-lg" to="/saved" role="button" style={{marginLeft: 20}}>Saved Books</Link>
            </p>
        </Jumbotron>
        <Container>
          <form>
            <Input
              value={this.state.title}
              onChange={this.handleInputChange}
              name="title"
              label="Book Title"
              placeholder="Search Book Title (required)"
            />
            <FormBtn         
              onClick={this.handleFormSubmit}
              className="btn btn-info"
            >
              Search
            </FormBtn>
          </form>
        </Container>
      </div>
    );
  }
}

export default Search;