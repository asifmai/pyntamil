const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const { secret } = require('../config/keys');

// Show Add Book Page
module.exports.addbook_get = (req, res, next) => {
  res.render('admin/addbook', { title: 'Add Book' });
};

// Save Book in JSON
module.exports.addbook_post = (req, res, next) => {
  if (secret == req.body.secret) {
    const booksPath = path.resolve(__dirname, '../books.json');
    const rawBooks = fs.readFileSync(booksPath, 'utf8');
    const books = JSON.parse(rawBooks);
    const rawID = `${books.length + 1}`;
    const pad = '0000';

    const id = pad.substring(0, pad.length - rawID.length) + rawID;
    const { format, sequence, name, tagline, description, author, illustrator, category } = req.body;
    const minimum_age = Number(req.body.minimum_age);
    const maximum_age = Number(req.body.maximum_age);
    const pages = Number(req.body.pages);
    const price = Number(req.body.price);
    const year = Number(req.body.year);
    const url_pdf = req.files.url_pdf ? req.files.url_pdf.name.toLowerCase() : '';
    const url_cover = req.files.url_cover ? req.files.url_cover.name.toLowerCase() : '';
    const url_epub = req.files.url_epub ? req.files.url_epub.name.toLowerCase() : '';
    const url_mobile = req.files.url_mobile ? req.files.url_mobile.name.toLowerCase() : '';
    const url_audio = req.files.url_audio ? req.files.url_audio.name.toLowerCase() : '';
    const tags = req.body.tags.split(',');
    for (let i = 0; i < tags.length; i++) {
      tags[i] = tags[i].trim();
    }
    const ratings = [];
    const material = req.body.material.split(',');
    for (let i = 0; i < material.length; i++) {
      material[i] = material[i].trim();
    }
    const viewed = 0;

    const newBook = {
      id, format, url_pdf, url_cover, sequence, url_epub, url_mobile, url_audio, name, tagline, description, tags, minimum_age, maximum_age, author, illustrator, category, ratings, material, price, pages, year, viewed,
    };

    books.push(newBook);
    fs.writeFileSync(booksPath, JSON.stringify(books));
    if (url_pdf != '') {
      const pdfPath = path.resolve(__dirname, `../public/content/books/${url_pdf}`);
      const file_pdf = req.files.url_pdf;
      file_pdf.mv(pdfPath, (err => console.log(err)));
    }

    if (url_cover != '') {
      const pdfPath = path.resolve(__dirname, `../public/content/covers/${url_cover}`);
      const file_cover = req.files.url_cover;
      file_cover.mv(pdfPath, (err => console.log(err)));
    }

    if (url_epub != '') {
      const pdfPath = path.resolve(__dirname, `../public/content/books/${url_epub}`);
      const file_epub = req.files.url_epub;
      file_epub.mv(pdfPath, (err => console.log(err)));
    }

    if (url_mobile != '') {
      const pdfPath = path.resolve(__dirname, `../public/content/books/${url_mobile}`);
      const file_mobile = req.files.url_mobile;
      file_mobile.mv(pdfPath, (err => console.log(err)));
    }

    if (url_audio != '') {
      const pdfPath = path.resolve(__dirname, `../public/content/books/${url_audio}`);
      const file_audio = req.files.url_audio;
      file_audio.mv(pdfPath, (err => console.log(err)));
    }

    res.redirect('/');
  } else {
    res.redirect('/admin/addbook');
  }
};
