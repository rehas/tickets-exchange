import { JsonController, Post, Param, Get, Body, Authorized, CurrentUser, UnauthorizedError, NotFoundError, Delete, Patch } from 'routing-controllers'
import User from '../users/entity';
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


  @Authorized()
  @Delete('/tickets/:ticketid([0-9]+)')
  async deleteTicket(
    @Param('ticketid') ticketid : number,
    @CurrentUser() user: User
  ){

    if(!user) throw new UnauthorizedError("Please Login")

    const ticket = await Ticket.findOneById(ticketid)

    if(!ticket) throw new NotFoundError("Ticket Not Found") ;

    if(user.isAdmin || user.id === ticket.user_id){
      return ticket.remove()
    }else{
      throw new UnauthorizedError("Only admins or ticket owners can delete a ticket")
    }

  }

  @Authorized()
  @Patch('/tickets/:ticketid([0-9]+)')
  async editTicket(
    @Param('ticketid') ticketid : number,
    @CurrentUser() user: User,
    @Body() partialTicket: object
  ){

    if(!user) throw new UnauthorizedError("Please Login")

    const ticket = await Ticket.findOneById(ticketid)

    if(!ticket) throw new NotFoundError("Ticket Not Found") ;

    if(user.isAdmin || user.id === ticket.user_id){
      Object.assign(ticket, partialTicket)
      return await ticket.save()
    }else{
      throw new UnauthorizedError("Only Admins and Ticket Owners can Update Tickets")
    }

  }

  // @Authorized()
  // Get ticket by id with event
  @Get('/tickets/:ticketid([0-9]+)')
  async getTicket(
    @Param('ticketid') ticketid: number,
  ) {
    const ticket = await Ticket.findOneById(ticketid, {relations:["event", "comments"]})

    if(!ticket) throw new NotFoundError("Ticket Not Found")

    return ticket
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

  @Get('/tickets/:ticketid([0-9]+)/risk')
  async getTicketRisk(
    @Param('ticketid') ticketid: number,
  ){
    const ticket = await Ticket.findOneById(ticketid, {relations:["comments", "user", "comments.user"]})
    if(!ticket) throw new NotFoundError("Ticket Not Found")
    const author = await User.findOneById(ticket.user_id, {relations:["tickets"]})
    const event = await Event.findOneById(ticket.event_id, {relations:["tickets"]})

    if(!author) throw new NotFoundError("Author Not Found")
    if(!event) throw new NotFoundError("Event Not Found")

    let risk =2;

    if (author.tickets.length === 1) {risk +=4}

    const averagePrice = event.tickets.reduce((agg : number, val : Ticket)=>{
        return agg=val.price + agg
      }, 0) / event.tickets.length ;

    const priceDiff = ((ticket.price - averagePrice) / averagePrice)*100
    

    if (priceDiff < 0){
      risk += Math.abs(priceDiff)
    }else{
      (priceDiff > 15) ? risk-=15 : risk-=priceDiff
    }

    const hour = parseInt( ticket.createdat.toString().split(' ')[4].split(':')[0]) +2

    if(hour > 9 && hour < 17){
      risk -=13
    }else{
      risk+=13
    }

    if (ticket.comments.length > 3){
      risk +=6
    }

    risk = (risk < 2) ? 2 : (risk >98) ? 98 : risk

    return {ticket, 
    risk: risk}

  }

}
