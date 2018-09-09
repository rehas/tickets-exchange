import React,{PureComponent} from 'react';
import { Button, Typography} from '@material-ui/core'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {getEvents} from '../actions/events'
import EventBox from './EventBox';
import AddEventForm from './AddEventForm';
import {Grid, Row} from 'react-flexbox-grid/lib';

const styles = theme => ({
  events: {
    paddingTop : '40px',
    marginBottom: '40px',
    fontFamily: 'Verdana'
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

  render(){

    const start = (this.state.currentPage -1) *4
    const end = start +4
    
    return (
      <div>
        <Grid fluid className={this.props.classes.events}>
          <Row around="lg">
            {this.props.events
              .slice(start, end)
              .map((event, i) => <EventBox key={event.id} data={event}/> )
            }
          </Row>
        </Grid>
        <Typography color="textSecondary" variant="display2"> 
          <Button size="large" color="secondary" onClick={this.previous} >Previous</Button>
            {this.state.currentPage}
          <Button size="large" color="secondary" onClick={this.next}>Next</Button>
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
