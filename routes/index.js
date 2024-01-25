var express = require('express');
var router = express.Router();

var database = require('../database');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', session: req.session });
});

router.post('/login', function (request, response, next) {
  var user_email_address = request.body.user_email_address;
  var user_password = request.body.user_password;

  if (user_email_address && user_password) {
    var query = `SELECT * FROM user_login WHERE user_email="${user_email_address}"`;

    database.query(query, function (err, data) {
      if (err) {
        // Handle the database query error
        console.error(err);
        response.send('Error while querying the database.');
      } else {
        if (data.length > 0) {
          var passwordMatch = false;

          for (var count = 0; count < data.length; count++) {
            if (data[count].user_password === user_password) {
              passwordMatch = true;
              request.session.user_id = data[count].user_id;
              response.redirect('/');
              break; // exit the loop if password matches
            }
          }

          if (!passwordMatch) {
            response.send('Incorrect password');
          }
        } else {
          response.send('No user found with the provided email address');
        }
      }
    });
  } else {
    response.send('Please enter email address and password details');
  }
});

router.get('/logout', function (request, response, next) {
  request.session.destroy();
  response.redirect('/');
});

module.exports = router;
