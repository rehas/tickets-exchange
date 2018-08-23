import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Events from './components/Events';
import EventDetails from './components/EventDetails';
import TicketDetails from './components/TicketDetails';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LoginForm/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Router>
          <main>
            <Route exact path='/' component={Events}/>
            <Route exact path='/events/:eventid' component={EventDetails}/>
            <Route exact path='/events/:eventid/tickets/:ticketid' component={TicketDetails}/>

          </main>
        </Router> 
      </div>
    );
  }
}

export default App;
