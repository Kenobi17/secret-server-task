import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';

const client: MongoClient = new MongoClient(url);

(async function () {
  await client.connect();
  console.log('Connected to MongoDB');
})();

export default client;
