import React from 'react';
import './App.css';
import Login from './login';
import Register from './register';
import {BrowserRouter, Route} from 'react-router-dom';
import Profile from './profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter className="App">
        <Route exact path="/" name="Login" component={Login}/>
        <Route exact path="/register" name="regis" component={Register}/>
        <Route exact path="/login_profile" name="profile" component={Profile}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
