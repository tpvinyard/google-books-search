import React, { Component } from "react";
import API from "../utils/API";
import searchBooks from "../utils/searchBooks";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import SearchForm from "../components/Form";
import Card from "../components/Card";

class Books extends Component {
  state = {
    search: "",
    books: [],
    hasBook: false
  };

//   componentDidMount() {
//     this.loadBooks();
//   }

  loadBooks = query => {
    searchBooks.searchBooks(query)
      .then(res => this.setState({ books: res.data.items }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Google Books API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.loadBooks(this.state.search);
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Search for the book you want to investigate!</h1>
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
            </Jumbotron>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <Row>
                {this.state.books.map(book => (
                  <Card key={book._id}
                    title={book.volumeInfo.title}
                    author={book.volumeInfo.authors[0]}
                    synopsis={book.volumeInfo.description}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    link={book.accessInfo.webReaderLink}
                  />
                ))}
              </Row>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
