import * as React from 'react';
import { axios } from '../common/constants';
import { CalenderContext } from '../context';
import { ICurrentEvent } from '../hourly/event';
import 'animate.css';

export interface IProps {
  day: any;
  current: boolean;
}

export interface IState {}

export class Day extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  selectDay = async () => {
    const { currentDay } = this.context.calState;
    const day = this.props.day.format('DD-MM-YYYY');

    if (currentDay === day) {
      return;
    }

    const resp = await axios.get(`/events/${day}`);
    this.context.setContext('events', resp.data);
    this.context.setContext('currentDay', day);
  };

  render() {
    const { day } = this.props;

    return (
      <div
        onClick={this.selectDay}
        className={
          this.props.current
            ? 'day-container current animate__animated animate__headShake'
            : 'day-container'
        }
      >
        <div className="day-inner">
          <div className="day">{day.format('ddd')}</div>
          <div className="date">{day.format('DD')}</div>
        </div>
      </div>
    );
  }
}

Day.contextType = CalenderContext;
