import { TimeEntry } from '../entities/time-entry.entity';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

export interface TimeEntryRepositoryInterface {
  save(timeEntry: TimeEntry): Promise<TimeEntry>;
  findAll(): Promise<TimeEntry[]>;
  find(options?: FindManyOptions<TimeEntry>): Promise<TimeEntry[]>;
  findOne(id: string): Promise<TimeEntry | null>;
  update(id: string, timeEntry: TimeEntry): Promise<TimeEntry>;
  remove(id: string): Promise<void>;
}
