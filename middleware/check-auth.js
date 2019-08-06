module.exports = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  //res.redirect('/');
  res.status(400).json({
    message: 'access denied user is not authenticated'
  });
};
