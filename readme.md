# [Todo List Project](https://stark-bayou-70405.herokuapp.com/) with EJS templating

## Project installation 

App requires [Node.js](https://nodejs.org/en/download/) to run.

Install the dependencies and start the server with `nodemon`

```sh
$ cd todolist
$ npm install 
$ nodemon app.js
```
## Database 

Use mongoDB to persist data from todolist. Run the project, open a new terminal, type `mongo`
- After getting `>` sign, type `show dbs`
- Swich over to todolistDB, type `use todolistDB`
- See the item collection, type `show collections`
- Check to confirm what the items contain, type `db.items.find()`


![app](public/images/img.png)

