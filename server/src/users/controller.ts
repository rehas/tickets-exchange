import { JsonController, Post, Param, Get, Body, Authorized, QueryParam, BadRequestError } from 'routing-controllers'
import User from './entity';

@JsonController()
export default class UserController {

  @Post('/users')
  async signup(
    @Body() data: User,
    @QueryParam('isAdmin') isBoss : boolean
  ) {
    console.log("incoming post request")
    console.log(`isBoss -> ${isBoss}`)
    console.log(data)
    
    const {password, email, ...rest} = data
    if( await User.findOne({email: email })){
      throw new BadRequestError("email already exists")
    }
    console.log(password)
    const entity = User.create(rest)
    entity.email = email
    await entity.setPassword(password)
    console.log(entity)

    if(isBoss) entity.isAdmin = true

    const user = await entity.save()
    return user
  }

  @Authorized()
  @Get('/users/:id([0-9]+)')
  getUser(
    @Param('id') id: number
  ) {
    return User.findOneById(id)
  }

  @Authorized()
  @Get('/users')
  allUsers() {
    return User.find()
  }
}
