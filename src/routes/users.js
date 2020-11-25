var express = require('express');
var router = express.Router();
const users = require("../controller/user");
const { ensureAuthenticated } = require("../middleware/auth");

/* GET users listing. */
router.get('/', ensureAuthenticated, function (req, res, next) {
    users.findAll(req, res);
});

module.exports = router;
