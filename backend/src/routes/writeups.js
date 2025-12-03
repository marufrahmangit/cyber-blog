const express = require('express');
const router = express.Router();
const writeupController = require('../controllers/writeupController');

router.get('/', writeupController.getAllWriteups);
router.get('/search', writeupController.searchWriteups);
router.get('/:slug', writeupController.getWriteupBySlug);

module.exports = router;