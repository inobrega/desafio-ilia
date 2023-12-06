import { TimeEntry } from '../entities/time-entry.entity';

export interface TimeEntryRepositoryInterface {
  save(timeEntry: TimeEntry): Promise<TimeEntry>;
  findAll(): Promise<TimeEntry[]>;
  findOne(id: string): Promise<TimeEntry | null>;
  update(id: string, timeEntry: TimeEntry): Promise<TimeEntry>;
  remove(id: string): Promise<void>;
}
