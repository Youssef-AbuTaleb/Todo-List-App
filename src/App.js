import { useState } from "react";

const initialTodos = [
  {
    id: "0",
    title: "study react",
    items: ["study state", "study redux", "study context API"],
  },
  {
    id: "1",
    title: "study css",
    items: ["study sass", "study bem", "study animations"],
  },
  {
    id: "2",
    title: "daily tasks",
    items: ["prepare breakfast", "jogging", "call a friend", "visit a doctor"],
  },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);

  function handleAddNewTodo(newTodo) {
    setTodos((todos) => [...todos, newTodo]);
  }

  function handleDeleteTodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }
  return (
    <div className="app">
      <Header />
      <main className="main">
        <TodosList todos={todos} onDeleteTodo={handleDeleteTodo} />
      </main>
      <section>
        <AddTodosListForm onAddTodo={handleAddNewTodo} />
      </section>
    </div>
  );
}

function Header() {
  return <header className="main-header">Sticky Wall</header>;
}

function TodosList({ todos, onDeleteTodo }) {
  return (
    <ul className="todos-list">
      {todos.map((todo, index) => (
        <TodosItem key={index} todo={todo} onDeleteTodo={onDeleteTodo} />
      ))}
    </ul>
  );
}

function TodosItem({ todo, onDeleteTodo }) {
  return (
    <li className="todo-container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className="todo-header">{todo.title}</h2>
        <button onClick={() => onDeleteTodo(todo.id)}>❌</button>
      </div>
      <ul className="todo-items">
        {todo.items.map((todoItem, index) => (
          <li key={index} className="todo-item">
            {todoItem}
          </li>
        ))}
      </ul>
    </li>
  );
}

function AddTodosListForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoItem, setTodoItem] = useState("");
  const [todoList, setTodoList] = useState([]);

  function handleAddTodoItem() {
    if (todoItem.trim().length === 0) return;
    setTodoList((list) => [...list, todoItem]);
    setTodoItem("");
  }

  function handleAddTodoSubmit(event) {
    event.preventDefault();

    if (!todoTitle || todoList.length === 0) return;

    onAddTodo({ id: crypto.randomUUID(), title: todoTitle, items: todoList });
    console.log({ id: crypto.randomUUID(), title: todoTitle, items: todoList });
    setTodoTitle("");
    setTodoList([]);
    setTodoItem("");
  }
  return (
    <form className="add-todo-list" onSubmit={handleAddTodoSubmit}>
      <header>
        <h3>Add a Todo List</h3>
      </header>

      <div className="input-container">
        <label>Title</label>
        <input
          value={todoTitle}
          type="text"
          placeholder="Enter Title"
          onChange={(e) => setTodoTitle(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label>Todo</label>
        <input
          value={todoItem}
          type="text"
          placeholder="add a todo"
          onChange={(e) => setTodoItem(e.target.value)}
        />
        <button type="button" onClick={handleAddTodoItem}>
          +
        </button>
      </div>

      <div>
        <h4>preview todo list</h4>
        <h3>{todoTitle ? todoTitle : "Enter title"}</h3>
        <ul>
          {todoList.length === 0 ? (
            <li>Your todo list is empty, try add a todo to appear here</li>
          ) : (
            todoList.map((todo, index) => <li key={index}>{todo}</li>)
          )}
        </ul>
      </div>
      <button>Submit Todo List</button>
    </form>
  );
}
