import React,{PureComponent} from 'react';
import {Grid, Typography} from '@material-ui/core'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {getEvents} from '../actions/events'
import { Link } from 'react-router-dom'

const styles = theme => ({
  container: {
    display: 'block',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    marginTop: '50px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
    // color: 'white',
    // backgroundColor: 'white'
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop : '50px'

  },
  img:{
    width: '300px',
    height: '300px',
    borderRadius: '25px'
  },
  currentUser:{
    color: 'black'
  },
  dates:{
    textDecoration : 'none'
  },
  btn:{
    fontSize: '20px',
    textDecoration: 'none',
    fontFamily: 'verdana',
    border: 1,
    color: 'primary',

  }
});

class EventBox extends PureComponent  {
  render(){
    return (
      <Grid id="eventbox" item className={this.props.classes.paper} md={6}>
        <Link to={`/Events/${this.props.data.id}`}>
        <Typography 
          variant="headline" color="primary" paragraph
        > {this.props.data.title}</Typography>
        <img id="imagebox" src={this.props.data.picture} alt="" className={this.props.classes.img}/>
        <Typography className={this.props.classes.btn}> start : {this.props.data.start} </Typography>
        <Typography className={this.props.classes.btn}> end : {this.props.data.end} </Typography>
        </Link>
      </Grid>
    )
  }
}

export default connect(null, {getEvents})(withStyles(styles)(EventBox));
