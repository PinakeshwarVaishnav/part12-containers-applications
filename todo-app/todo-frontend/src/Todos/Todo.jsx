const Todo = ({ todo, onDelete, onComplete }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "70%",
        margin: "auto",
      }}
    >
      <span>{todo.text}</span>
      <div>
        <button onClick={() => onDelete(todo)}>Delete</button>
        {!todo.done && (
          <button onClick={() => onComplete(todo)}>Set as done</button>
        )}
      </div>
    </div>
  );
};

export default Todo;
