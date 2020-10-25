import * as React from 'react';
import ContentLoader from 'react-content-loader';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { IUtils, Utils } from '../utils/utils';
import { CalenderContext } from '../context';

import 'animate.css';

export interface IProps {
  time: string;
}

export interface IState {}

export interface ICurrentEvent {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
}

export class Event extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.utils = new Utils();
  }

  readonly utils: IUtils;

  addEvent = () => {
    const { time } = this.props;
    this.context.setContext(
      'startTime',
      this.utils.timeToMachineReadable(time)
    );
    this.context.setContext('endTime', this.utils.timeToMachineReadable(time));
    this.context.setContext('addNewDialogOpen', true);
  };

  openSummary = (currentEvent: ICurrentEvent) => {
    this.context.setContext('currentEvent', currentEvent);
  };

  render() {
    const { events, loading, currentEvent } = this.context.calState;
    const { time } = this.props;
    let eventCard;

    const thisEvent: ICurrentEvent = events.find(
      (ev) => this.utils.timeToHumanReadable(ev.start_time) === time
    );

    if (loading) {
      eventCard = <LoadingEvent />;
    } else if (thisEvent) {
      eventCard = (
        <div
          // tslint:disable-next-line: jsx-no-lambda
          onClick={() => this.openSummary(thisEvent)}
          className={
            thisEvent.id === currentEvent.id
              ? 'event card active'
              : 'event card'
          }
        >
          <div className="title">{thisEvent.title}</div>
          <div className="time">
            {thisEvent.start_time} - {thisEvent.end_time}
          </div>
        </div>
      );
    } else {
      eventCard = <EmptyEvent addEvent={this.addEvent} />;
    }

    return (
      <li className="animate__animated animate__headShake">
        <div className="events">
          <div className="hours">
            <span>{time}</span>
          </div>
          {eventCard}
        </div>
      </li>
    );
  }
}

export const LoadingEvent = (props) => {
  return (
    <div className="event card">
      <ContentLoader
        speed={2}
        width={340}
        height={84}
        viewBox="0 0 340 84"
        backgroundColor="#95acd0"
        foregroundColor="#427bd1"
        {...props}
      >
        <rect x="0" y="0" rx="3" ry="3" width="67" height="11" />
        <rect x="76" y="0" rx="3" ry="3" width="140" height="11" />
        <rect x="109" y="49" rx="3" ry="3" width="53" height="11" />
        <rect x="173" y="49" rx="3" ry="3" width="72" height="11" />
        <rect x="0" y="49" rx="3" ry="3" width="100" height="11" />
        <rect x="0" y="71" rx="3" ry="3" width="37" height="11" />
        <rect x="0" y="25" rx="3" ry="3" width="140" height="11" />
        <rect x="147" y="24" rx="3" ry="3" width="100" height="11" />
      </ContentLoader>
    </div>
  );
};

export const EmptyEvent = (props) => {
  return (
    <div onClick={props.addEvent} className="event card new">
      <AddBoxIcon color="primary" />
      <span>New Event</span>
    </div>
  );
};

Event.contextType = CalenderContext;
