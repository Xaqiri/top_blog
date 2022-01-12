var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blog' });
});

router.get('/sign-up', indexController.sign_up_get);

router.post('/sign-up', indexController.sign_up_post);

router.get('/sign-in', indexController.sign_in_get);
router.post('/sign-in', indexController.sign_in_post);

router.get('/log-out', indexController.log_out_get);

module.exports = router;
