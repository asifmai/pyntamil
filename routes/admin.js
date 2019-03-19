const express = require('express');

const router = express.Router();
const auth = require('../config/auth');

const adminController = require('../controllers/adminController');


// @route   GET /admin/addbook
// @desc    Show add book page
// @access  Public
router.get('/addbook', adminController.addbook_get);

// @route   POST /admin/addbook
// @desc    add book
// @access  Public
router.post('/addbook', adminController.addbook_post);

module.exports = router;
