const { MongoClient, ObjectId } = require('mongodb');

(async () => {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();

  const db = client.db('securin');
  const collection = db.collection('recipes');

  const oldDocs = await collection.find({}).toArray();

  const bulkOps = oldDocs.map(doc => ({
    deleteOne: { filter: { _id: doc._id } }
  })).concat(oldDocs.map(doc => ({
    insertOne: {
      document: { ...doc, _id: new ObjectId() }
    }
  })));

  console.log("⚙️ Running bulk operation...");

  const result = await collection.bulkWrite(bulkOps);

  console.log(`✅ Done! Deleted: ${result.deletedCount}, Inserted: ${result.insertedCount}`);
  await client.close();
})();

