import * as React from 'react';
import { EmptyEvent, Event } from './event';
import { IUtils, Utils } from '../utils/utils';
import { CalenderContext } from '../context';

export class Hourly extends React.Component {
  constructor(props) {
    super(props);
    this.utils = new Utils();
  }

  readonly utils: IUtils;

  hours(): JSX.Element[] {
    const range = this.utils.timeRange();
    const hours: JSX.Element[] = [];

    range.forEach((time, i) => {
      hours.push(<Event key={i} time={time} />);
    });

    return hours;
  }

  render() {
    return <ul className="hourly">{this.hours()}</ul>;
  }
}

Hourly.contextType = CalenderContext;
