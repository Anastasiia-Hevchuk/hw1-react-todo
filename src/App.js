import React from 'react';
import './App.css';
import Home from './pages/Home';
import Todos from './pages/Todos';
import Users from './pages/Users';
import { NaviBar } from './components/NaviBar';
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="app">
        <NaviBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/todos" component={Todos} />
          <Route path="/users" component={Users} />
          <Route path="*">
            404 not found
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

