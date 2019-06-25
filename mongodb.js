// CRUD create read update delete

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID();

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) return console.log("unable to connect to database!");

    const db = client.db(databaseName);

    // db.collection("users")
    //     .updateOne(
    //         {
    //             _id: new ObjectID("5d0a8ac25f8f9b0720f21597")
    //         },
    //         {
    //             $inc: {
    //                 age: 1
    //             }
    //         }
    //     )
    //     .then(result => {
    //         console.log(result);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });

    // db.collection("tasks")
    //     .updateMany(
    //         {
    //             completed: false
    //         },
    //         {
    //             $set: {
    //                 completed: true
    //             }
    //         }
    //     )
    //     .then(result => {
    //         console.log(result);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });

    db.collection("users")
        .deleteOne({
            name: "Arturs"
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });

    db.collection("users")
        .deleteMany({
            name: "Vikram"
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
});
