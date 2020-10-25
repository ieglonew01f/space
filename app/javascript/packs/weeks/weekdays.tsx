import * as React from 'react';
import { Day } from './day';
import { IUtils, Utils } from '../utils/utils';
import { CalenderContext } from '../context';

export interface IProps {}

export class WeekDays extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.utils = new Utils();
  }

  readonly utils: IUtils;

  componentDidMount() {
    const currentWeek = this.utils.getCurrentWeek();
    this.context.setContext('currentWeek', currentWeek);
  }

  days(): Element[] {
    const days = [];
    const { currentWeek, currentDay } = this.context.calState;

    currentWeek.forEach((day, i) => {
      const selectDay: boolean = currentDay === day.format('DD-MM-YYYY');
      days.push(
        <li key={i}>
          <Day current={selectDay} day={day} />
        </li>
      );
    });

    return days;
  }

  render() {
    return (
      <div className="days">
        <ul className="weekdays">{this.days()}</ul>
      </div>
    );
  }
}

WeekDays.contextType = CalenderContext;
