import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';

@Controller('v1/time-entries')
export class TimeEntryController {
  constructor() {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTimeEntry(@Body() timeEntryDto: any) {
    return {
      message: 'created',
      data: timeEntryDto,
    };
  }
}
