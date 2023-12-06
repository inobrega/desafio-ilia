import { IsDateString, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { TimeEntryType } from '../../domain/enums/time-entry-type.enum';
import { ValidationMessages } from '../config/validation-messages';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TimeEntryDto {
  id: string;

  @IsDateString()
  @IsNotEmpty({ message: ValidationMessages.timeEntry.timeNotEmpty })
  @Field({ name: 'moment' })
  moment: string;

  @IsUUID()
  @IsNotEmpty({ message: ValidationMessages.userId.userIdNotEmpty })
  @Field()
  userId: string;

  @IsEnum(TimeEntryType, {
    message: ValidationMessages.timeEntryType.typeIsEnum,
  })
  @IsNotEmpty({ message: ValidationMessages.timeEntryType.typeNotEmpty })
  @Field()
  type: TimeEntryType;
}
