var express = require('express');
var router = express.Router();
const users = require("../controller/user");

/* GET users listing. */
router.get('/', function (req, res, next) {
    users.findAll(req, res);
});

module.exports = router;
