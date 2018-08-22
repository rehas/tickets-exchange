import React,{PureComponent} from 'react';
import {Grid} from '@material-ui/core'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {getEvent} from '../actions/events'
import { Link } from 'react-router-dom'


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
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  img:{
    width: '300px',
    height: '300px'
  },
  currentUser:{
    color: 'black'
  }
});

class EventDetails extends PureComponent  {

  componentDidMount(){
    console.log(this.props.match.params.eventid)
    this.props.getEvent(this.props.match.params.eventid)
  }

  render(){
    return (<div>
       This is event :  {this.props.match.params.eventid}
       </div> )
  }
}

export default connect(null, {getEvent})(withStyles(styles)(EventDetails));