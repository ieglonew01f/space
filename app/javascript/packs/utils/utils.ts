import moment from 'moment';

/**
 * Utils Interface
 */
export interface IUtils {
  getCurrentWeek(): any[];
  getNextWeek(nThWeek: number): any[];
  getPrevWeek(nThWeek: number): any[];
  currentMonthAndYear(day: any): string;
  getCurrentDate(): string;
  timeRange(): string[];
  timeToHumanReadable(time: string): string;
  timeToMachineReadable(time: string): string;
}

/**
 * Utils Class
 */
export class Utils implements IUtils {
  /**
   * Returns next week days based on given
   * week number
   */
  getNextWeek = (nThWeek = 1): any[] => {
    const weekDates = [];

    for (let i = 1; i <= 7; i++) {
      weekDates.push(moment().add(nThWeek, 'week').day(i));
    }

    return weekDates;
  };

  /**
   * Returns previous week days based on given
   * week number
   */
  getPrevWeek = (nThWeek = 1): any[] => {
    const weekDates = [];

    for (let i = 1; i <= 7; i++) {
      weekDates.push(moment().subtract(nThWeek, 'week').day(i));
    }

    return weekDates;
  };

  /**
   * Returns the current week days
   */
  getCurrentWeek = (): any[] => {
    const weekDates = [];

    for (let i = 1; i <= 7; i++) {
      weekDates.push(moment().day(i));
    }

    return weekDates;
  };

  /**
   * Returns the current month and year as string
   */
  currentMonthAndYear = (week: any): string => {
    if (week.length > 0) {
      const startMonth = week[0].format('MMMM');
      let monthAndYearString: string = week[0].format('MMMM YYYY');

      for (const day of week) {
        const thisMonth: string = day.format('MMMM');

        if (thisMonth !== startMonth) {
          monthAndYearString = `${startMonth} - ${day.format('MMMM YYYY')}`;
          break;
        }
      }

      return monthAndYearString;
    }
  };

  /**
   * Returns an array of 24 hours
   */
  timeRange = (): string[] => {
    const items: string[] = [];
    Array.from(Array(24)).forEach((val, index) => {
      items.push(moment({ hour: index }).format('hh A'));
    });

    return items;
  };

  /**
   * Converts time to human readable format eg: 04:AM
   */
  timeToHumanReadable = (time): string => {
    return moment(time, 'hh A').format('hh A');
  };

  /**
   * Converts time to machine readable format eg: 13:00
   */
  timeToMachineReadable = (time): string => {
    return moment(time, 'hh:mm').format('hh:mm');
  };

  /**
   * Returns current date
   */
  getCurrentDate = (): string => {
    return moment().format('DD-MM-YYYY');
  };
}
