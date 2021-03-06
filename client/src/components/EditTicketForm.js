import React,{PureComponent} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Input, Button} from '@material-ui/core/';
import {editTicket, deleteTicket} from '../actions/tickets'
import {connect} from 'react-redux'

const styles = theme => ({
  container: {
    display: 'block',
    flexWrap: 'wrap',
    // backgroundColor: 'white'
    color: 'black'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
  },
  currentUser:{
    color: 'black'
  }
});

class EditTicketForm extends PureComponent{

  state={}

  componentDidMount(){
    const {description, price, picture} = this.props.ticket
    this.setState({
      description,
      price,
      picture
    })
  }

  handleChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {description, picture, price} = this.state
    // if ((title && picture && end)) return
    this.props.editTicket(this.props.ticket.id, parseInt(price, 10), description, picture);
  }

  deleteTicket = async (e) =>{
    await this.props.deleteTicket(this.props.ticket.id, this.props.ticket.event_id)
    this.props.history.push(`/events/${this.props.ticket.event_id}`)
  }
  

  render(){
    return (
      <div className={this.props.classes.container} >
      <form onSubmit={this.handleSubmit}>
      <Input
      onChange={this.handleChange}
      label="None"
      id="description"
      type="text"
      name="description"
      defaultValue={this.props.ticket.description}
      className={this.props.classes.textField}
      placeholder="Ticket Description"
      required ={true}
      />
      <Input
        onChange={this.handleChange}
        label="None"
        id="picture"
        type="text"
        name="picture"
        defaultValue={this.props.ticket.picture}
        className={this.props.classes.textField}
        placeholder="Ticket Picture Link"
        required={true}
      />
      <Input
        onChange={this.handleChange}
        label="Dense"
        type="text"
        id="price"
        name="price"
        defaultValue={this.props.ticket.price}
        className={this.props.classes.textField}
        placeholder="price"
        margin="dense"
        required={true}
      />
      
      <Button type="submit">Edit Ticket</Button>
      </form>
      <Button onClick={this.deleteTicket} >Delete Ticket</Button>
    </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    currentUserDetails : state.currentUserDetails
  }
}

export default connect(mapStateToProps, {editTicket, deleteTicket})(withStyles(styles)(EditTicketForm))