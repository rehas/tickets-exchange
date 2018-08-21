import { JsonController, Post, Param, Get, Body, Authorized, CurrentUser, UnauthorizedError, Delete, NotFoundError, HttpCode } from 'routing-controllers'
import Event from './entity';
import User from '../users/entity';

@JsonController()
export default class EventController {

  @Authorized()
  @Post('/events')
  async newEvent(
    @CurrentUser() user: User,
    @Body() data: Event
  ) {

    if (!user.isAdmin){
      throw new UnauthorizedError("Only Admins Can Create Events")
    }

    console.log("incoming post request to events")
    const entity = await Event.create(data)
    console.log(entity)

    const event = await entity.save()
    return event
  }

  // @HttpCode(200)
  @Delete('/events/:id([0-9]+)')
  async deleteEvent(
    @Param('id') id: number,
    @CurrentUser() user: User
  ){
    console.log("incoming delete request to events")
    console.log(user)

    if(!user) throw new UnauthorizedError("Please Login")

    if (!user.isAdmin){
      throw new UnauthorizedError("Only Admins Can Delete Events")
    }

    const entity = await Event.findOneById(id)
    if(!entity) return new NotFoundError("Event not found")
    
    // console

    if(entity.tickets){
      entity.tickets.forEach(async ticket=> {
        await ticket.remove()
     })
    }

    return await entity.remove()

  }

  @HttpCode(200)
  @Get('/events/:id([0-9]+)')
  async getEvent(
    @Param('id') id: number
  ) {
    return await Event.findOneById(id)
  }

  @HttpCode(200)
  @Get('/events')
  async allEvents() {
    return await Event.find()
  }
}
