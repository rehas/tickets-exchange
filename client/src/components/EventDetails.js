import React,{PureComponent} from 'react';
import {Paper, Table, TableHead, TableRow, TableCell, TableBody, Button} from '@material-ui/core'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {getEvent, deleteEvent} from '../actions/events'
import { Link } from 'react-router-dom'
import EditEventForm from './EditEventForm';
import AddTicketForm from './AddTicketForm';


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
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  currentUser:{
    color: 'black'
  }
});

class EventDetails extends PureComponent  {

  state={
    sort:0,
    sorter: 'price'
  }

  componentDidMount(){
    this.props.getEvent(this.props.match.params.eventid)
  }

  deleteEvent = () =>{
    this.props.deleteEvent(this.props.match.params.eventid)
    this.props.history.push('/')
  }

  sortHandler = (sortType) =>{
    if(this.state.sort === 0 ){
      this.setState({sort : -1, sorter: sortType})
    }else if(this.state.sort === -1){
      this.setState({sort: 1, sorter: sortType})
    }else{
      this.setState({sort:-1, sorter: sortType})
    }
  }

  render(){

    return (<div>{
      this.props.event &&
    
       <Paper className={this.props.classes.root}>
      <Table className={ this.props.classes.table}>
        <TableHead>
          <TableRow>
            <TableCell> Event Name  </TableCell>
            <TableCell> Description </TableCell>
            {/* <TableCell >Ticket Owner</TableCell> */}
            <TableCell onClick={ ()=> this.sortHandler('price') } numeric>Price</TableCell>
            <TableCell numeric>Risk</TableCell>
            <TableCell numeric>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.event.tickets.sort( (a,b) => ((a[this.state.sorter]-b[this.state.sorter]) * this.state.sort)).map(ticket => {
            const riskFactor = this.props.event.risks.filter(x=> x.ticId === ticket.id)[0].risk
            const riskStyle = {};
            riskStyle.backgroundColor = riskFactor < 10 ? 'green' : riskFactor < 50 ? 'orange' : 'red' ;
            return (
                
              <TableRow key={ticket.id}>
                <TableCell component="th" scope="ticket">
                  {this.props.event.title}
                </TableCell>
                <TableCell >{ticket.description}</TableCell>
                {/* <TableCell >{ticket.user_id}</TableCell> */}
                <TableCell  numeric>{ticket.price}</TableCell>
                <TableCell style={riskStyle} numeric>{this.props.event.risks.filter(x=> x.ticId === ticket.id)[0].risk} %</TableCell>
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
            <EditEventForm history={this.props.history}/>
          </div>}
        </div>
      }
      {
        this.props.currentUser && 
        <div>
          <AddTicketForm eventid={this.props.match.params.eventid}/>
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