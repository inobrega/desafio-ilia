import { Test, TestingModule } from '@nestjs/testing';
import { TimeEntryApplicationService } from '../time-entry.application.service';
import { TimeEntryDomainService } from '../../../domain/services/time-entry.service';
import { TimeEntryRepositoryInterface } from '../../../domain/interfaces/time-entry.repository.interface';
import { TimeEntry } from '../../../domain/entities/time-entry.entity';
import { TimeEntryDto } from '../../dto/time-entry.dto';
import { TimeEntryType } from '../../../domain/enums/time-entry-type.enum';
import { TimeEntryMapper } from '../../mappers/time-entry.mapper';

describe('TimeEntryApplicationService', () => {
  let service: TimeEntryApplicationService;
  let mockDomainService: Partial<TimeEntryDomainService>;
  let mockRepository: Partial<TimeEntryRepositoryInterface>;

  beforeEach(async () => {
    mockDomainService = {
      calculateWorkDuration: jest.fn(),
      isValidTimeEntry: jest.fn().mockImplementation((timeEntry) => {
        const hour = timeEntry.moment.getHours();
        return hour >= 8 && hour <= 18;
      }),
    };

    mockRepository = {
      // Mock repository methods
      save: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimeEntryApplicationService,
        {
          provide: TimeEntryDomainService,
          useValue: mockDomainService,
        },
        {
          provide: 'TIME_ENTRY_REPOSITORY_INTERFACE',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TimeEntryApplicationService>(
      TimeEntryApplicationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a time entry', async () => {
      const timeEntryDto = new TimeEntryDto();
      timeEntryDto.moment = '2023-01-01T08:22:00';
      timeEntryDto.userId = 'valid_user_id';
      timeEntryDto.type = TimeEntryType.ENTRY;

      const timeEntry = TimeEntryMapper.toEntity(timeEntryDto);

      jest.spyOn(mockRepository, 'save').mockResolvedValue(timeEntry);

      const result = await service.create(timeEntryDto);

      expect(result.id).toEqual(timeEntry.id);
    });
  });
});
