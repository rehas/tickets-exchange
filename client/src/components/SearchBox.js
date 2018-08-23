import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Input, Button} from '@material-ui/core/';
import {connect} from 'react-redux'
import {filterEvents, getEvents} from '../actions/events'

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

class SearchBox extends PureComponent  {

  

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  handleChange = (e) =>{
    // this.setState({ [e.target.name]: e.target.value })
    if(e.target.value.length ===0) {
      this.props.getEvents()
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(e.target.search.value.length ===0) {
      this.props.getEvents()
    }else{
      this.props.filterEvents(e.target.search.value)
      e.target.search.value=''
    }
  }

  cancelFilter = (e) =>{
    e.preventDefault()
    this.props.getEvents()
  }

  render(){

  return (
    <div className={this.props.classes.container}>
      {
      <div> 
      <form onSubmit={this.handleSubmit}>
      <Input
        onChange={this.handleChange}
        label="None"
        id="search"
        type="search"
        name="search"
        defaultValue=""
        className={this.props.classes.textField}
        placeholder="Search"
        // required={true}
      />
      <Button
        type="submit"
        name="but"
        ref='myBut'
      >  Filter</Button>
      <Button
        type="cancel"
        onClick={this.cancelFilter}
      >  Cancel</Button>
      </form>
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

export default connect(mapStateToProps, {filterEvents, getEvents})(withStyles(styles)(SearchBox));

