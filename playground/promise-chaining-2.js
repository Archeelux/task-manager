require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findByIdAndDelete("5d1284acaa6a7b222ce6b07b")
    .then(task => {
        console.log(task);

        return Task.countDocuments({ completed: false });
    })
    .then(result => {
        console.log(result);
    })
    .catch(e => {
        console.log(e);
    });
