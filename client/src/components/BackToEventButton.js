import React,{PureComponent} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core/';
import {connect} from 'react-redux'

const styles = theme => ({
  container: {
    display: '',
    // flexWrap: 'wrap',
    backgroundColor: 'white'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
    display: 'inline-block',
    backgroundColor : 'white',
    // marginLeft: '-200px'
    // color: 'white',
    // backgroundColor: 'white'
  },
  currentUser:{
    color: 'black'
  }
});


class BackToEventButton extends PureComponent {
  clickHandler =  () => {
    const p = this.props.history.location.pathname
    const eventPath = p.slice(0, p.indexOf('/tickets') )
    this.props.history.push(eventPath)
  }
  render(){
    return(
      <span>
      <Button className={this.props.classes.textField} onClick={this.clickHandler}>EventDetails</Button>
      </span>
    )
  }
};



export default connect(null)(withStyles(styles)(BackToEventButton));

