var express = require('express');
var router = express.Router();
var User = require("../model/user");
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
const { validPassword } = require("../helper/password");

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    function (req, username, password, done) {
        User.findByEmail(username, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect credential.' });
            }
            if (!validPassword(password, user.password)) {
                return done(null, false, { message: 'Incorrect credential.' });
            }
            return done(null, user);
        })
    }
));

router.get('/login', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    res.render('auth/login', { layout: false, error: req.flash('error') });
});

router.post('/login',
    passport.authenticate('local',
        {
            failureRedirect: '/auth/login',
            failureFlash: true
        }
    ),
    (req, res) => {
        console.log("user", req.user);
        res.redirect('/');
    }
);

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
