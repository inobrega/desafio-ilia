import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeEntryRepository } from '../time-entry.repository';
import { TimeEntry } from '../../../domain/entities/time-entry.entity';

describe('TimeEntryRepository', () => {
  let repository: TimeEntryRepository;
  let mockRepository: Partial<Repository<TimeEntry>>;

  beforeEach(async () => {
    mockRepository = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimeEntryRepository,
        {
          provide: getRepositoryToken(TimeEntry),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<TimeEntryRepository>(TimeEntryRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('save', () => {
    it('should save a time entry', async () => {
      const timeEntry = new TimeEntry();
      jest.spyOn(mockRepository, 'save').mockResolvedValue(timeEntry);

      expect(await repository.save(timeEntry)).toEqual(timeEntry);
      expect(mockRepository.save).toHaveBeenCalledWith(timeEntry);
    });
  });

  describe('findAll', () => {
    it('should return all time entries', async () => {
      const timeEntries = [new TimeEntry()];
      jest.spyOn(mockRepository, 'find').mockResolvedValue(timeEntries);

      expect(await repository.findAll()).toEqual(timeEntries);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single time entry', async () => {
      const timeEntry = new TimeEntry();
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(timeEntry);

      const id = '1';
      expect(await repository.findOne(id)).toEqual(timeEntry);
      expect(mockRepository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a time entry', async () => {
      const timeEntry = new TimeEntry();
      timeEntry.id = '5f50c31e1c4ae137244f1287';
      timeEntry.moment = new Date();
      timeEntry.userId = 'someUserId';

      const updatedTimeEntry = new TimeEntry();
      Object.assign(updatedTimeEntry, timeEntry, {
        /* altered fields */
      });

      jest.spyOn(mockRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(updatedTimeEntry);

      const id = '1';
      expect(await repository.update(id, updatedTimeEntry)).toEqual(
        updatedTimeEntry,
      );
      expect(mockRepository.update).toHaveBeenCalledWith(id, updatedTimeEntry);
      expect(mockRepository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('remove', () => {
    it('should remove a time entry', async () => {
      jest.spyOn(mockRepository, 'delete').mockResolvedValue(undefined);

      const id = '1';
      await repository.remove(id);
      expect(mockRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
