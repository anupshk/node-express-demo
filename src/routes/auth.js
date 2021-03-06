var express = require('express');
var router = express.Router();
//var User = require("../model/user");
const { User } = require("../models");
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
        User
            .findOne({
                where: {
                    email: username
                }
            })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect credential.' });
                }
                if (!validPassword(password, user.password)) {
                    return done(null, false, { message: 'Incorrect credential.' });
                }
                return done(null, user.get());
            })
            .catch(e => {
                console.log("error retrieving user", e);
                return done(null, false, { message: 'Incorrect credential.' });
            })
        // User.findByEmail(username, (err, user) => {
        //     if (err) {
        //         if (err.kind && err.kind == "not_found") {
        //             return done(null, false, { message: 'Incorrect credential.' });
        //         } else {
        //             return done(err);
        //         }
        //     }
        //     if (!user) {
        //         return done(null, false, { message: 'Incorrect credential.' });
        //     }
        //     if (!validPassword(password, user.password)) {
        //         return done(null, false, { message: 'Incorrect credential.' });
        //     }
        //     return done(null, user);
        // })
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
        res.io.to("general").emit("userLogin", req.user);
        res.redirect('/');
    }
);

router.get('/logout', function (req, res) {
    res.io.to("general").emit("userLogout", req.user);
    req.logout();
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

module.exports = router;
