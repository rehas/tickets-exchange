import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
// import { Exclude } from 'class-transformer';
import { MinLength, IsString } from 'class-validator';
import Ticket from '../tickets/entity';

@Entity()
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2)
  @Column('text')
  title: string

  @IsString()
  @Column('text')
  picture: string

  @IsString()
  @Column('date', {nullable:true})
  start: string

  @IsString()
  @Column('date', {nullable:true})
  end: string

  @OneToMany(_=> Ticket, ticket=>ticket.event)
  tickets: Ticket[]

  
  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  /* @OneToMany(_ => Player, player => player.user) 
  players: Player[] */
}
