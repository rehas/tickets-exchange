import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Input, Button} from '@material-ui/core/';
import {login, logout} from '../actions/users'
import {connect} from 'react-redux'
import SignUpForm from './SignUpForm';

const styles = theme => ({
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
  currentUser:{
    color: 'black'
  }
});

class LoginForm extends PureComponent  {

  state={
    signup:false
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  handleChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = this.state
    this.props.login(email, password )

  }

  handleLogoutSubmit = ()=>{
    this.setState({signup:false})
    this.props.logout()
  }


  render(){

  return (
    <div className={this.props.classes.container}>
      {this.props.currentUserDetails && 
      <p className={this.props.classes.currentUser}> 
        {this.props.currentUserDetails.fullName} Logged In
        <Button type='submit'
          onClick={this.handleLogoutSubmit}
        >
          Logout
        </Button>
        </p>}
      <div>
        
      </div> 
      {(!this.props.currentUserDetails && !this.state.signup) && 
      <div> 
      <form onSubmit={this.handleSubmit}>
      <Input
        onChange={this.handleChange}
        label="None"
        id="email"
        type="email"
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
        placeholder="PassWord"
        margin="dense"
        required={true}
      />
      <Button
        type="submit"
        
        // onClick={this.handleSubmit}
      > Login</Button>
      </form>
      <Button onClick={(e) => this.setState({signup: !this.state.signup})}>SignUP</Button>
      </div>
      }
      <div>
      {this.state.signup && 
      
      <SignUpForm/>
      }
      </div>
      }
      </div>
      
    );
  }

};

const mapStateToProps = state =>{
  return {
    currentUser : state.currentUser,
    currentUserDetails : state.currentUserDetails
  }
}

export default connect(mapStateToProps, {login, logout})(withStyles(styles)(LoginForm));

