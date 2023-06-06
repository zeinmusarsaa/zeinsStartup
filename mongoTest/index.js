const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

async function main() {
  // Connect to the database cluster
  const url = `mongodb+srv://zeinmus:89Ester98!@cluster0.srdq7br.mongodb.net/`;
  const client = new MongoClient(url);
  const db = client.db('recipeDB');
  const collection = db.collection('recipes');

  // Test that you can connect to the database
  (async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });


  // Insert a Mediterranean recipe
  const recipe = {
    name: 'Greek Salad',
    summary: 'A refreshing salad with tomatoes, cucumbers, olives, and feta cheese.',
    recipe_type: 'Salad',
    servings: 2,
  };
  await collection.insertOne(recipe);

  // Query the Mediterranean recipes
  const query = { recipe_type: 'Salad' };
  const options = {
    sort: { name: 1 },
  };

  const cursor = collection.find(query, options);
  const recipes = await cursor.toArray();
  recipes.forEach((recipe) => console.log(recipe));

  client.close();
}

main().catch(console.error);
