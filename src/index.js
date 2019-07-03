const express = require("express");
require("./db/mongoose");
const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);

// START SERVER
app.listen(port, () => {
    console.log(`Server is on ${port}`);
});

// const Task = require("./models/task");
// const User = require("./models/user");

// const main = async () => {
//     // const task = await Task.findById("5d1cd43fd16d791d9c3365e3");
//     // await task.populate("owner").execPopulate();
//     // console.log(task.owner);

//     const user = await User.findById("5d1cd3c790729d121840a044");
//     await user.populate("tasks").execPopulate();
//     console.log(user.tasks);
// };

// main();
