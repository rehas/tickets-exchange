import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToOne, JoinColumn } from 'typeorm'
import { IsString} from 'class-validator';
// import Event from '../events/entity';
import User from '../users/entity';
import Ticket from '../tickets/entity';

@Entity()
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  body: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdat: Timestamp

  @Column()
  user_id: number

  @Column()
  ticket_id: number

  @ManyToOne(_=>User, user=> user.comments, {onDelete:"CASCADE"})
  @JoinColumn({name: 'user_id'})
  user: User

  @ManyToOne(_=> Ticket, ticket=> ticket.comments, {onDelete:"CASCADE"})
  @JoinColumn({name: 'ticket_id'})
  ticket: Ticket



  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  /* @OneToMany(_ => Player, player => player.user) 
  players: Player[] */
}
