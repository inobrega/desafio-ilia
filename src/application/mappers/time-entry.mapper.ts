import { TimeEntry } from '../../domain/entities/time-entry.entity';
import { TimeEntryDto } from '../dto/time-entry.dto';
import { ObjectId } from 'mongodb';

export class TimeEntryMapper {
  static toDto(entity: TimeEntry): TimeEntryDto {
    const dto = new TimeEntryDto();
    dto.id = entity._id.toHexString();
    dto.moment = entity.moment.toISOString();
    dto.userId = entity.userId.toString();
    dto.type = entity.type;

    return dto;
  }

  static toEntity(dto: TimeEntryDto): TimeEntry {
    const entity = new TimeEntry();
    entity._id = new ObjectId(dto.id);
    entity.moment = new Date(dto.moment);
    entity.userId = dto.userId;
    entity.type = dto.type;

    return entity;
  }
}
