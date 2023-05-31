const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const port = process.env.PORT || 8080;
const session = require('express-session');

app.use(session({
  secret: '1312',  // Replace this with your own secret key
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }  // Configure this to suit your needs
}));


// Express middleware for serving static files
app.use(express.static('public'));

app.post('/cookie/userName/:username', (req, res) => {
    req.session.userName = req.params.username;
    res.json({ status: 'Logged in' });
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ status: 'Error' });
        } else {
            res.json({ status: 'Logged out' });
        }
    });
});

app.get('/cookie', (req, res) => {
    let userName = req.session.userName;
    if (userName) {
        res.json({ status: 'Logged in', userName: userName });
    } else {
        res.json({ status: 'Not logged in' });
    }
});

app.listen(port, () => console.log(`App listening on port ${port}`));

