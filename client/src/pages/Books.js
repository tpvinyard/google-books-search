import React, { Component } from "react";
import API from "../utils/API";
import searchBooks from "../utils/searchBooks";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import SearchForm from "../components/Form";
import SaveBtn from "../components/SaveBtn";
import { List, ListItem } from "../components/List";
// import Card from "../components/Card";

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

  saveBook = book => {
    console.log(book);
    API.saveBook(book)
      .then(res => {
        const currentBooks = this.state.books;
        const filterBooks = currentBooks.filter(book => book.id !== res.data.id);
        this.setState({
          books: filterBooks
        });
      })
      .catch(err => err.response.data);
  }
  

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
              <List>
              {this.state.books.map((book, index) => {
                const { volumeInfo: { imageLinks = {} } = {}} = book;
                return (
                <ListItem key={book.id}>
                  <div className="date-div">
                    <a
                      key={"" + index + book.id}
                      href={book.volumeInfo.infoLink}
                      target={this.state.target}
                    >
                      {book.volumeInfo.title}
                    </a>
                      <p>Written By {book.volumeInfo.authors[0]}</p>
                    <p>
                    <img align="left" style={{paddingRight:10}}
                      src={imageLinks.smallThumbnail ? imageLinks.smallThumbnail : ''} alt="new"
                    />
                      {book.volumeInfo.description}
                    </p>
                  </div>
                  <div className="book-btn-div">
                    <SaveBtn
                      key={"" + book.id + index}
                      btntype="info"
                      disabled={book.volumeInfo.infoLink === "/"}
                      onClick={() => this.saveBook({
                        title: book.volumeInfo.title,
                        author: book.volumeInfo.authors[0],
                        description: book.volumeInfo.description,
                        image: book.volumeInfo.imageLinks.smallThumbnail,
                        link: book.volumeInfo.infoLink
                      })}
                    >
                      Save
                    </SaveBtn>
                  </div>
                </ListItem>
              )})}
            </List>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
