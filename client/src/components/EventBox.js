import React,{PureComponent} from 'react';
import {Grid} from '@material-ui/core'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {getEvents} from '../actions/events'
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

class Events extends PureComponent  {
  render(){
    return (
      <Grid item className={this.props.classes.paper} md={6}>
        <Link to={`/events/${this.props.data.id}`}>
        <p> {this.props.data.title} </p>
        <img src={this.props.data.picture} alt="" className={this.props.classes.img}/>
        <p> start : {this.props.data.start} </p>
        <p> end : {this.props.data.end} </p>
        </Link>
      </Grid>
    )
  }
}

export default connect(null, {getEvents})(withStyles(styles)(Events));
