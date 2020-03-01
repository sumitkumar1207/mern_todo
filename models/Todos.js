const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Now  Creating Schema 
const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: ""
  },
  body: {
    type: String,
    required: true,
    default: ""
  },
  schedule: {
    type: String,
    required: true,
    default: ""
  },
  priority: {
    type: String,
    required: true,
    default: ""
  },
  assigned: {
    type: String,
    required: true,
    default: ""
  },
  isdeleted: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Todo = mongoose.model('todos', TodoSchema);