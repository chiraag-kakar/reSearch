const express = require('express');
const router = express.Router();

const DocumentController = require('../controllers/research');

router.get('/index', DocumentController.home_get);
router.post('/index', DocumentController.home_post);
router.get('/search', DocumentController.search_get);
router.post('/search', DocumentController.search_post);
router.get('/clear', DocumentController.clear_get);
/*router.post('/pdf', DocumentController.pdf_post);*/

module.exports = router;