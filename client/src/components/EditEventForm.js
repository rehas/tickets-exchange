import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Input, Button, InputLabel} from '@material-ui/core/';
import {editEvent} from '../actions/events'
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

class EditEventForm extends PureComponent{

  state={}

  handleChange = (e) =>{
    console.log(e.target.name)
    this.setState({ [e.target.name]: e.target.value })
  }

   handleSubmit = async (e) => {
    e.preventDefault();
    const {title, picture, start, end} = this.state
    console.log(this.props, this.state);
    // if ((title && picture && end)) return
    await this.props.editEvent(title,picture, start, end, this.props.event.id);
    this.props.history.push('/')
  }

  componentDidMount(){
   console.log(this.props.event)
   this.setState({
     title: this.props.event.title,
     picture: this.props.event.picture,
     start: this.props.event.start,
     end: this.props.event.end,
   })
  }
  

  render(){
    return (
      <div className={this.props.classes.container} >
      <form onSubmit={this.handleSubmit}>
      <Input
      onChange={this.handleChange}
      label="None"
      id="end"
      type="text"
      name="title"
      defaultValue={this.props.event && this.props.event.title}
      className={this.props.classes.textField}
      placeholder="Event Title"
      required ={true}
      />
      <Input
        onChange={this.handleChange}
        label="None"
        id="picture"
        type="text"
        name="picture"
        defaultValue={this.props.event && this.props.event.picture}
        className={this.props.classes.textField}
        placeholder="Event Picture Link"
        required={true}
      />
      <InputLabel> Start Date</InputLabel>
      <Input
        onChange={this.handleChange}
        label="Dense"
        type="date"
        id="start"
        name="start"
        defaultValue={this.props.event && this.props.event.start}
        className={this.props.classes.textField}
        placeholder="start date eg. 2018-08-30"
        margin="dense"
        required={true}
      />
      <InputLabel> End Date</InputLabel>
      <Input
        onChange={this.handleChange}
        label="Dense"
        type="date"
        id="end"
        name="end"
        defaultValue={this.props.event && this.props.event.end}
        className={this.props.classes.textField}
        placeholder="end date eg. 2019-08-30"
        margin="dense"
        required={true}
      />
      <Button type="submit"> Edit Event</Button>
      </form>
    </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    currentUserDetails : state.currentUserDetails,
    event : state.eventDetails
  }
}

export default connect(mapStateToProps, {editEvent})(withStyles(styles)(EditEventForm))