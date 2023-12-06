import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Render,
  Body,
  Param,
  Redirect,
} from '@nestjs/common';
import { TimeEntryApplicationService } from '../../application/services/time-entry.application.service';
import { TimeEntryDto } from '../../application/dto/time-entry.dto';

@Controller('web/time-entries')
export class TimeEntryWebController {
  constructor(private timeEntryService: TimeEntryApplicationService) {}

  @Get()
  @Render('time-entries/index')
  async showAll() {
    const timeEntries = await this.timeEntryService.findAll();
    return { timeEntries };
  }

  @Get('create')
  @Render('time-entries/create')
  createForm() {
    return {};
  }

  @Post()
  @Redirect('/web/time-entries')
  async create(@Body() timeEntryDto: TimeEntryDto) {
    await this.timeEntryService.create(timeEntryDto);
  }

  // Outras implementações. Esse aqui é só pra mostrar que pode existir outras formas além do
  // graphQL de utilizar o presentation
}
