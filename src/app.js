var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var flash = require('connect-flash');
var passport = require('passport');
var User = require("./model/user");

const dbConfig = require("./config/db");
var sessionStore = new MySQLStore({
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});
const sessionMiddleware = session({
    secret: 'somesecret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
});

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', [
    express.static(__dirname + '/node_modules/jquery/dist/'),
    express.static(__dirname + '/node_modules/bootstrap/dist/js/'),
    express.static(__dirname + '/node_modules/socket.io/client-dist/')
]);

var server = require('http').Server(app);
var io = require('socket.io')(server);

// convert a connect middleware to a Socket.IO middleware
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
    console.log("socket user", socket.request.user);
    if (socket.request.user) {
        next();
    } else {
        next(new Error('unauthorized'))
    }
});

io.on("connection", function (socket) {
    socket.join("general");
    console.log("New connection", socket.id);
});

app.use(function (req, res, next) {
    res.io = io;
    next();
});

app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = { app: app, server: server };