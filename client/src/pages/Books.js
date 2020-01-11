import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { FormBtn, Input, Label } from "../components/Form";
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

  componentDidMount() {
    const data = this.props.location.data
    if (data && data.results.length > 0) {
      this.setState({
        books: data.results.filter((value, index) => index < 5),
        search: "_blank"
      });
    } else {
      this.setState({
        hasBook: true
      });
    }
  }

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

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Search for the book you want to investigate!</h1>
              <p className="lead">
                <Link className="btn btn-default btn-lg" to="/" role="button">New Search</Link>
                <Link className="btn btn-default btn-lg" to="/saved" role="button">Saved Books</Link>
              </p>
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
                        link: book.volumeInfo.infoLink,
                        _id: book.id
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
