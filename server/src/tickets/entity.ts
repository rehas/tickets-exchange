import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, Timestamp, ManyToOne } from 'typeorm'
// import { Exclude } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
import Event from '../events/entity';
import User from '../users/entity';
import Comment from '../comments/entity';

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

  @ManyToOne(_=>Event, event=> event.tickets, {onDelete:"CASCADE"})
  event: Event;

  @ManyToOne(_=> User, user=> user.tickets, {onDelete:"CASCADE"})
  user: User

  @OneToMany(_=> Comment, comment => comment.ticket)
  comments: Comment[]

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  /* @OneToMany(_ => Player, player => player.user) 
  players: Player[] */
}
