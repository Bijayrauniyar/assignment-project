const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const checkAuth = require('../middleware/check-auth');

//const authController = require('../controllers/auth');

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

          await createUser(newUser);
          result.success = true;
        } catch (e) {
          result.success = false;
        } finally {
          console.log(result);
          return cb(null, profile);
        }
      }
    }
  )
);

router.get('/', (req, res) => {
  res.send('Welcome to the contacts management application');
});
router.get('/login', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
  '/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/contacts');
  }
);

router.get('/logout', checkAuth, (req, res) => {
  req.logout();
  res.status(200).json({
    message: 'successfully logout'
  });
});

async function getUser(fbId) {
  try {
    const results = await client.query('select * from users where id = $1', [
      fbid
    ]);
    return results.rows;
  } catch (e) {
    return false;
  }
}

async function createUser(user) {
  try {
    await client.query(
      'insert into public.user (id,name,email,token) values ($1, $2, $3, $4)',
      [user.id, user.name, user.email, user.token]
    );

    return true;
  } catch (e) {
    return false;
  }
}

module.exports = router;
