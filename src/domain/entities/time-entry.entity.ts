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
import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId as ObjectIdInstance } from 'mongodb';

@Entity()
@ObjectType()
export class TimeEntry {
  @ObjectIdColumn()
  _id: ObjectId;

  @Field()
  @Column()
  moment: Date;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column({
    type: 'enum',
    enum: TimeEntryType,
    default: TimeEntryType.ENTRY,
  })
  type: TimeEntryType;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
  @Field()
  get id(): string {
    return typeof this._id != 'string' ? this._id.toHexString() : this._id;
  }

  set id(id: string) {
    this._id = new ObjectIdInstance(id);
  }
}
