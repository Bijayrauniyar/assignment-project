const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const checkAuth = require('../middleware/check-auth');
const client = require('../db/index');
require('dotenv').config();

// facebook strategy
const FACEBOOK_APP_ID = '404668066834482';
const FACEBOOK_APP_SECRET = '5f47249de8277a9f02534a986f049b82';
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:8000/return',
      profileFields: ['id', 'displayName', 'email']
    },
    async function(accessToken, refreshToken, profile, cb) {
      const user = await getUser(profile.id);
      if (user) {
        console.log({ user });
        return cb(null, profile);
      } else {
        let result = {};
        try {
          newUser = {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            token: accessToken
          };

          const users = await createUser(newUser);
          result = users;
        } catch (e) {
          result.success = false;
        } finally {
          return cb(null, profile);
        }
      }
    }
  )
);

// when login is successful, retrieve user info
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user._json,
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.'
  });
});

router.get('/', (req, res) => {
  res.send('Welcome to the contacts management application');
});
router.get('/auth', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
  '/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(process.env.CLIENT_ULR);
  }
);

router.get('/logout', checkAuth, (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_ULR);
});

async function getUser(fbId) {
  try {
    const result = await client.query(
      'select * from public.user where id =$1',
      [fbId]
    );
    if (result.row > 0) {
      return result.rows;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function createUser(user) {
  try {
    const users = await client.query(
      'insert into public.user (id,name,email,token) values ($1, $2, $3, $4)',
      [user.id, user.name, user.email, user.token]
    );

    return users;
  } catch (e) {
    return false;
  }
}

module.exports = router;
