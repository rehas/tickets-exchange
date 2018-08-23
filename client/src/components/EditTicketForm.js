import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Input, Button, InputLabel} from '@material-ui/core/';
import {editTicket} from '../actions/tickets'
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
    console.log(e.target.name)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {description, picture, price} = this.state
    const eventid = this.props.eventid
    const userid = this.props.currentUserDetails.id
    console.log(this.props, this.state);
    // if ((title && picture && end)) return
    this.props.editTicket(this.props.ticket.id, parseInt(price), description, picture);
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
    </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    currentUserDetails : state.currentUserDetails
  }
}

export default connect(mapStateToProps, {editTicket})(withStyles(styles)(EditTicketForm))