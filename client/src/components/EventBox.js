import React,{PureComponent} from 'react';
import {Typography, Card, CardHeader, CardMedia, CardContent} from '@material-ui/core'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {getEvents} from '../actions/events'
import { Link } from 'react-router-dom'
import {Col} from 'react-flexbox-grid/lib';
import blueGrey from '@material-ui/core/colors/blueGrey';

const styles = theme => ({
  link: {
    textDecorationLine: 'none',
  },
  media:{
    height: '300px',
    width: '75%',
    margin: 'auto'
  },
  card:{
    padding: theme.spacing.unit,
    marginTop : '40px',
    backgroundColor: blueGrey[100],
  },
  cardcontent:{
    fontSize : '20px',
  },
  content:{
    fontFamily: 'verdana',
  },

});

class EventBox extends PureComponent  {
  render(){
    const myclasses = this.props.classes
    return (
      <Col type="col" lg={5} id="eventbox" item md={6}>
        <Link className={myclasses.link} to={`/Events/${this.props.data.id}`}>
          <Card className={myclasses.card}>
            <CardHeader
              title={this.props.data.title}
              classes={{title:myclasses.content}}
              color="danger"
            />
            <CardMedia
              className={myclasses.media}
              image={this.props.data.picture}
              src={this.props.data.picture}
            />
            <CardContent >
              <Typography className={`${myclasses.cardcontent} ${myclasses.content}` }>
                start : {this.props.data.start}
                - - 
                end   : {this.props.data.end}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Col>
    )
  }
}

export default connect(null, {getEvents})(withStyles(styles)(EventBox));
