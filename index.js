const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/game";

MongoClient.connect(url)
    .then(db => {
        let users = db.collection("users");
        let newUsers = [
            {name: "Mike", score: 10},
            {name: "Nick", score: 80},
            {name: "Kate", score: 25}
        ];

        return users.insertMany(newUsers)
            .then(() => users.find().toArray())
            .then(documents => {
                console.log(`В коллекции ${documents.length} записи`);
                console.log(documents);
                return users.deleteMany();
            })
            .then(() => db.close());
    })
    .catch(error => console.error(error));