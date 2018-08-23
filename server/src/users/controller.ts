import { JsonController, Post, Param, Get, Body, Authorized, QueryParam, BadRequestError, CurrentUser, UnauthorizedError } from 'routing-controllers'
import User from './entity';

@JsonController()
export default class UserController {

  @Post('/users')
  async signup(
    @Body() data: User,
    @QueryParam('isAdmin') isBoss : boolean
  ) {
    
    const {password, email, ...rest} = data
    if( await User.findOne({email: email })){
      throw new BadRequestError("email already exists")
    }
    const entity = User.create(rest)
    entity.email = email
    await entity.setPassword(password)

    if(isBoss) entity.isAdmin = true

    const user = await entity.save()
    return user
  }

  @Authorized()
  @Get('/users/:id([0-9]+)')
  getUser(
    @Param('id') id: number,
    @CurrentUser() user :User
  ) {
    if(user.id === id || user.isAdmin) return User.findOneById(id, {relations:["tickets", "comments"]})
    throw new UnauthorizedError("Only logged in user or Admins can access user details")
  }

  @Authorized()
  @Get('/users')
  allUsers() {
    return User.find()
  }
}
