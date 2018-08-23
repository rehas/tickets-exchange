import React,{PureComponent} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Input, Button} from '@material-ui/core/';
import {signup} from '../actions/users'
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

class SignUpForm extends PureComponent{

  state={}

  handleChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {email, password, fullName, isAdmin} = this.state
    if (!(email && password && fullName)) return
    this.props.signup(email, password, fullName, isAdmin )
  }
  

  render(){
    return (
      <div className={this.props.classes.container} >
      {!this.props.currentUserDetails &&
      <form onSubmit={this.handleSubmit}>
      <Input
      onChange={this.handleChange}
      label="None"
      id="fullName"
      type="text"
      name="fullName"
      defaultValue=""
      className={this.props.classes.textField}
      placeholder="Full Name"
      required ={true}
      />
      <Input
        onChange={this.handleChange}
        label="None"
        id="email"
        type="text"
        name="email"
        defaultValue=""
        className={this.props.classes.textField}
        placeholder="Email Address"
        required={true}
      />
      <Input
        onChange={this.handleChange}
        label="Dense"
        type="password"
        id="password"
        name="password"
        defaultValue=""
        className={this.props.classes.textField}
        placeholder="Password"
        margin="dense"
        required={true}
      />
      <Input
        onChange={this.handleChange}
        label="Dense"
        type="password"
        id="admin-password"
        name="isAdmin"
        defaultValue=""
        className={this.props.classes.textField}
        placeholder="Admin Key"
        margin="dense"
      />
      <Button type="submit"> Create User</Button>
      </form>
      }
    </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    currentUserDetails : state.currentUserDetails
  }
}

export default connect(mapStateToProps, {signup})(withStyles(styles)(SignUpForm))