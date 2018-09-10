import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, Timestamp, ManyToOne, JoinColumn } from 'typeorm'
// import { Exclude } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
import Event from '../events/entity';
import User from '../users/entity';
import Comment from '../comments/entity';
import { NotFoundError } from 'routing-controllers';

@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsNumber()
  @Column('integer')
  price: number

  @IsString()
  @Column('text', {nullable:true})
  picture: string

  @IsString()
  @Column('text', {nullable:true})
  description: string

  // @IsString()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdat: Timestamp

  @Column({type:'integer', nullable:true})
  boughtby: number

  @Column()
  event_id: number

  @Column()
  user_id: number

  @ManyToOne(_=>Event, event=> event.tickets, {onDelete:"CASCADE"})
  @JoinColumn({name: 'event_id'})
  event: Event;

  @ManyToOne(_=> User, user=> user.tickets, {onDelete:"CASCADE"})
  @JoinColumn({name: 'user_id'})
  user: User

  @OneToMany(_=> Comment, comment => comment.ticket)
  comments: Comment[]

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  /* @OneToMany(_ => Player, player => player.user) 
  players: Player[] */

  calculateTicketRisk = async () =>{
    // const ticket = await Ticket.findOneById(ticketid, {relations:["comments", "user", "comments.user"]})
    // if(!ticket) throw new NotFoundError("Ticket Not Found")
    const author = await User.findOneById(this.user_id, {relations:["tickets"]})
    const event = await Event.findOneById(this.event_id, {relations:["tickets"]})

    if(!author) throw new NotFoundError("Author Not Found")
    if(!event) throw new  NotFoundError("Event Not Found")

    let risk =2;

    if (author.tickets.length === 1) {risk +=4}

    const averagePrice = event.tickets.reduce((agg : number, val : Ticket)=>{
        return agg=val.price + agg
      }, 0) / event.tickets.length ;

    const priceDiff = ((this.price - averagePrice) / averagePrice)*100
    

    if (priceDiff < 0){
      risk += Math.abs(priceDiff)
    }else{
      (priceDiff > 15) ? risk-=15 : risk-=priceDiff
    }

    const hour = parseInt( this.createdat.toString().split(' ')[4].split(':')[0]) +2

    if(hour > 9 && hour < 17){
      risk -=13
    }else{
      risk+=13
    }

    if (this.comments.length > 3){
      risk +=6
    }

    risk = (risk < 2) ? 2 : (risk >98) ? 98 : risk

    return {ticket: this, 
    risk: risk.toFixed(2)}

  }
  
}
