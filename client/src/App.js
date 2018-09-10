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
import { MuiThemeProvider, createMuiTheme, colors, AppBar, Typography } from '@material-ui/core';
import Grid from 'react-flexbox-grid/lib/components/Grid';
import { Row } from 'react-flexbox-grid/lib';
import { Col } from 'react-flexbox-grid';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: colors.blue[200],
      main: colors.blue[400],
      dark: colors.blue[700],
    },
    secondary: {
      light: colors.green[300],
      main: colors.green[500],
      dark: colors.green[700],
    },
  }
});


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <AppBar position="static">
            <Grid fluid>
              <Row between='lg' middle='lg'>
                <Col lg={1}>
                  <Route component={HomeButton}/>
                </Col>
                <Col lg={1}>
                  <Route exact path='/events/:eventid/tickets/:ticketid' component={BackToEventButton}/>
                </Col>
                <Col lg={2}>
                  <Typography /* className={classes.title} */ variant="title" color="inherit" noWrap>
                   Welcome to Ebay For Tickets
                  </Typography>
                </Col>
                <Col lg={3}>
                  <Route exact path='/' component={SearchBox}/>
                </Col>
                <Col lg={3}>
                  <LoginForm/>
                </Col>
            </Row>
            </Grid>
          </AppBar>
            <main className={theme.root}>
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
