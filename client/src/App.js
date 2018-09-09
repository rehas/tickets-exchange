import React, { Component } from 'react';
import './App.css';
import {Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Events from './components/Events';
import EventDetails from './components/EventDetails';
import TicketDetails from './components/TicketDetails';
import SearchBox from './components/SearchBox';
import HomeButton from './components/HomeButton';
import BackToEventButton from './components/BackToEventButton';
import { MuiThemeProvider, createMuiTheme, colors } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: colors.purple[300],
      main: colors.purple[500],
      dark: colors.purple[700],
    },
    secondary: {
      light: colors.green[300],
      main: colors.green[500],
      dark: colors.green[700],
    },
  },
  
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <Route component={HomeButton}/>
            <Route exact path='/events/:eventid/tickets/:ticketid' component={BackToEventButton}/>
            <LoginForm/>
            <h1 className="App-title">Welcome to Ebay For Tickets</h1>
            <Route exact path='/' component={SearchBox}/>
          </header>
            <main>
              <Route exact path='/' component={Events}/>
              <Route exact path='/events/:eventid' component={EventDetails}/>
              <Route exact path='/events/:eventid/tickets/:ticketid' component={TicketDetails}/>
            </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
