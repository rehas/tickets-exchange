import React,{PureComponent} from 'react';
import {Grid, Button} from '@material-ui/core'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {getEvents} from '../actions/events'
import EventBox from './EventBox';
import AddEventForm from './AddEventForm';


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
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
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

    const eventSize =  this.props.events.length
    const totalPages = this.props.events.length / 4
    const start = (this.state.currentPage -1) *4
    const end = start +4
    

    return (
      <div>
        <Grid container spacing={24} md={12} className={this.props.classes.paper} >
          {this.props.events
            .slice(start, end)
            .map(event => <EventBox data={event} />)
          }
        </Grid>
        <Button onClick={this.previous} >Previous</Button>
        {this.state.currentPage}
        <Button onClick={this.next}>Next</Button>
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
