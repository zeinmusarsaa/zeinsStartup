const express = require('express');
const app = express();

const users = {};
// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 8080;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));



// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get('/cookies', (_req, res) => {
  res.send(cookies);
});

//sign up 
apiRouter.post('/signup', (req, res) => {
    //The commented out code below is also checking for email, whereas the uncommented is just for the username
    //const { username, email } = req.body;
    // let usernameExists = false;
    //let emailExists = false;
    // for (let user in users){
        //if (users(user).username === username){
            //usernameExists = true;

     //   }
     // if (users(user).email === email){
        // emailExists = true;

     //}
    //}
    // if (usernameExists){
    //     res.status(400).send({ error: 'User already exists' });
    // }
    // else if (emailExists){
    //     res.status(400).send({error: 'Email already exists' });
    // }
    // else{
    //     users[username] = { loggedIn: true, email: email };  // Set the loggedIn state to true when they signup.
    //     res.send({ message: 'User created successfully' });
    // }
    const { username } = req.body;
    if (users[username]) {
      res.status(400).send({ error: 'User already exists' });
    } else {
      users[username] = { loggedIn: true };  // Set the loggedIn state to true when they signup.
      res.send({ message: 'User created successfully' });
    }
  });


// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// updateScores considers a new score for inclusion in the high scores.
// The high scores are saved in memory and disappear whenever the service is restarted.

