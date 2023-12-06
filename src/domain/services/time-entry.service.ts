import { Injectable } from '@nestjs/common';
import { TimeEntry } from '../entities/time-entry.entity';

@Injectable()
export class TimeEntryDomainService {
  /**
   * Calcula a duração de um expediente com base na entrada e saída.
   * @param startTime Início do expediente.
   * @param endTime Fim do expediente.
   * @returns Duração em horas.
   */
  calculateWorkDuration(startTime: Date, endTime: Date): number {
    return (endTime.getTime() - startTime.getTime()) / 1000 / 3600;
  }

  /**
   * Valida se a entrada de tempo é dentro de um horário permitido.
   * @param timeEntry Entrada de tempo a ser validada.
   * @returns Booleano indicando se a entrada é válida.
   */
  isValidTimeEntry(timeEntry: TimeEntry): boolean {
    const hour = timeEntry.moment.getHours();
    return hour >= 8 && hour <= 18;
  }
}
