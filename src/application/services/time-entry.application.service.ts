import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TimeEntryRepositoryInterface } from '../../domain/interfaces/time-entry.repository.interface';
import { TimeEntryDto } from '../dto/time-entry.dto';
import { TimeEntryMapper } from '../mappers/time-entry.mapper';
import { TimeEntryDomainService } from '../../domain/services/time-entry.service';

/**
 * Atua como um intermediário que orquestra operações entre a camada de apresentação e a camada de domínio,
 * lidando com DTOs e outras operações de nível de aplicação.
 */
@Injectable()
export class TimeEntryApplicationService {
  constructor(
    @Inject('TIME_ENTRY_REPOSITORY_INTERFACE')
    private timeEntryRepository: TimeEntryRepositoryInterface,
    private timeEntryDomainService: TimeEntryDomainService,
  ) {}

  async create(timeEntryDto: TimeEntryDto): Promise<TimeEntryDto> {
    const timeEntry = TimeEntryMapper.toEntity(timeEntryDto);

    if (!this.timeEntryDomainService.isValidTimeEntry(timeEntry)) {
      throw new Error('Invalid time entry');
    }
    const savedTimeEntry = await this.timeEntryRepository.save(timeEntry);
    return TimeEntryMapper.toDto(savedTimeEntry);
  }

  async findAll(): Promise<TimeEntryDto[]> {
    const timeEntries = await this.timeEntryRepository.findAll();
    return timeEntries.map(TimeEntryMapper.toDto);
  }

  async findOne(id: string): Promise<TimeEntryDto> {
    const timeEntry = await this.timeEntryRepository.findOne(id);
    if (!timeEntry) {
      throw new NotFoundException(`Time Entry with ID "${id}" not found`);
    }
    return TimeEntryMapper.toDto(timeEntry);
  }

  async update(id: string, timeEntryDto: TimeEntryDto): Promise<TimeEntryDto> {
    let timeEntry = await this.timeEntryRepository.findOne(id);
    if (!timeEntry) {
      throw new NotFoundException(`Time Entry with ID "${id}" not found`);
    }

    timeEntry = { ...timeEntry, ...TimeEntryMapper.toEntity(timeEntryDto) };

    const updatedTimeEntry = await this.timeEntryRepository.save(timeEntry);
    return TimeEntryMapper.toDto(updatedTimeEntry);
  }

  async delete(id: string): Promise<void> {
    const timeEntry = await this.timeEntryRepository.findOne(id);
    if (!timeEntry) {
      throw new NotFoundException(`Time Entry with ID "${id}" not found`);
    }
    await this.timeEntryRepository.remove(timeEntry.id.toString());
  }
}
