// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// set up ejs as a view engine
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  const today = new Date();
  const currentDay = today.getDay();
  var day = "";
  // day has number value
  switch (currentDay) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      console.log("Error: current day is equal to " + currentDay);
  }
  res.render("list", {
    kindOfDay: day
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});