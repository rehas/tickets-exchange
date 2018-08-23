import React,{PureComponent} from 'react';
import {Grid, Button} from '@material-ui/core'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {getTicket} from '../actions/tickets'
import {deleteComment} from '../actions/comments'
import EditTicketForm from './EditTicketForm';
import CommentForm from './CommentForm';


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

class TicketDetails extends PureComponent  {
  componentDidMount(){
    const ticketid = this.props.match.params.ticketid
    const eventid = this.props.match.params.eventid

    if(eventid && ticketid){
      this.props.getTicket(eventid, ticketid)
    }
  }

  deleteComment = (commentId) =>{
    this.props.deleteComment(commentId, this.props.match.params.ticketid)

  }

  render(){
    return ( <div>
      {this.props.ticketDetails &&
      <div> 
      <Grid container direction="column"
      justify="center"
      alignItems="center">
        <Grid item>
          <h2>Ticket from {this.props.ticketDetails.ticket.user.fullName}</h2>
        </Grid>
        <Grid item> <h2>Risk : {this.props.ticketDetails.risk} %</h2></Grid>
        <Grid item> <h2>Price : {this.props.ticketDetails.ticket.price} €</h2></Grid>
        <Grid item> <img src={this.props.ticketDetails.ticket.picture} className={this.props.classes.img} alt=""/></Grid>
        <Grid item> <h2>Description : {this.props.ticketDetails.ticket.description} </h2></Grid>
        {this.props.ticketDetails.ticket.comments.length >0 && 
        this.props.ticketDetails.ticket.comments.map(c => {
          return <Grid item> 
                  <b> {c.user.fullName} says : </b>  {c.body} 
                  {this.props.currentUser && 
                  (this.props.currentUser.id === c.user_id || this.props.currentUser.isAdmin) &&
                  <Button onClick={ ()=> this.deleteComment(c.id)}>Delete</Button>
                  }
                  </Grid>
        })
        }
      </Grid >
      
        { 
        <div>
          { this.props.currentUser && 
            (this.props.currentUser.isAdmin ||
            this.props.ticketDetails.ticket.user_id === this.props.currentUser.id) &&
            <EditTicketForm ticket={this.props.ticketDetails.ticket} history={this.props.history}/>
          }
        </div>
        }
        { 
        <div>
          { this.props.currentUser && 
            (this.props.currentUser.id !== this.props.ticketDetails.ticket.user_id) &&
            <CommentForm ticket={this.props.ticketDetails.ticket} history={this.props.history}/>
          }
        </div>
        
        }
        </div>
      }
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    ticketDetails : state.ticketDetails,
    currentUser : state.currentUserDetails
  }
}

export default connect(mapStateToProps, {getTicket, deleteComment})(withStyles(styles)(TicketDetails));