const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const client = require('./db/index');
const passport = require('passport');
const morgan = require('morgan');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const cors = require('cors');

//Set middleware
app.use(express.json());

//connect database
start();
async function start() {
  try {
    await client.connect();
  } catch (e) {
    console.error(`Failed to connect ${e}`);
  }
}
app.use(
  cookieSession({
    name: 'session',
    keys: ['thisappisawesome'],
    maxAge: 24 * 60 * 60 * 100
  })
);
// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // allow session cookie from browser to pass through
  })
);

app.use(morgan('dev'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/contacts', contactRoutes);
app.use('/', authRoutes);

module.exports = app;
