import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { TimeEntryType } from '../enums/time-entry-type.enum';

@Entity()
export class TimeEntry {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  moment: Date;

  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: TimeEntryType,
    default: TimeEntryType.ENTRY,
  })
  type: TimeEntryType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
