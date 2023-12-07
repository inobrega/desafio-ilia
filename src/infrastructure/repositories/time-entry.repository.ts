import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeEntry } from '../../domain/entities/time-entry.entity';
import { TimeEntryRepositoryInterface } from '../../domain/interfaces/time-entry.repository.interface';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { ObjectId } from 'mongodb';

@Injectable()
export class TimeEntryRepository implements TimeEntryRepositoryInterface {
  constructor(
    @InjectRepository(TimeEntry)
    private readonly repository: Repository<TimeEntry>,
  ) {}

  async save(timeEntry: TimeEntry): Promise<TimeEntry> {
    return await this.repository.save(timeEntry);
  }

  async findAll(): Promise<TimeEntry[]> {
    return await this.repository.find();
  }

  async find(options?: FindManyOptions<TimeEntry>): Promise<TimeEntry[]> {
    return await this.repository.find(options);
  }

  async findOne(id: string): Promise<TimeEntry | null> {
    return await this.repository.findOne({
      where: { _id: new ObjectId(id) },
    });
  }

  async update(id: string, timeEntry: TimeEntry): Promise<TimeEntry> {
    await this.repository.update(id, timeEntry);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
