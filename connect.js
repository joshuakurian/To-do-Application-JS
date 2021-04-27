var express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
var app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

MongoClient.connect(
  "mongodb+srv://joshuakurian:<password>@cluster0.pvja6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
  },
  function (err, client) {
    if (err) {
      return console.error(err);
    }
    console.log("Connected to Database");
    const db = client.db("test");
    const toDoList = db.collection("toDo");
    app.post("/create", function (req, res) {
      toDoList
        .insertOne(req.body)
        .then(function (result) {
          res.redirect("/");
        })
        .catch(function (error) {
          return console.error(error);
        });
    });

    app.get("/", function (req, res) {
      db.collection("toDo")
        .find()
        .toArray()
        .then(function (results) {
          res.render("index.ejs", { toDo: results });
        })
        .catch(function (error) {
          return console.error(error);
        });
    });


    app.put('/update', function (req, res) {
      console.log(req.body);
  });  
  }
);

app.listen(3000, function () {
  console.log("listening on 3000");
});
