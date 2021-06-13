import axios from 'axios';
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';
export const ADD_NEW_TODO = "ADD_NEW_TODO";
export const REMOVE_TODO = "REMOVE_TODO";

export const fetchTodos = () => {
  return (dispatch) => {
    dispatch(fetchTodosRequest())
    axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
          const todos = response.data
          dispatch(fetchTodosSuccess(todos))
        })
        .catch(error => {
          dispatch(fetchTodosFailure(error.message))
        })
  }
}

export const fetchTodosRequest = () => {
  return {
    type: FETCH_TODOS_REQUEST
  }
}

export const fetchTodosSuccess = todos => {
  return {
    type: FETCH_TODOS_SUCCESS,
    payload: todos
  }
}

export const fetchTodosFailure = error => {
  return {
    type: FETCH_TODOS_FAILURE,
    payload: error
  }
}

export const addNewTodo = todo => {
  return {
    type: ADD_NEW_TODO,
    payload: todo
  }
}

export const removeTodo = id => {
  return {
    type: REMOVE_TODO,
    payload: id
  }
}