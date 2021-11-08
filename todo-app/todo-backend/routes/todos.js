const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const { setAsync, getAsync } = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  let addedTodos = (await getAsync('ADDED_TODOS')) || 0;
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  addedTodos++;
  await setAsync('ADDED_TODOS', addedTodos);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;

  req.todo = await Todo.findById(id);
  console.log(req.todo);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo).status(200); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.todo.id,
    {
      text: req.body.text,
      done: req.body.done,
    },
    { new: true }
  );
  res.send(updatedTodo).status(200); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
