const express = require("express");
require("./db/mongoose");
const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

const multer = require("multer");

const upload = multer({
    dest: "images",
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error("Please upload a word document"));
        }

        cb(undefined, true);
    }
});

app.post("/upload", upload.single("upload"), (req, res) => {
    res.send();
});

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);

// START SERVER
app.listen(port, () => {
    console.log(`Server is on ${port}`);
});
