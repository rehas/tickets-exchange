import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Events from './components/Events';
import EventDetails from './components/EventDetails';
import TicketDetails from './components/TicketDetails';
import SearchBox from './components/SearchBox';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LoginForm/>
          <h1 className="App-title">Welcome to Ebay For Tickets</h1>
          <Router>
          {/* <SearchBox/> */}
          <Route exact path='/' component={SearchBox}/>
      
          </Router>
        </header>
        
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
