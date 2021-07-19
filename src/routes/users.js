var express = require('express');
var router = express.Router();
//const users = require("../controller/user");
const { User } = require("../models");
const { ensureAuthenticated } = require("../middleware/auth");

/* GET users listing. */
router.get('/', ensureAuthenticated, function (req, res, next) {
    User.findAll({
        attributes: ['uid', 'image', 'first_name', 'middle_name', 'last_name']
    }).then(users => res.json(users));
});

module.exports = router;
