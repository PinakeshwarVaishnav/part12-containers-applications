const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync, setAsync } = require("../redis/index");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  const totalTodos = await getAsync("totalTodos");
  const todoCounter = parseInt(totalTodos || "0", 10);
  todoCounter++;
  await setAsync("totalTodos", todoCounter.toString());

  res.json(todo);
  return todoCounter;
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/:id", async (req, res) => {
  const todoId = req.params.id;
  const todo = await Todo.findOne({ _id: todoId });
  res.json(todo);
});

/* PUT todo. */
singleRouter.put("/:id", async (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = req.body;
  const result = await Todo.findOneAndUpdate(
    { _id: todoId },
    { $set: updatedTodo },
    { returnDocument: "after" },
  );

  res.json(result);
});

router.get("/statistics", async (_req, res) => {
  const totalTodos = await getAsync("totalTodos");

  return res.json({ added_todos: totalTodos || "0" });
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
