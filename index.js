const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://zeinmus:89Ester98!@cluster0.srdq7br.mongodb.net/`;
const client = new MongoClient(url);
const db = client.db('recipeDB');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

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


// Query the Mediterranean recipes

async function queryRecipes(){
  const cursor = collection.find(query, options);
  const recipes = await cursor.toArray();
  recipes.forEach((recipe) => console.log(recipe));

  client.close();

  main().catch(console.error);
}




const users = {};
const port = process.argv.length > 2 ? process.argv[2] : 8080;

app.use(express.json());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

const cookies = {};

apiRouter.get('/cookies', (_req, res) => {
  res.send(cookies);
});

apiRouter.get('/recipes', (_req, res) => {
  let collection = db.collection('recipes');
  res.send(collection.find({}));
  //res.send(recipes);
});


apiRouter.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  let usernameExists = false;
  let emailExists = false;

  for (const user in users) {
    if (users.hasOwnProperty(user)) {
      if (users[user].username === username) {
        usernameExists = true;
      }
      if (users[user].email === email) {
        emailExists = true;
      }
    }
  }

  if (usernameExists) {
    res.status(400).send({ error: 'Username already exists' });
  } else if (emailExists) {
    res.status(400).send({ error: 'Email already exists' });
  } else {
    users[username] = { email, password, loggedIn: true };
    res.send({ message: 'User created successfully' });
  }
});

//adding
app.post('/api/recipes', (req, res) => {
  const collection = db.collection('recipes');
  const recipe = req.body;

  collection.insertOne(recipe, function (err) {
    if (err) {
      console.error('Error inserting recipe into MongoDB:', err);
      res.status(500).send({ error: 'Internal Server Error' });
    } else {
      res.send({ message: 'Recipe created successfully' });
    }
  });
});

//updating
app.put('/api/recipes/:id', (req, res) => {
  const collection = db.collection('recipes');
  const id = req.params.id;
  const recipe = req.body;

  collection.updateOne({ _id: id }, { $set: recipe }, function (err, result) {
    if (err) {
      console.error('Error updating recipe in MongoDB:', err);
      res.status(500).send({ error: 'Internal Server Error' });
    } else if (result.matchedCount === 0) {
      res.status(404).send({ error: 'Recipe not found' });
    } else {
      res.send({ message: 'Recipe updated successfully' });
    }
  });
});
//deleting
app.delete('/api/recipes/:id', (req, res) => {
  const collection = db.collection('recipes');
  const id = req.params.id;

  collection.deleteOne({ _id: id }, function (err, result) {
    if (err) {
      console.error('Error deleting recipe from MongoDB:', err);
      res.status(500).send({ error: 'Internal Server Error' });
    } else if (result.deletedCount === 0) {
      res.status(404).send({ error: 'Recipe not found' });
    } else {
      res.send({ message: 'Recipe deleted successfully' });
    }
  });
});


// db.collection.find(db.collection('recipes'))

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});




