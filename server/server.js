const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Hello")
})

app.get('/api', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});;

app.post('/api/user', async (req, res) => {
  try {
    console.log(req.body);
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// database connection

const connectDB = async () => {
  try {
    const con = await mongoose.connect('mongodb://127.0.0.1:27017/amrit')
    console.log(`Mongo DB connedted: ${con.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

// mongodb connection
connectDB()




app.listen(8000, () => {
  console.log("App is listening at http:localhost:5000")
})