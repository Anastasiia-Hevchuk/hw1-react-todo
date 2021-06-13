import {FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE, ADD_NEW_TODO, REMOVE_TODO} from "../actions/todos";

const initialState = {
  loading: false,
  todos: [],
  error: ""
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_TODOS_SUCCESS:
      return {
        loading: false,
        todos: action.payload,
        error: ""
      }
    case FETCH_TODOS_FAILURE:
      return {
        loading: false,
        todos: [],
        error: action.payload
      }
    case ADD_NEW_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }

    default: return state
  }
}

export default reducer;