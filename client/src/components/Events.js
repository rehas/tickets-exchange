import React,{PureComponent} from 'react';
import { Button, Typography} from '@material-ui/core'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {getEvents} from '../actions/events'
import EventBox from './EventBox';
import AddEventForm from './AddEventForm';
import {Grid, Row} from 'react-flexbox-grid/lib';

const styles = theme => ({
  container: {
    display: 'block',
    flexWrap: 'wrap',
    backgroundColor: 'white'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
    // color: 'white',
    // backgroundColor: 'white'
  },
  currentUser:{
    color: 'black'
  }
});

class Events extends PureComponent  {

  state ={
    currentPage: 1,
  }

  componentDidMount(){
    this.props.getEvents()
  }

  previous = () =>{
    if(this.state.currentPage >1){
      this.setState({currentPage: this.state.currentPage-1})
    }
  }

  next = () =>{
    if(this.state.currentPage < Math.ceil(this.props.events.length /4) ){
      this.setState({currentPage: this.state.currentPage +1})
    }
  }

  addEvent = () =>{
    // toggle show add event form
    
  }

  render(){

    const start = (this.state.currentPage -1) *4
    const end = start +4
    
    return (
      <div>
        <Grid fluid  >
          <Row>
          {this.props.events
            .slice(start, end)
            .map((event, i) => <EventBox key={event.id} data={event} />)
          }
          </Row>
        </Grid>
        <Typography color="textSecondary" variant="display2"> 
        <Button size="large" color="primary" onClick={this.previous} >Previous</Button>
          {this.state.currentPage}
        <Button size="large" color="primary" onClick={this.next}>Next</Button>
        </Typography>
        <hr/>
        {this.props.currentUser && this.props.currentUser.isAdmin && 
        <AddEventForm/>
        }
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    events : state.events,
    currentUser: state.currentUserDetails
  }
}


export default connect(mapStateToProps, {getEvents})(withStyles(styles)(Events));
