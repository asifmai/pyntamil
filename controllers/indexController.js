const fs = require('fs');
const path = require('path');
const _ = require('underscore');

const booksPath = path.resolve(__dirname, '../books.json');
const bookofMonth = require('../config/keys').book_of_month;
const { books_per_page } = require('../config/keys');

// Display Welcome Page
module.exports.home_get = (req, res, next) => {
  res.redirect('/1');
};

// Display Welcome Page
module.exports.index_get = (req, res, next) => {
  const books = fetchBooks();
  const page = req.params.pageno;
  const pages = Math.ceil(books.length / books_per_page);
  if (page > pages) res.redirect('/1');
  const pagerulings = books.slice((page * books_per_page) - books_per_page, (page * books_per_page));
  const current = req.params.pageno;
  const bom = books.filter(b => b.id == bookofMonth)[0];
  res.render('index', { current, pages, bom, books: pagerulings, title: 'பைந்தமிழ்' });
};

// Display FAQ Page
module.exports.faq_get = (req, res, next) => {
  res.render('faq', { title: 'வினாவிடம்' });
};

// Display Terms Page
module.exports.terms_get = (req, res, next) => {
  res.render('terms', { title: 'வரைமுறை' });
};

// Display Privacy Policy Page
module.exports.privacypolicy_get = (req, res, next) => {
  res.render('privacypolicy', { title: 'தனியுரிமைக் கோட்பாடு' });
};

// Display Book Details Page
module.exports.bookdetail_get = (req, res, next) => {
  const books = fetchBooks();
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
  const books = fetchBooks();
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
  const books = fetchBooks;
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      books[i].ratings.push(Number(stars));
    }
  }
  fs.writeFileSync(booksPath, JSON.stringify(books));
  res.send('success');
};

function fetchBooks() {
  const returnBooks = [];
  const rawBooks = fs.readFileSync(booksPath, 'utf8');
  const books = JSON.parse(rawBooks);
  books.forEach((book) => {
    const newBook = book;
    const coverPath = path.resolve(__dirname, `../public/content/covers/${newBook.url_cover}`);
    const coverExists = fs.existsSync(coverPath);
    if (!coverExists || newBook.url_cover == '') {
      newBook.url_cover = 'bcholder.png';
    }
    returnBooks.push(newBook);
  });
  return returnBooks;
}
