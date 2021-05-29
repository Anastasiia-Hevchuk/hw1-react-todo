import React, { useEffect, useState } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [completed, setCompleted] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");

      const json = await res.json();
      setTodos(json);
    }

    fetchData();
  }, []);

  const { url } = useRouteMatch();

  const Todo = () => {
    const { id } = useParams();
    const [todo, setTodo] = useState({});

    useEffect(() => {
      async function fetchData() {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${id}`
        );

        const json = await res.json();
        setTodo(json);
      }

      fetchData();
    }, [id]);

    return (
      <div className="card" style={{ width: "300px" }}>
        <div className="card-body">
          <h5 className="card-title">{todo.title}</h5>
          <h6 className="card-sub-title mb-2 text-muted">{todo.completed}</h6>
        </div>
      </div>
    );
  };

  const deleteTodo = (id) => {
    const newList = todos.filter((item) => item.id !== id);
    setTodos(newList);
  };

  const addTodo = (e) => {
    e.preventDefault();

    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        userId: Date.now(),
        id: Date.now() + 1,
        title: newTodo,
        completed: completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setTodos([...todos, json]));
    console.log(todos);
  };

  return (
    <div className="users-page">
      <div className="list-group">
        {todos.map((todo) => (
          <div className="list-group-item users" key={todo.id}>
            <Link to={`${url}/${todo.id}`} className="btn btn-secondary btn-sm">
              {todo.title}
            </Link>
            <button onClick={() => deleteTodo(todo.id)}>X</button>
            {todo.title}
          </div>
        ))}
        <form onSubmit={addTodo} className="form-inline">
          <h4> Please, add new task</h4>
          <div className="form-group mb-2">
            <div>Enter title</div>
            <input
              id="title"
              type="text"
              className="form-control"
              value={newTodo}
              onClick={() => (document.getElementById("title").value = "")}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <div>Enter if completed</div>
            <input
              id="completed"
              type="text"
              className="form-control"
              value={completed}
              onClick={() => (document.getElementById("completed").value = "")}
              onChange={(e) => setCompleted(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Add
          </button>
        </form>
      </div>
      <Route path="/todos/:id">
        <Todo />
      </Route>
    </div>
  );
}

export default Todos;
