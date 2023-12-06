import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimeEntryApplicationService } from '../../application/services/time-entry.application.service';
import { TimeEntryDto } from '../../application/dto/time-entry.dto';

@Resolver(() => TimeEntryDto)
export class TimeEntryResolver {
  constructor(private timeEntryService: TimeEntryApplicationService) {}

  @Query(() => [TimeEntryDto])
  async timeEntries(): Promise<TimeEntryDto[]> {
    return this.timeEntryService.findAll();
  }

  @Query(() => TimeEntryDto)
  async timeEntry(@Args('id') id: string): Promise<TimeEntryDto> {
    return this.timeEntryService.findOne(id);
  }

  @Mutation(() => TimeEntryDto)
  async createTimeEntry(
    @Args('input') timeEntryDto: TimeEntryDto,
  ): Promise<TimeEntryDto> {
    return this.timeEntryService.create(timeEntryDto);
  }

  @Mutation(() => TimeEntryDto)
  async updateTimeEntry(
    @Args('id') id: string,
    @Args('input') timeEntryDto: TimeEntryDto,
  ): Promise<TimeEntryDto> {
    return this.timeEntryService.update(id, timeEntryDto);
  }

  @Mutation(() => Boolean)
  async deleteTimeEntry(@Args('id') id: string): Promise<boolean> {
    await this.timeEntryService.delete(id);
    return true;
  }
}
