import React, {useEffect, useState} from 'react';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import {Link, Route, useParams, useRouteMatch} from "react-router-dom";
import {connect} from "react-redux";
import {addNewTodo, removeTodo, fetchTodos} from "../redux/actions/todos";

function Todos ({todoData, fetchTodos, removeTodo, addNewTodo}) {

  useEffect(() => {fetchTodos()}, [fetchTodos]);

  const Todo = () => {
    const {id} = useParams();
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
        <div className="card" style={{width: '300px'}}>
          <div className="card-body">
            <h5 className="card-title">{todo.title}</h5>
          </div>
        </div>
    );
  }

  return (
      <div className="users-page">
        <div className="list-group">
          <TodoForm addNewTodo={addNewTodo}/>
          {
            todoData && todoData.loading ?
                (<h2>...loading</h2>) :
                todoData && todoData.error ?
                    (<h2>{todoData.error}</h2>) :
                    todoData && todoData.todos && todoData.todos.map((todoItem, index) =>
                <TodoItem todoItem={todoItem}
                          id={todoItem.id}
                          removeTodo={removeTodo}
                          index={index}
                          key={index}/>)
          }
        </div>
        <Route path="/todos/:id">
          <Todo />
        </Route>
      </div>
  );
}

const mapStateToProps = state => {
  return {
    todoData: state.todos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTodos: () => dispatch(fetchTodos()),
    addNewTodo: (todo) => dispatch(addNewTodo(todo)),
    removeTodo: (id) => dispatch(removeTodo(id)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Todos);