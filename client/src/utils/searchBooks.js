import axios from "axios";

export default {
  // Gets all books from Google Books based on Search Term
  searchBooks: function(searchTerm) {
    return axios.get(`https://www.googleapis.com/books/v1/intitle?q=${searchTerm}&key=AIzaSyAl7z7WaDJwjwvBjibTRwfoNtFfU1iI-Zo`);
  }
};