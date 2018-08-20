import { JsonController, Post, Param, Get, Body, Authorized, CurrentUser, UnauthorizedError, NotFoundError } from 'routing-controllers'
import User from './entity';
// import {getManager} from "typeorm";
import Ticket from './entity';
import Event from '../events/entity';

@JsonController()
export default class TicketController {

  //Create new ticket with event ID and AuthorUser Id
  @Authorized()
  @Post('/event/:eventid([0-9]+)/tickets')
  async newTicket(
    @CurrentUser() user: User,
    @Param('eventid') eventid: number,
    @Body() data: Ticket
  ) {
    const entity = new Ticket()
    // const author = await User.findOneById(user.id)
    console.log(user)
    if(!user){
      return new UnauthorizedError("Please login")
    }

    const event = await Event.findOneById(eventid)

    if(!event){
      return new NotFoundError("No such event exists")
    }

    entity.price = data.price
    entity.description = data.description
    entity.picture = data.picture
    entity.user = <any>{id: user.id}
    entity.event = <any>{id: event.id}
    // entity.user = user

    const ticket = await entity.save()
    return ticket
  }

  // @Authorized()
  // Get ticket by id with event
  @Get('/tickets/:ticketid([0-9]+)')
  getTicket(
    @Param('ticketid') ticketid: number,
  ) {
    return Ticket.findOneById(ticketid, {relations:["event", "comments"]})
  }

  // @Authorized()
  // Get Tickets By Event
  @Get('/event/:eventid([0-9]+)/tickets')
  async allTicketsByEvent(
    @Param('eventid') eventid: number
  ) {
    const event = await Event.findOneById(eventid, {relations:["tickets"]})

    return event
  }
}
