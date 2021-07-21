import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage}></Route>
    </Switch>
  );
}

export default App;
