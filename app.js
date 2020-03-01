const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors')

const todos = require('./routes/api/todos');

const app = express();

//Cors configuration
app.use(cors())

//Body parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//db config 
const db = require('./config/keys.js').mongoURI;

//connect to mongodb 
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//use routes
app.use('/api/todo', todos);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const port = require('./config/keys.js').port;

app.listen(port, () => console.log(`Sever is running on  http://localhost:${port}`));