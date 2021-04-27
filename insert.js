const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "DB_CONNECT = mongodb+srv://joshuakurian:<password>@cluster0.pvja6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db('dbTodo');
    const movies = database.collection('TodoTask');
    // Query for a movie that has the title 'Back to the Future'
    const query = {
      title: 'Back to the Future', description: 'Simple Task',
      createdby: 'Joshua Kurian',
      createdon:'19-12-1962',
      completed: '19-12-1964',
    };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);