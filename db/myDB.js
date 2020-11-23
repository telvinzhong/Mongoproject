const { MongoClient, ObjectId } = require("mongodb");

function myDB() {
  const myDB = {};
  const dbName = "proj2";
  const colName = "users";
  const uri = process.env.MONGO_URL || "mongodb://localhost:27017";

  myDB.getUsers = async function (page) {
    const client = MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colName);
      const query = {};

      return await col
        .find(query)
        // sort in descending order by creation
        .sort({ _id: -1 })
        .limit(20)
        .toArray();
    } finally {
      client.close();
    }
  };

  myDB.createUser = async function (user) {
    const client = MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colName);

      return await col.insertOne(user);
    } finally {
      client.close();
    }
  };

  myDB.updateUser = async function (user) {
    const client = MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colName);

      return await col.updateOne(
        { _id: ObjectId(user._id) },
        {
          $set: {
            Name: user.first_name,
            Email: user.email,
          },
        }
      );
    } finally {
      client.close();
    }
  };

  myDB.deleteUser = async function (user) {
    const client = MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colName);

      return await col.deleteOne({ _id: ObjectId(user._id) });
      console.log("delete run");
    } finally {
      client.close();
    }
  };

  return myDB;
}

module.exports = myDB();
