const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('recipeDB');
const DB = require('./database.js');
const cookieParser = require('cookie-parser');
const { peerProxy } = require('./peerProxy.js');


const authCookieName = 'token';

//service port
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


//recipe variable
const recipe = {
  name: 'Greek Salad',
  summary: 'A refreshing salad with tomatoes, cucumbers, olives, and feta cheese.',
  recipe_type: 'Salad',
  servings: 2,
  
};
async function recipeTest() {
  await collection.insertOne(recipe);
  // Query the Mediterranean recipes
  const query = { recipe_type: 'Salad' };
  const options = {
  sort: { name: 1 },
}
}
//query the recipe
async function queryRecipes(){
  const cursor = collection.find(query, options);
  const recipes = await cursor.toArray();
  recipes.forEach((recipe) => console.log(recipe));

  client.close();

  main().catch(console.error);
}

//login:

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});


// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});


apiRouter.get('/cookies', (_req, res) => {
  res.send(cookies);
});

//this is good
apiRouter.get('/recipes', async (_req, res) => {
  console.log("In server");
  try {
    console.log("This is working");
    let collection = db.collection('recipes');
    const recipes = await collection.find({}).toArray();
    console.log(recipes);
    res.send(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//adding
//not adding the recipe to the server
app.post('/api/recipes', async (req, res) => {
  const collection = db.collection('recipes');
  const recipe = req.body;
  console.log("has posted");
  
  try {
    console.log("this is working!");
    await collection.insertOne(recipe);
    res.send({ message: 'Recipe created successfully' });
  } catch (err) {
    console.error('Error inserting recipe into MongoDB:', err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

//updating
//this works
app.put('/api/recipes/:id', async (req, res) => {
  const collection = db.collection('recipes');
  const id = new ObjectId(req.params.id);
  const recipe = req.body;
  console.log("This is working!");

  try {
    console.log("This is working");
    const result = await collection.updateOne({_id: id }, { $set: recipe });

    if (result.matchedCount === 0) {
      res.status(404).send({ error: 'Recipe not found' });
    } else {
      res.send({ message: 'Recipe updated successfully' });
    }
  } catch (err) {
    console.error('Error updating recipe in MongoDB:', err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

//deleting
// when i tested it, it did delete, but now it won't let me add back at all, it also did not show anything like the console logs
app.delete('/api/recipes/:id', async (req, res) => {
  const collection = db.collection('recipes');
  const id = new ObjectId(req.params.id);
  console.log("This is working!");

  try {
    console.log("This is working!");

    const result = await collection.deleteOne({_id: id });

    if (result.deletedCount === 0) {
      res.status(404).send({ error: 'Recipe not found' });
    } else {
      res.send({ message: 'Recipe deleted successfully' });
    }
  } catch (err) {
    console.error('Error deleting recipe from MongoDB:', err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

apiRouter.post('/posts/like', async (req, res) => {
  const postId = req.body.postId;
  try {
    // Update the post in the database to increment the like count
    const result = await db.collection('posts').updateOne({ _id: ObjectId(postId) }, { $inc: { likes: 1 } });
    if (result.modifiedCount === 0) {
      res.status(404).send({ error: 'Post not found' });
    } else {
      res.send({ message: 'Post liked successfully' });
    }
  } catch (err) {
    console.error('Error updating post in MongoDB:', err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

apiRouter.post('/posts/comment', async (req, res) => {
  const postId = req.body.postId;
  const comment = req.body.comment;
  console.log("Post ID: " + postId);
  try {
    // Update the post in the database to add the comment
    console.log("Post ID: " + postId);
    const result = await db.collection('posts').updateOne({ _id: ObjectId(postId) }, { $push: { comments: comment } });
    if (result.modifiedCount === 0) {
      res.status(404).send({ error: 'Post not found' });
    } else {
      res.send({ message: 'Comment posted successfully' });
    }
  } catch (err) {
    console.error('Error updating post in MongoDB:', err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


// // serve your static react files  
//   app.get('*', (req, res) => {   res.sendFile(path.join(dirname, 'build', '../index.html')); // for any other requests, send index.html file 
//   });


// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
// app.use(express.static(path.join(dirname, 'build'))); 
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);














