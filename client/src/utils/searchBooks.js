import axios from "axios";
const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=";
const KEY = "&key=AIzaSyDpzOkgjhAfvBdWEkiiok-4lvpp9_AVAu4";

export default {
  // Gets all books from Google Books based on Search Term
  searchBooks: function(searchTerm) {
    return axios.get(BASEURL + searchTerm);
  }
};