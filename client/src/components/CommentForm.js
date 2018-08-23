import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Input, Button, InputLabel} from '@material-ui/core/';
import {addComment} from '../actions/comments'
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

class CommentForm extends PureComponent{

  state={}

  handleChange = (e) =>{
    console.log(e.target.name)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {body} = this.state
    const ticketid = this.props.ticket.id
    const userid = this.props.currentUserDetails.id
    console.log( this.state);
    // if ((title && picture && end)) return
    this.props.addComment(ticketid, body);
    this.setState({})
    e.target.body.value =''
  }

  render(){
    return (
      <div className={this.props.classes.container} >
      <form onSubmit={this.handleSubmit}>
      <Input
      onChange={this.handleChange}
      label="None"
      id="body"
      type="text"
      name="body"
      defaultValue=""
      className={this.props.classes.textField}
      placeholder="Add comment here"
      required ={true}
      />
      <Button type="submit">Add Comment</Button>
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

export default connect(mapStateToProps, {addComment})(withStyles(styles)(CommentForm))