// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

//current directory
const date = require(__dirname + "/date.js");

const app = express();

//set up body parser for post method
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//serve up static files
app.use(express.static("public"));

// set up ejs as a view engine
app.set('view engine', 'ejs');

//store in the collection
const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

app.get("/", (req, res) => {

  const day = date.getDate();

  // render list.ejs file with  passing two variables one is from ejs one from app.js
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

//item exists when user types sth
app.post("/", (req, res) => {
  console.log(req.body); //{ newItem: 'do homework', list: 'Work' }
  const item = req.body.newItem;
  if (req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
  // console.log(item);
  //render new list item
  items.push(item);
  //triggers get route
  res.redirect("/");
  }
});

// work todo list
app.get("/work", (req, res) => {
  res.render("list", {listTitle: "Work list", newListItems: workItems });
});
app.post("/work", (req, res) => {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});


// about page
app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});