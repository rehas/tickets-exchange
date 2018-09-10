import React,{PureComponent} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Button, SvgIcon} from '@material-ui/core/';
import {connect} from 'react-redux';

const styles = theme => ({
  homebutton: {
    marginRight: theme.spacing.unit,
    width: 150,
    display: 'inline-block',
    backgroundColor : 'white',
  },
  icon :{
    marginRight: theme.spacing.unit
  }
  
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}



class HomeButton extends PureComponent  {
  clickHandler =  () => {
    this.props.history.push('/')
  }
  render(){
    return(
      <span>
      <Button variant="extendedFab" aria-label="Delete" className={this.props.classes.homebutton} onClick={this.clickHandler}>
      <HomeIcon className={this.props.classes.icon} />
        Home
      </Button>
      </span>
    )
  }
};



export default connect(null)(withStyles(styles)(HomeButton));

