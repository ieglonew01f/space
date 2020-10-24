import moment from 'moment';

export interface IUtils {
  getCurrentWeek(): any[];
  getNextWeek(nThWeek: number): any[];
  getPrevWeek(nThWeek: number): any[];
  currentMonthAndYear(day: any): string;
  getCurrentDate(): string;
  timeRange(): string[];
}

export class Utils implements IUtils {
  getNextWeek = (nThWeek = 1): any[] => {
    const weekDates = [];

    for (let i = 1; i <= 7; i++) {
      weekDates.push(moment().add(nThWeek, 'week').day(i));
    }

    return weekDates;
  };

  getPrevWeek = (nThWeek = 1): any[] => {
    const weekDates = [];

    for (let i = 1; i <= 7; i++) {
      weekDates.push(moment().subtract(nThWeek, 'week').day(i));
    }

    return weekDates;
  };

  getCurrentWeek = (): any[] => {
    const weekDates = [];

    for (let i = 1; i <= 7; i++) {
      weekDates.push(moment().day(i));
    }

    return weekDates;
  };

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

  timeRange = (): string[] => {
    const items: string[] = [];
    Array.from(Array(24)).forEach((val, index) => {
      items.push(moment({ hour: index }).format('h A'));
    });

    return items;
  };

  getCurrentDate = (): string => {
    return moment().format('DD-MM-YYYY');
  };
}
