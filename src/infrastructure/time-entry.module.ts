import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeEntry } from '../domain/entities/time-entry.entity';
import { TimeEntryDomainService } from '../domain/services/time-entry.service';
import { TimeEntryMapper } from '../application/mappers/time-entry.mapper';
import { TimeEntryApplicationService } from '../application/services/time-entry.application.service';
import { TimeEntryController } from './controllers/time-entry.controller';
import { TimeEntryRepository } from './repositories/time-entry.repository';
import { TimeEntryResolver } from '../presentation/graphql/time-entry.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TimeEntry])],
  controllers: [TimeEntryController],
  providers: [
    {
      provide: 'TIME_ENTRY_REPOSITORY_INTERFACE',
      useClass: TimeEntryRepository,
    },
    TimeEntryDomainService,
    TimeEntryApplicationService,
    TimeEntryMapper,
    TimeEntryResolver,
  ],
  exports: [TimeEntryApplicationService, TimeEntryDomainService],
})
export class TimeEntryModule {}
