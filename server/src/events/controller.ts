import { JsonController, Post, Param, Get, Body, Authorized, CurrentUser, UnauthorizedError, Delete, NotFoundError, HttpCode, Patch } from 'routing-controllers'
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

    const entity = await Event.create(data)

    const event = await entity.save()
    return event
  }

  // @HttpCode(200)
  @Authorized()
  @Delete('/events/:id([0-9]+)')
  async deleteEvent(
    @Param('id') id: number,
    @CurrentUser() user: User
  ){

    if(!user) throw new UnauthorizedError("Please Login")

    if (!user.isAdmin){
      throw new UnauthorizedError("Only Admins Can Delete Events")
    }

    const entity = await Event.findOneById(id)
    if(!entity) return new NotFoundError("Event not found")

    return await entity.remove()

  }

  @Authorized()
  @HttpCode(201)
  @Patch('/events/:id([0-9]+)')
  async editEvent(
    @Param('id') id: number,
    @CurrentUser() user:User,
    @Body() partialEvent: object
  ){

    if(!user) throw new UnauthorizedError("Please Login")

    if (!user.isAdmin){
      throw new UnauthorizedError("Only Admins Can Delete Events")
    }

    const entity = await Event.findOneById(id)

    if(!entity) return new NotFoundError("Event not found")

    Object.assign(entity, partialEvent)

    return await entity.save()

  }

  @HttpCode(200)
  @Get('/events/:id([0-9]+)')
  async getEvent(
    @Param('id') id: number
  ) {

    const event = await Event.findOneById(id, {relations:["tickets", "tickets.comments"]})

    if(!event) throw new NotFoundError("Event Not Found")

    const risks = await Promise.all( event.tickets.map(ticket=> ticket.calculateTicketRisk()))
      .then(result=> result.map(item=>{return {ticId: item.ticket.id, risk : item.risk }}))
      // .then(res=> console.log(res)) 

    console.log({...event,
      risks : risks
      })

    return {...event,
            risks : risks
            }
  }

  @HttpCode(200)
  @Get('/events')
  async allEvents() {
    return await Event.find(
      {
        relations:["tickets", "tickets.comments"],
        order: {
          id: "DESC"
        }
      }
    )
  }
}
