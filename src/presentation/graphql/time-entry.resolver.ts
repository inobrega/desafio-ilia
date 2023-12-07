import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimeEntryApplicationService } from '../../application/services/time-entry.application.service';
import { TimeEntryDto } from '../../application/dto/time-entry.dto';
import { TimeEntry } from '../../domain/entities/time-entry.entity';
import { TimeEntryMapper } from '../../application/mappers/time-entry.mapper';

@Resolver(() => TimeEntryDto)
export class TimeEntryResolver {
  constructor(private timeEntryService: TimeEntryApplicationService) {}

  @Query(() => [TimeEntry])
  async timeEntries(): Promise<TimeEntry[]> {
    const data = await this.timeEntryService.findAll();
    const dataParsed: TimeEntry[] = [];
    data.map((value) => {
      dataParsed.push(TimeEntryMapper.toEntity(value));
      return value;
    });
    return dataParsed;
  }

  @Query(() => TimeEntry)
  async timeEntry(@Args('id') id: string): Promise<TimeEntry> {
    return TimeEntryMapper.toEntity(await this.timeEntryService.findOne(id));
  }

  @Mutation(() => TimeEntry)
  async createTimeEntry(
    @Args('input') createDto: TimeEntryDto,
  ): Promise<TimeEntry> {
    console.log(createDto);
    return TimeEntryMapper.toEntity(
      await this.timeEntryService.create(createDto),
    );
  }

  @Mutation(() => TimeEntry)
  async updateTimeEntry(
    @Args('id') id: string,
    @Args('input') timeEntryDto: TimeEntryDto,
  ): Promise<TimeEntry> {
    return TimeEntryMapper.toEntity(
      await this.timeEntryService.update(id, timeEntryDto),
    );
  }

  @Mutation(() => Boolean)
  async deleteTimeEntry(@Args('id') id: string): Promise<boolean> {
    await this.timeEntryService.delete(id);
    return true;
  }
}
