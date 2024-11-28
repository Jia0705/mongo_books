const express = require("express");
const app = express();

let books = [
  { id: "b1", title: "Book One", description: "Description of book one", authorId: "a1" },
  { id: "b2", title: "Book Two", description: "Description of book two", authorId: "a2" },
];

let reviews = [
  { id: "r1", text: "Amazing book!", bookId: "b1" },
  { id: "r2", text: "Decent read.", bookId: "b2" },
];

let authors = [
  { id: "a1", name: "Author One", bio: "Bio of Author One" },
  { id: "a2", name: "Author Two", bio: "Bio of Author Two" },
];

// List all books
app.get("/", (request, response) => {
  response.send(books);
});

// List all reviews
app.get("/reviews", (request, response) => {
  response.send(reviews);
});

// List all authors
app.get("/authors", (request, response) => {
  response.send(authors);
});

// Get a specific book by ID, including author details
app.get("/books/:id", (req, res) => {
  const book_id = req.params.id;
  const selected = books.find((b) => b.id === book_id);
  const author = authors.find((a) => a.id === selected.authorId);
  res.send({
    id: selected.id,
    title: selected.title,
    description: selected.description,
    authorId: author.id,
    name: author.name,
    bio : author.bio,
  });
});

// Get a specific review by ID, including book title
app.get("/reviews/:id", (req, res) => {
  const review_id = req.params.id;
  const reselected = reviews.find((r) => r.id === review_id);
  const book = books.find((b) => b.id === reselected.bookId);
  res.send({
    id: reselected.id,
    text: reselected.text,
    bookId: book.id,
    bookTitle: book.title,
  });
});

// Get a specific author by ID
app.get("/authors/:id", (req, res) => {
  const author_id = req.params.id;
  const auselected = authors.find((a) => a.id === author_id);
  res.send(auselected);
});

// Start the server
app.listen(5555, () => {
  console.log("Bookstore app is running on http://localhost:5555");
});
