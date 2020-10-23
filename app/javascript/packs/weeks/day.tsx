import * as React from 'react';

export const Day = (props) => {
  return (
    <div className={props.current ? 'day-container current' : 'day-container'}>
      <div className="day-inner">
        <div className="day">{props.day.format('ddd')}</div>
        <div className="date">{props.day.format('DD')}</div>
      </div>
      <div className="day-events-summary">
        <div className="events">5 Events</div>
        <div className="starting-at">Starting at 3PM</div>
      </div>
    </div>
  );
};
