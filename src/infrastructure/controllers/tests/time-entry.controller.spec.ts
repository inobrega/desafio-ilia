import { Test, TestingModule } from '@nestjs/testing';
import { TimeEntryController } from '../time-entry.controller';
import { TimeEntryApplicationService } from '../../../application/services/time-entry.application.service';
import { TimeEntryDto } from '../../../application/dto/time-entry.dto';

describe('TimeEntryController', () => {
  let controller: TimeEntryController;
  let mockAppService: Partial<TimeEntryApplicationService>;

  beforeEach(async () => {
    mockAppService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeEntryController],
      providers: [
        {
          provide: TimeEntryApplicationService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    controller = module.get<TimeEntryController>(TimeEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTimeEntry', () => {
    it('should call timeEntryAppService.create', async () => {
      const dto = new TimeEntryDto();
      await controller.createTimeEntry(dto);
      expect(mockAppService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('getAllTimeEntries', () => {
    it('should call timeEntryAppService.findAll', async () => {
      await controller.getAllTimeEntries();
      expect(mockAppService.findAll).toHaveBeenCalled();
    });
  });

  describe('getTimeEntryById', () => {
    it('should call timeEntryAppService.findOne', async () => {
      const id = '1';
      await controller.getTimeEntryById(id);
      expect(mockAppService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('updateTimeEntry', () => {
    it('should call timeEntryAppService.update', async () => {
      const id = '1';
      const dto = new TimeEntryDto();
      await controller.updateTimeEntry(id, dto);
      expect(mockAppService.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('deleteTimeEntry', () => {
    it('should call timeEntryAppService.delete', async () => {
      const id = '1';
      await controller.deleteTimeEntry(id);
      expect(mockAppService.delete).toHaveBeenCalledWith(id);
    });
  });
});
