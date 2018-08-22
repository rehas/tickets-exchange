import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {TextField, Password, Input} from '@material-ui/core/';
import color from '@material-ui/core/colors/teal';
import { Button } from '@material-ui/core';

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
  },
});

class LoginForm extends PureComponent  {
  propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state ={}

  handleChange = (e) =>{
    console.log(e.target.name)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    console.log(this.state)
  }

  render(){

  return (
    <div className={this.props.classes.container}>
      Form
      <Input
        onChange={this.handleChange}
        label="None"
        id="email"
        type="text"
        name="email"
        defaultValue=""
        className={this.props.classes.textField}
        helperText="Email Address"
      />
      <Input
        onChange={this.handleChange}
        label="Dense"
        type="password"
        id="password"
        name="password"
        defaultValue=""
        className={this.props.classes.textField}
        helperText="Password"
        margin="dense"
      />
      <Button
        type="submit"
        
        onClick={this.handleSubmit}
      > Login</Button>
    </div>
    );
  }

};



export default withStyles(styles)(LoginForm);