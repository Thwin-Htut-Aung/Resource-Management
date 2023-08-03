function connectJumpstartDB(){

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    client.connect()
    const db = client.db('jumpstart_erp')
    return db
   } catch (error) {
     console.error('Error connecting to MongoDB:', error);
   } 

}

module.exports = connectJumpstartDB