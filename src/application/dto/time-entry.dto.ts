import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class TimeEntryDto {
  @IsDateString()
  @IsNotEmpty()
  moment: string;

  @IsUUID()
  @IsNotEmpty()
  readonly userId: string;
}
