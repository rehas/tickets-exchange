import { JsonController, Post, Param, Body, Authorized, CurrentUser, UnauthorizedError, NotFoundError } from 'routing-controllers'
import User from '../users/entity';
import Comment from './entity';
import Ticket from '../tickets/entity';

@JsonController()
export default class CommentController {

  @Authorized()
  @Post('/tickets/:ticketid([0-9]+)/comments')
  async newComment(
    @CurrentUser() user: User,
    @Param('ticketid') ticketid: number,
    @Body() data: Comment
  ) {

    // if (!user.isAdmin){
    //   return new UnauthorizedError("Only Admins Can Create Events")
    // }

    if(!user){
      return new UnauthorizedError("Please login")
    }

    const entity = new Comment()

    console.log("incoming post request to comments")

    const ticket = await Ticket.findOneById(ticketid)

    if(!ticket) return new NotFoundError("Ticket not found")

    entity.body = data.body

    entity.user = <any>{id:user.id}
    entity.ticket= <any>{id:ticket.id}

    const comment = await entity.save()
    return comment
  }
  
}
