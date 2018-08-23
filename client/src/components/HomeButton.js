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
    // color: 'white',
    // backgroundColor: 'white'
  },
  currentUser:{
    color: 'black'
  }
});


class HomeButton extends PureComponent  {
  clickHandler =  () => {
    this.props.history.push('/')
  }
  render(){
    return(
      <div className={this.props.classes.container}>
      <Button onClick={this.clickHandler}>Home</Button>
      </div>
    )
  }
};



export default connect(null)(withStyles(styles)(HomeButton));

