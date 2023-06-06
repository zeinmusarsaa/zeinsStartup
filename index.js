const express = require('express');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
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

apiRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const usersCollection = db.collection('users');

  try {
    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res.status(400).send({ error: 'Username does not exist' });
    }

    if (user.password !== password) {
      return res.status(400).send({ error: 'Password is incorrect' });
    }

    user.loggedIn = true;
    await usersCollection.updateOne({ username }, { $set: user });

    res.send({ message: 'User logged in successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



apiRouter.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const usersCollection = db.collection('users');

  try {
    const existingUser = await usersCollection.findOne({ $or: [{username}, {email}] });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).send({ error: 'Username already exists' });
      }
      if (existingUser.email === email) {
        return res.status(400).send({ error: 'Email already exists' });
      }
    }
  
    const newUser = { username, email, password, loggedIn: true };
    await usersCollection.insertOne(newUser);
    res.send({ message: 'User created successfully' });
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
//I want to make it so that if a certain recipe is selected, that would be the ID in which it is removed.


// db.collection.find(db.collection('recipes'))

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});




