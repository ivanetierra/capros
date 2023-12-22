const express = require('express');
const session = require('express-session');
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

app.get('/home.html', (req, res) => {
  if (req.session.validPassword) {
    res.sendFile(__dirname + '/home.html');
  } else {
    res.redirect('/landing.html');
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));