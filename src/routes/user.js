var express = require('express');
var router = express.Router();
var fs = require('fs');
const { User } = require("../models");
const { ensureAuthenticated } = require("../middleware/auth");
const { getUserDirectory } = require('../helper/storage');

router.get('/profile/edit', ensureAuthenticated, function (req, res, next) {
    User
        .findByPk(req.user.id)
        .then(user => {
            res.render('user/profile-form', { title: 'Profile', user });
        })
        .catch(e => {
            console.log("error", e);
            res.render('user/profile-form', { title: 'Profile', user: req.user });
        });
});

router.post('/profile/edit', ensureAuthenticated, function (req, res, next) {
    console.log("posted", req.body, req.files);
    let userData = { ...req.body };
    if (req.files && req.files.image) {
        let image = req.files.image;
        let userImage = req.user.uid + '.jpg';
        userData.image = userImage;
        let userDir = getUserDirectory(req.user);
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
        }
        let profile_image = userDir + '/' + userImage;
        image.mv(profile_image, function (err) {
            if (err) {
                console.log("file upload error", err);
            } else {
                console.log("file uploaded to ", profile_image);
            }
        });
    }
    User
        .update(userData, {
            where: {
                id: req.user.id
            }
        })
        .then(r => {
            console.log("updated", r);
        })
        .catch(e => {
            console.log("update error", e);
        })
        .finally(() => {
            res.redirect("/user/profile/edit");
        });
});

module.exports = router;