import { Test, TestingModule } from '@nestjs/testing';
import { TimeEntryDomainService } from '../time-entry.service';
import { TimeEntry } from '../../entities/time-entry.entity';

describe('TimeEntryDomainService', () => {
  let service: TimeEntryDomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeEntryDomainService],
    }).compile();

    service = module.get<TimeEntryDomainService>(TimeEntryDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateWorkDuration', () => {
    it('should calculate the work duration correctly', () => {
      const start = new Date('2023-01-01T08:00:00');
      const end = new Date('2023-01-01T17:00:00');
      const duration = service.calculateWorkDuration(start, end);
      expect(duration).toBe(9); // assumindo que a duração seja calculada em horas
    });
  });

  describe('isValidTimeEntry', () => {
    it('should validate the time entry correctly', () => {
      const validTimeEntry = new TimeEntry();
      validTimeEntry.moment = new Date('2023-01-01T10:00:00');

      const isValid = service.isValidTimeEntry(validTimeEntry);
      expect(isValid).toBeTruthy();

      const invalidTimeEntry = new TimeEntry();
      invalidTimeEntry.moment = new Date('2023-01-01T23:00:00');

      const isInvalid = service.isValidTimeEntry(invalidTimeEntry);
      expect(isInvalid).toBeFalsy();
    });
  });
});
