import React,{PureComponent} from 'react';
import {Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button} from '@material-ui/core'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {getEvent, deleteEvent} from '../actions/events'
import { Link } from 'react-router-dom'
import * as request from 'superagent'
import { baseUrl } from '../constants';
import EditEventForm from './EditEventForm';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
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
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  img:{
    width: '300px',
    height: '300px'
  },
  currentUser:{
    color: 'black'
  }
});

class EventDetails extends PureComponent  {

  componentDidMount(){
    console.log(this.props.match.params.eventid)
    this.props.getEvent(this.props.match.params.eventid)
  }

  deleteEvent = () =>{
    // dispatch delete action for event
    // route back to main page
    console.log(this.props.match.params.eventid, "event to be deleted")
    this.props.deleteEvent(this.props.match.params.eventid)
    this.props.history.push('/')
  }

  render(){

    // const riskArray = []

    // this.props.event &&

    // Promise.all(
    // this.props.event.tickets.map(ticket=>{
    //   return request
    //     .get(`${baseUrl}/tickets/${ticket.id}/risk`)
    // })
    // ).then(responses=> responses.map(response=>riskArray.push(response.body)))
    

    return (<div>{
      this.props.event &&
    
       <Paper className={this.props.classes.root}>
      <Table className={ this.props.classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Description</TableCell>
            <TableCell numeric>Price</TableCell>
            {/* <TableCell numeric>Risk</TableCell> */}
            <TableCell numeric>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.event.tickets.map(ticket => {
            return (
                
              <TableRow key={ticket.id}>
                <TableCell component="th" scope="ticket">
                  {ticket.event_id}
                </TableCell>
                <TableCell >{ticket.description}</TableCell>
                <TableCell numeric>{ticket.price}</TableCell>
                {/* <TableCell numeric>{riskArray.length > 0 && riskArray.filter(risk=> risk.ticket.id === ticket.id)[0].risk}</TableCell> */}
                <TableCell >
                  <Link to={`/events/${this.props.event.id}/tickets/${ticket.id}`}>
                  Ticket Details
                  </Link>
                </TableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {this.props.currentUser && ( this.props.currentUser.isAdmin) 
        &&
        <div>User is here : {this.props.currentUser.fullName}  
          {this.props.currentUser.isAdmin && <div>Also the boss 
            <Button onClick={this.deleteEvent}> Delete event </Button>
            {console.log(this.props)}
            <EditEventForm history={this.props.history}/>
          </div>}
        </div>
      }
    </Paper>
    }
       </div> )
  }
}

const mapStateToProps = state =>{
  return {
    event : state.eventDetails,
    currentUser : state.currentUserDetails
  }
}

export default connect(mapStateToProps, {getEvent, deleteEvent})(withStyles(styles)(EventDetails));