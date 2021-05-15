// Import Dependencies
const url = require('url');
const MongoClient = require('mongodb').MongoClient;

// Create cached connection variable
let cachedDb = null;

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
async function connectToDatabase(uri) {
	// If the database connection is cached,
	// use it instead of creating a new connection
	if (cachedDb) {
		return cachedDb;
	}

	// If no connection is cached, create a new one
	const client = await MongoClient.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true});

	// Select the database through the connection,
	// using the database path of the connection string
	const db = await client.db(url.parse(uri).pathname.substr(1));

	// Cache the database connection and return the connection
	cachedDb = db;
	console.log('Returning connection to database');
	return db;
}

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
module.exports = async (collection_name, data) => {
	console.log('Connecting to database');
	const db = await connectToDatabase(process.env.APP_WATCHTOWER_DB_URI);
	console.log('selecting collection');
	// Select the "quotes" collection from the database
	const collection = await db.collection(collection_name);
	await collection.insertOne(data, function(err, res) {
	  if (err) {
		  console.error(err)
		  throw err;
	  }
	  console.log("1 document inserted");
	  console.log(res);
	});
};