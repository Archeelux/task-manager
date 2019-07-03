const express = require("express");
require("./db/mongoose");
const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     if (req.method === "GET") {
//         res.send("GET requests are disabled");
//     } else next();
// });

// app.use((req, res, next) => {
//     res.status(503).send("Website is in maintenance please return later. ty bb");
// });

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);

// START SERVER
app.listen(port, () => {
    console.log(`Server is on ${port}`);
});
