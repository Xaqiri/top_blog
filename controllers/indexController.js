const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.sign_up_get = (req, res, next) => {
    res.render('sign_up')
}

exports.sign_up_post = (req, res, next) => {
    let newUser = User(
        {
            username: req.body.username,
            password: req.body.password
        }
    )
    User.findOne({username: newUser.username})
    .exec((err, user) => {
      if (err) return next(err);
      if (user) res.redirect("/");
      else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) return next(err);
          newUser.password = hashedPassword;
          newUser.save(err => {
            if (err) return next(err);
            res.redirect('/');
          });
        });
      }
    })
  };

  exports.sign_in_get = (req, res, next) => {
    res.render('sign_in')
  }

  exports.sign_in_post = passport.authenticate(
      'local', {
          successRedirect: '/',
          failureRedirect: '/'
      }
  )

  exports.log_out_get = (req, res, next) => {
      req.logout();
      res.redirect('/');
  }
