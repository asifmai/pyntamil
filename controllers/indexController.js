const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const bookofMonth = require('../config/keys').book_of_month;

// Display Welcome Page
module.exports.index_get = (req, res, next) => {
  const booksPath = path.resolve(__dirname, '../books.json');
  const rawBooks = fs.readFileSync(booksPath, 'utf8');
  const books = JSON.parse(rawBooks);
  const bom = books.filter(b => b.id == bookofMonth)[0];
  res.render('index', { bom, books, title: 'பைந்தமிழ்' });
};

// Display Book Details Page
module.exports.bookdetail_get = (req, res, next) => {
  const booksPath = path.resolve(__dirname, '../books.json');
  const rawBooks = fs.readFileSync(booksPath, 'utf8');
  const books = JSON.parse(rawBooks);
  const book = books.filter(bk => bk.id == req.params.id)[0];
  const relatedBooks = books.filter(bk => bk.category == book.category && bk.id != book.id);
  if (book != undefined) {
    const fullScore = _.reduce(book.ratings, (memo, num) => memo + num, 0) / book.ratings.length;
    const score = fullScore.toFixed(2);
    res.render('bookdetail', { book, score, books, relatedBooks, title: 'பைந்தமிழ் | நூல்' });
  } else {
    res.redirect('/');
  }
};

// Display Read Book Page
module.exports.readbook_get = (req, res, next) => {
  const booksPath = path.resolve(__dirname, '../books.json');
  const rawBooks = fs.readFileSync(booksPath, 'utf8');
  const books = JSON.parse(rawBooks);
  let book = '';
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == req.params.id) {
      book = books[i];
      books[i].viewed += 1;
    }
  }
  if (book != '') {
    fs.writeFileSync(booksPath, JSON.stringify(books));
    res.render('readbook', { book, books, title: 'பைந்தமிழ் | படி' });
  } else {
    res.redirect('/');
  }
};

module.exports.ratebook_post = (req, res, next) => {
  const { id, stars } = req.params;
  const booksPath = path.resolve(__dirname, '../books.json');
  const rawBooks = fs.readFileSync(booksPath, 'utf8');
  const books = JSON.parse(rawBooks);
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      books[i].ratings.push(Number(stars))
    }
  }
  fs.writeFileSync(booksPath, JSON.stringify(books));
  res.send('success');
};
