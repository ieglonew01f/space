import * as React from 'react';
import { axios } from '../common/constants';

export const Day = (props) => {
  const selectDay = async () => {
    const day = props.day.format('DD MM YYYY');
    const resp = await axios.get(`/events/${day}`);
  };

  return (
    <div
      onClick={selectDay}
      className={props.current ? 'day-container current' : 'day-container'}
    >
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
