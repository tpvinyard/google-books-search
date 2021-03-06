import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import { Container } from "../components/Grid";
import SaveBtn from "../components/SaveBtn";

class Saved extends Component {
  state = {
    books: [],
    target: "",
    noResults: false
  };

  componentDidMount() {
    this.loadSavedBooks();
  }

  loadSavedBooks = () => {
    API.loadSavedBooks()
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            books: res.data,
            target: "_blank"
          });
          console.log(this.state.books)
        } else {
          this.setState({
            noResults: true
          });
        }

      })
      .catch(err => console.log(err));
  }

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadSavedBooks())
      .catch(err => console.log(err));
  };

  render() {
    if (this.state.noResults) {
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
            <Link to="/">No results - click here to search again.</Link>
          </Container>
        </div>
      )
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
          <h2>Saved Books</h2>
          <List>
            {this.state.books.map(book => (
              <ListItem key={book._id}>
                <div className="date-div">
                  <a
                    key={book._id + "link"}
                    href={book.link}
                    target={this.state.target}
                  >
                    {book.title}
                  </a>
                  <p>Written By {book.author}</p>
                  <p>
                  <img align="left" style={{paddingRight:10}}
                    src={book.image} alt="new"
                  />
                    {book.description}
                  </p>
                </div>
                <div className="book-btn-div">
                  <SaveBtn
                    key={book._id + "btn"}
                    btntype="info"
                    id={book._id}
                    disabled={book.link === "/"}
                    onClick={() => this.deleteBook(book._id)}
                  >
                    Delete
                </SaveBtn>
                </div>
              </ListItem>
            ))}
          </List>
        </Container>
      </div>
    );
  }
}

export default Saved;
