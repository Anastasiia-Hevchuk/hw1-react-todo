import React from 'react';
import './../App.css';

function TodoForm({addNewTodo}) {
  const [value, setValue] = React.useState("");

  let nextId = 500;

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addNewTodo({id: nextId++, title: value});
    setValue("");
  };

  return (
      <form onSubmit={handleSubmit} className="form-inline">
        <div className="form-group mb-2">
          <input
              type="text"
              className="form-control"
              value={value}
              onChange={e => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-2">Add</button>
      </form>
    );
  }

export default TodoForm;