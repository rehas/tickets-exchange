import React,{PureComponent} from 'react';
import {Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {getEvent} from '../actions/events'
import { Link } from 'react-router-dom'


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

  render(){
    return (<div>{
      this.props.event &&
    
       <Paper className={this.props.classes.root}>
      <Table className={ this.props.classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Description</TableCell>
            <TableCell numeric>Price</TableCell>
            <TableCell numeric>Risk</TableCell>
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
                <TableCell numeric>{ticket.risk}</TableCell>
                <TableCell >
                  <Link to={`/tickets/${ticket.id}`}>
                  Ticket Details
                  </Link>
                </TableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    }
       </div> )
  }
}

const mapStateToProps = state =>{
  return {
    event : state.eventDetails
  }
}

export default connect(mapStateToProps, {getEvent})(withStyles(styles)(EventDetails));