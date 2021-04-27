
const express = require("express");
const app = express();

//models
const TodoTask = require("./models/TodoTask");

const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

//connection to db

mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
    () => {
        console.log("Connected to db!");
        app.listen(3000, () => console.log("Server Up and running"));
    });

app.set("view engine", "ejs");

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));


// GET METHOD
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { todoTasks: tasks });
    });
});

//UPDATE
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.find({}, (err, tasks) => {
            res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
        });
    })
    .post((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndUpdate(id, {
            title: req.body.title,
            description: req.body.description,
            createdby: req.body.createdby,
            completed: Date.now()
        }, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

//POST METHOD
app.post('/', async (req, res) => {
    const todoTask = new TodoTask({
        title: req.body.title,
        description: req.body.description,
        createdby: req.body.createdby,
        createdon: req.body.createdon,
        completed: req.body.completed,
    });
    try {
        await todoTask.save();
        console.log("Save Success")
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
        console.log("Save Error", err)
    }
});
