import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/carteira">
          <Wallet />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    );
  }
}

export default App;
