import * as React from 'react';
import ContentLoader from 'react-content-loader';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { CalenderContext } from '../context';

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

export const EmptyEvent = () => {
  return (
    <div onClick={} className="event card new">
      <AddBoxIcon color="primary" />
      <span>New Event</span>
    </div>
  );
};

export interface IProps {
  time: string;
}

export interface IState {}

export class Event extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  render() {
    const { events, loading, currentDate } = this.context.calState;
    const { time } = this.props;
    let eventCard;

    const currentEvent = events.filter((event) => event.start_time === time);

    if (loading) {
      eventCard = <LoadingEvent />;
    }

    if (currentEvent.length !== 0) {
      eventCard = (
        <div className="event card">
          <div className="title">Game Shop</div>
          <div className="starting">Starting in 5 min</div>
          <div className="time">10 - 12 PM</div>
        </div>
      );
    } else {
      eventCard = <EmptyEvent />;
    }

    return (
      <li>
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

Event.contextType = CalenderContext;
