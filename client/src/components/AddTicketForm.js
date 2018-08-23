import React,{PureComponent} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Input, Button} from '@material-ui/core/';
import {addTicket} from '../actions/tickets'
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

class AddTicketForm extends PureComponent{

  state={}

  handleChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {description, picture, price} = this.state
    const eventid = this.props.eventid
    const userid = this.props.currentUserDetails.id
    // if ((title && picture && end)) return
    this.props.addTicket(eventid, userid, parseInt(price, 10), description, picture);
    this.setState({})
    e.target.description.value =''
    e.target.picture.value =''
    e.target.price.value =''
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
      defaultValue=""
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
        defaultValue=""
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
        defaultValue=""
        className={this.props.classes.textField}
        placeholder="price"
        margin="dense"
        required={true}
      />
      
      <Button type="submit">Add Ticket</Button>
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

export default connect(mapStateToProps, {addTicket})(withStyles(styles)(AddTicketForm))