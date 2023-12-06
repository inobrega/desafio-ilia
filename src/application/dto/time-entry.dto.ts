import { IsDateString, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { TimeEntryType } from '../../domain/enums/time-entry-type.enum';
import { ValidationMessages } from '../config/validation-messages';

export class TimeEntryDto {
  @IsDateString()
  @IsNotEmpty({ message: ValidationMessages.timeEntry.timeNotEmpty })
  moment: string;

  @IsUUID()
  @IsNotEmpty({ message: ValidationMessages.userId.userIdNotEmpty })
  userId: string;

  @IsEnum(TimeEntryType, {
    message: ValidationMessages.timeEntryType.typeIsEnum,
  })
  @IsNotEmpty({ message: ValidationMessages.timeEntryType.typeNotEmpty })
  type: TimeEntryType;
}
