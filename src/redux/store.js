import {createStore, combineReducers, applyMiddleware} from "redux";
import usersReducer from './reducers/users';
import todoReducer from './reducers/todos';
import {composeWithDevTools} from "redux-devtools-extension/index";
import thunk from 'redux-thunk';
import logger from 'redux-logger'

const allReducers = combineReducers({
  users: usersReducer,
  todos: todoReducer
});

export const store = createStore (
    allReducers,
    composeWithDevTools(applyMiddleware(logger, thunk))
)