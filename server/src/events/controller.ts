import { JsonController, Post, Param, Get, Body, Authorized, CurrentUser, UnauthorizedError } from 'routing-controllers'
import Event from './entity';
import User from '../users/entity';

@JsonController()
export default class EventController {

  @Authorized()
  @Post('/events')
  async signup(
    @CurrentUser() user: User,
    @Body() data: Event
  ) {

    if (!user.isAdmin){
      return new UnauthorizedError("Only Admins Can Create Events")
    }

    console.log("incoming post request to events")
    const entity = Event.create(data)
    console.log(entity)

    const event = await entity.save()
    return event
  }

  @Get('/events/:id([0-9]+)')
  getUser(
    @Param('id') id: number
  ) {
    return Event.findOneById(id)
  }

  @Get('/events')
  allUsers() {
    return Event.find()
  }
}
