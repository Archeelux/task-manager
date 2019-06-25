const mongoose = require("mongoose");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model("User", {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

const me = new User({
    name: "Arturs",
    age: "2s3"
});

me.save()
    .then(() => {
        console.log(me);
    })
    .then(error => {
        console.log(error);
    });
