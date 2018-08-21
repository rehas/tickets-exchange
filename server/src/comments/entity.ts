import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToOne } from 'typeorm'
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

  @ManyToOne(_=>User, user=> user.comments, {onDelete:"CASCADE"})
  user: User

  @ManyToOne(_=> Ticket, ticket=> ticket.comments, {onDelete:"CASCADE"})
  ticket: Ticket



  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  /* @OneToMany(_ => Player, player => player.user) 
  players: Player[] */
}
