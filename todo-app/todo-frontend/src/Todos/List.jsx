import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDelete={deleteTodo}
          onComplete={completeTodo}
        />
      ))}
    </>
  );
};

export default TodoList;
