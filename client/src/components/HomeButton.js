import React,{PureComponent} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core/';
import {connect} from 'react-redux'

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
    display: 'inline-block',
    backgroundColor : 'white',
    // color: 'white',
    // backgroundColor: 'white'
  },
  
});


class HomeButton extends PureComponent  {
  clickHandler =  () => {
    this.props.history.push('/')
  }
  render(){
    return(
      <span>
      <Button color="primary" className={this.props.classes.textField} onClick={this.clickHandler}>Home</Button>
      </span>
    )
  }
};



export default connect(null)(withStyles(styles)(HomeButton));

