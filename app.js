// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// set up ejs as a view engine
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  const today = new Date();
  const currentDay = today.getDay();
  // if the day is Saturday or Sunday 
  // sunday - saturday: 0-6
  if (currentDay === 6 || currentDay === 0) {
    // multiple writes;  only one send
    res.write("<h1>weekend!</h1>");
    res.write("<h1>It's the weekend</h1>");
    res.send();
  } else {
    // res.write("<h1>It is not the weekend!</h1>")
    // res.write("<p>Boo!I have to work!</p>");
    // res.send();
    // not so great, you need to create individual files
    //template  ejs - embedded js templating
    res.sendFile(__dirname + "/index.html");
  }

});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});