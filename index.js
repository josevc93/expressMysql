const express = require('express');
var jwt = require('jsonwebtoekn');
const bodyParser = require('body-parser');
const app = express();

const coursesRoute = require('./Routes/coursesRouter');
/*
app.get('/api/protected', ensureToken, (req, res) {
    jwt.verify(req.token, 'secret_key_goes_here', function(err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          description: 'Protected information. Congrats!'
        });
      }
    })
  });*/
  /*
  function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }*/

// setting body parser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use('/course', coursesRoute);

// PORT AND RUN THE SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
