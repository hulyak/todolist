// jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');

//require mongoose
const mongoose = require('mongoose');

//current directory
// const date = require(__dirname + "/date.js");

const app = express();

//set up body parser for post method
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//serve up static files
app.use(express.static('public'));

// set up ejs as a view engine
app.set('view engine', 'ejs');

//store in the collection
//use mongoose instead
// const items = ["Buy food", "Cook food", "Eat food"];
// const workItems = [];
//create a new db inside mongodb; connect to url where mongodb is hosted locally and name of the database(todolistDB)
mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

//create a new items schema
const itemsSchema = {
  name: String,
};
//create a new Mongoose model based on the schema
const Item = mongoose.model('Item', itemsSchema);
//create 3 new documents
const item1 = new Item({
  name: 'Todo list',
});
const item2 = new Item({
  name: 'Hit the + button to add a new item',
});
const item3 = new Item({
  name: '<-- Hit this to delete an item.',
});

const defaultItems = [item1, item2, item3];

//for dynamic routes /work /home, create new schema
const listSchema = {
  name: String,
  items: [itemsSchema],
};
//List model, create new list documents based off model
const List = mongoose.model('List', listSchema);

app.get('/', (req, res) => {
  // const day  = date.getDate();
  // render list.ejs file with  passing two variables one is from ejs one from app.js
  //   res.render("list", {
  //     listTitle: day,
  //     newListItems: items
  //   });

  //find all {} condition mongoose
  //this causes to add same items for every time program starts
  //check if the items collection has empty add defaults, if not don't add to the root route
  //clear out/delete database db.dropDatabase()
  //find gives an array back as a result
  Item.find({}, function(err, foundItems) {
    console.log(foundItems);
    // it should be empty, insertMany will not add items again
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Successfully saved default items to DB');
        }
      });
      //redirect root route, and go to else
      res.redirect('/');
    } else {
      //pass over the items that are inside items collection
      res.render('list', { listTitle: 'Today', newListItems: foundItems });
    }
  });
});

//item exists when user types sth
app.post('/', (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list;
  // if (req.body.list === "Work"){
  //   workItems.push(itemName);
  //   res.redirect("/work");
  // }else{
  // console.log(itemName);
  // render new list item
  // items.push(itemName);
  // triggers get route
  // res.redirect("/");
  // }

  //for mongoose, create a new item document
  const item = new Item({
    name: itemName,
  });
  if (listName === 'Today') {
    item.save(); //save the new todo item entered by user to the db
    res.redirect('/'); //show up in the page under default todos
  } else {
    //customlist
    List.findOne({ name: listName }, function(err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect('/' + listName); //direct the user's route
    });
  }
});

//delete todos with mongoose findByIdAndRemove() add callback
app.post('/delete', function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === 'Today') {
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if (!err) {
        console.log('Successfully deleted checked item.');
        res.redirect('/');
      }
    });
  } else {
    //custom list
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } }, //from items array
      function(err, foundList) {
        if (!err) {
          res.redirect('/' + listName);
        }
      }
    );
  }
});

// work todo list
// app.get('/work', (req, res) => {
//   res.render('list', { listTitle: 'Work list', newListItems: workItems });
// });

//dynamic route parameters with express
app.get('/:customListName', function(req, res) {
  const customListName = req.params.customListName;
  List.findOne({ name: customListName }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        //create a new list, use List model
        const list = new List({
          name: customListName, //whatever the user types
          items: defaultItems,
        });
        list.save(); //save to list collection
        res.redirect('/' + customListName);
      } else {
        //show an existing list
        res.render('list', {
          listTitle: foundList.name, //dynamic
          newListItems: foundList.items,
        });
      }
    }
  });
});

app.post('/work', (req, res) => {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect('/work');
});

// about page
// app.get('/about', (req, res) => {
//   res.render('about');
// });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
