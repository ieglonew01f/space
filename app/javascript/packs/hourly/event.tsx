import * as React from 'react';

export const EmptyEvent = (props) => {
  return (
    <div className="events">
      <div className="hours">
        <span>2 AM</span>
      </div>
      <div className="event card new">
        <span>Add New Event</span>
      </div>
    </div>
  );
};

export const Event = (props) => {
  return (
    <div className="events">
      <div className="hours">
        <span>1 AM</span>
      </div>
      <div className="event card">
        <div className="title">Game Shop</div>
        <div className="starting">Starting in 5 min</div>
        <div className="time">10 - 12 PM</div>
      </div>
    </div>
  );
};
