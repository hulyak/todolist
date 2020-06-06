// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

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
let items = ["Buy food", "Cook food", "Eat food"];
// https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
app.get("/", (req, res) => {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  const day = today.toLocaleDateString("en-US", options);
  // render list.ejs passing two variables
  res.render("list", {
    kindOfDay: day,
    newListItems: items
  });
});

//item exists when user types sth
app.post("/", (req, res) => {
  const item = req.body.newItem;
  // console.log(item);
  //render new list item
  items.push(item);
  //triggers get route
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});