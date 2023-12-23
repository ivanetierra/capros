const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: false,
}));

app.post('/validate-password', (req, res) => {
  const passwordHash = req.headers['password-hash'];

  if (passwordHash === 'ed84cb612503f038fcf72d66c61f3528') {
    req.session.validPassword = true;
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

app.use((req, res, next) => {
  if (req.session.validPassword || req.path !== '/home.html') {
    next();
  } else {
    res.redirect('/index.html');
  }
});

app.use(express.static(path.join(__dirname, 'Capros')));

//exports.app = functions.https.onRequest(app);
app.listen(process.env.PORT || 3000, () => console.log('Server started on port', process.env.PORT || 3000));