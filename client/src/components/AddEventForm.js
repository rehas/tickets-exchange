import React,{PureComponent} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Input, Button, InputLabel} from '@material-ui/core/';
import {createEvent} from '../actions/events'
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

class AddEventForm extends PureComponent{

  state={}

  handleChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {title, picture, start, end} = this.state
    // if ((title && picture && end)) return
    this.props.createEvent(title,picture, start, end);
    this.setState({})
    e.target.title.value =''
    e.target.picture.value =''
    e.target.start.value =''
    e.target.end.value =''
  }
  

  render(){
    return (
      <div className={this.props.classes.container} >
      <form onSubmit={this.handleSubmit}>
      <Input
      onChange={this.handleChange}
      label="None"
      id="title"
      type="text"
      name="title"
      defaultValue=""
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
        defaultValue=""
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
        defaultValue=""
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
        defaultValue=""
        className={this.props.classes.textField}
        placeholder="end date eg. 2019-08-30"
        margin="dense"
        required={true}
      />
      <Button type="submit"> Create Event</Button>
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

export default connect(mapStateToProps, {createEvent})(withStyles(styles)(AddEventForm))