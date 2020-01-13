import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import { Col, Container } from "../components/Grid";
import SaveBtn from "../components/SaveBtn";
import { List, ListItem } from "../components/List";

class Books extends Component {
  state = {
    search: "",
    books: [],
    hasNoBook: false
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
        hasNoBook: true
      });
    }
  }

  saveBook = book => {
    API.saveBook(book)
      .then(res => {
        const currentBooks = this.state.books;
        // console.log(currentBooks);
        // console.log(res.data);
        // console.log (book)
        // console.log(res.data._id);
        const filterBooks = currentBooks.filter(book => book.volumeInfo.infoLink !== res.data.link);
        console.log(filterBooks);
        this.setState({
          books: filterBooks
        });
      })
      .catch(err => err.response.data);
  }

  render() {
    if (this.state.hasNoBook) {
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
          <Col size="md-12">
              <List>
              {this.state.books.map((book, index) => {
                const { volumeInfo: { imageLinks = {} } = {}} = book;
                return (
                <ListItem key={book.id} className="list-item">
                  <div className="data-div">
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
        </Container>
      </div>
    );
  }
}

export default Books;
