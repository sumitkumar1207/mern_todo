const express = require('express');
const router = express.Router();

//load todo model 
const Todo = require('../../models/Todos.js');

//@route    GET api/todos/all
//@desc     All todos route 
//@access   public
router.get('/all', async (req, res) => {
  try {

    //Find all todo and sort based on date field
    const todos = await Todo.find({ isdeleted: false }).sort({ date: -1 });

    //Return response
    res.status(200).json({ status: true, message: "Get all todos", todos: todos })
  } catch (error) {
    console.log('error :', error);
  }
});

//@route    GET api/todos/:todoId
//@desc     Get todo by id route 
//@access   public
router.get('/:id', async (req, res) => {
  try {

    //Find todo based on passed id in params
    const todo = await Todo.findById(req.params.id);

    res.status(200).json({ status: true, message: "Get todo", todo: todo })
  } catch (error) {
    console.log('error :', error);
  }
});

//@route    POST api/todos/add
//@desc     Add new todo route 
//@access   public
router.post('/add', async (req, res) => {
  try {

    const { title, body, schedule, priority, assigned } = req.body.body
    const newTodo = new Todo({ title, body, schedule, priority, assigned, isdeleted: false });
    const savedTodo = await newTodo.save()
    res.status(200).json({ status: true, message: "New Todo added", todo: savedTodo })
  } catch (error) {
    console.log('error :', error);
  }
});

//@route    POST api/todos/:todoId
//@desc     Delete todo by id route 
//@access   public
router.post('/:id', async (req, res) => {
  try {

    //Find todo based on passed id in params
    const todo = await Todo.findById(req.params.id);

    //Check for todo exist or not
    if (todo) {

      //Update todo based on passed id
      const updatedTodo = await Todo.findOneAndUpdate({ _id: req.params.id }, { $set: { isdeleted: true } });

      res.status(200).json({ status: true, message: "Todo deleted", todo: updatedTodo })
    } else {
      res.status(200).json({ status: false, message: "No todo found with requested id" })
    }
  } catch (error) {
    console.log('error :', error);
  }
});

module.exports = router;