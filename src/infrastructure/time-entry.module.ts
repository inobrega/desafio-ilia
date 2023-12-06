import { Module } from '@nestjs/common';
import { TimeEntryController } from './controllers/time-entry.controller';

@Module({
  controllers: [TimeEntryController],
  providers: [],
})
export class TimeEntryModule {}
