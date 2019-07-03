require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("5d1284acaa6a7b222ce6b07b")
//     .then(task => {
//         console.log(task);

//         return Task.countDocuments({ completed: false });
//     })
//     .then(result => {
//         console.log(result);
//     })
//     .catch(e => {
//         console.log(e);
//     });

const deleteTaskAndCount = async id => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });
    return count;
};

deleteTaskAndCount("5d12859b78cdc91fbc56a08a")
    .then(count => console.log(count))
    .catch(e => console.log(e));
