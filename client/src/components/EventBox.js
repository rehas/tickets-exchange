import React,{PureComponent} from 'react';
import {Typography, Card, CardHeader, CardMedia, CardContent} from '@material-ui/core'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {getEvents} from '../actions/events'
import { Link } from 'react-router-dom'
import {Col} from 'react-flexbox-grid/lib';

const styles = theme => ({
  link: {
    textDecorationLine: 'none'
  },
  media:{
    height: '300px',
    width: '75%',
    margin: 'auto'
  },
  card:{
    padding: theme.spacing.unit*3,
    marginTop : '50px',
  }
});

class EventBox extends PureComponent  {
  render(){
    return (
      <Col type="col" lg={6} id="eventbox" item md={6}>
        <Link className={this.props.classes.link} to={`/Events/${this.props.data.id}`}>
        <Card className={this.props.classes.card}>
        <CardHeader
          title={this.props.data.title}
        />
        <CardMedia
          className={this.props.classes.media}
          image={this.props.data.picture}
          src={this.props.data.picture}
        />
        <CardContent>
          <Typography paragraph variant="body1"> start : {this.props.data.start} </Typography>
          <Typography paragraph variant="body1"> end   :   {this.props.data.end} </Typography>
        </CardContent>
        </Card>
        </Link>
      </Col>
    )
  }
}

export default connect(null, {getEvents})(withStyles(styles)(EventBox));
