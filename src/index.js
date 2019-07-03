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

// const myFunction = async () => {
//     const password = "Red12345!";
//     const hashedPassword = await bcrypt.hash(password, 8);

//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare("Red12345!", hashedPassword);
//     console.log(isMatch);
// };

// myFunction();
