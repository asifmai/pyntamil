const express = require('express');

const router = express.Router();
const auth = require('../config/auth');

const indexController = require('../controllers/indexController');
const adminController = require('../controllers/adminController');

// @route   GET /
// @desc    Show Index Page
// @access  Public
router.get('/', indexController.home_get);

// @route   GET /:pageno
// @desc    Show Index Page
// @access  Public
router.get('/:pageno', indexController.index_get);

// @route   GET /bookdetail/:id
// @desc    Show Book Details Page
// @access  Public
router.get('/bookdetail/:id', indexController.bookdetail_get);

// @route   GET /readbook/:id
// @desc    Show Read Book Page
// @access  Public
router.get('/readbook/:id', indexController.readbook_get);

// @route   POST /ratebook/:id/:stars
// @desc    Save Book Ratings
// @access  Public
router.post('/ratebook/:id/:stars', indexController.ratebook_post);

// @route   GET /faq
// @desc    Show FAQ Page
// @access  Public
router.get('/faq', indexController.faq_get);

// @route   GET /terms
// @desc    Show Terms Page
// @access  Public
router.get('/terms', indexController.terms_get);

// @route   GET /privacypolicy
// @desc    Show Privacy Policy Page
// @access  Public
router.get('/privacypolicy', indexController.privacypolicy_get);

module.exports = router;
