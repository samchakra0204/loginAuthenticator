const express = require('express')
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config.js")
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
  res.render("login");
})

app.get('/signup', (req, res) => {
  res.render("signup");
})

app.post('/signup', async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  const existingUsers = await collection.find({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  if (existingUsers.length > 0) {
    return res.status(400).send('User with this email already exists.');
  }

  await collection.insertMany([data]);
  res.render("home");
});

app.post("/login", async (req, res) => {
  try {
    const user = await collection.findOne({
      name: req.body.name,
      email: req.body.email
    });

    if (user) {
      if (user.password === req.body.password) {
        res.render("home");
      } else {
        res.status(400).send("wrong password");
      }
    } else {
      res.status(400).send("wrong details");
    }
    
  } catch (error) {
    res.status(500).send("An error occurred while processing your request.");
  }
});

app.get('/home', (req, res) => {
  res.render("home");
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})