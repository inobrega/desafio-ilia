import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { TimeEntryApplicationService } from '../../application/services/time-entry.application.service';
import { TimeEntryDto } from '../../application/dto/time-entry.dto';

@Controller('v1/batidas')
export class TimeEntryController {
  constructor(
    private readonly timeEntryAppService: TimeEntryApplicationService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTimeEntry(@Body() timeEntryDto: TimeEntryDto) {
    return this.timeEntryAppService.create(timeEntryDto);
  }

  @Get()
  async getAllTimeEntries() {
    return this.timeEntryAppService.findAll();
  }

  @Get(':id')
  async getTimeEntryById(@Param('id') id: string) {
    return this.timeEntryAppService.findOne(id);
  }

  @Put(':id')
  async updateTimeEntry(
    @Param('id') id: string,
    @Body() timeEntryDto: TimeEntryDto,
  ) {
    return this.timeEntryAppService.update(id, timeEntryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTimeEntry(@Param('id') id: string) {
    await this.timeEntryAppService.delete(id);
  }
}
