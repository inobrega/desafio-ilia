import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { TimeEntryDto } from '../../application/dto/time-entry.dto';

@Controller('v1/time-entries')
export class TimeEntryController {
  constructor() {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTimeEntry(@Body() timeEntryDto: TimeEntryDto) {
    return {
      message: 'created',
      data: timeEntryDto,
    };
  }
}
